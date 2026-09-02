import React, { useState, useEffect, useRef } from 'react';
import s from './Player.module.css';
import loading from '../../assets/loading.svg';

const CONFIG = {
  SOURCES: ['alloha', 'ashdi', 'cdnmovies', 'collaps', 'hdvb', 'kodik', 'vibix', 'videocdn', 'voidboost'],
  API_URL: 'https://api.kinobox.tv/api/players',
  DEFAULT_IFRAME_SIZE: { width: '100%', height: '400px' },
  LOADING_TIMEOUT: 10000
};

const Player = ({ video }) => {
  const [playerState, setPlayerState] = useState({
    iframeUrl: '',
    sources: [],
    selectedSource: '',
    selectedTranslation: '',
    isLoading: true,
    error: null
  });

  const [preferredSource, setPreferredSource] = useState(
    localStorage.getItem('preferred-source') || ''
  );

  const observerRef = useRef(null);
  const loadingTimeoutRef = useRef(null);

  const getKinopoiskId = () => {
    return video.match(/\/film\/(\d+)\//)?.[1];
  };

  const fetchPlayerData = async (kinopoiskId) => {
    try {
      const url = new URL(CONFIG.API_URL);
      url.searchParams.set('kinopoisk', kinopoiskId);
      url.searchParams.set('sources', CONFIG.SOURCES.join(','));

      const response = await fetch(url, {
        headers: {
          'Referer': 'https://kinobox.tv/',
          'Origin': 'https://tapeop.dev',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();
      if (!Array.isArray(result)) throw new Error('Invalid data format');

      return result.filter(item => item.iframeUrl !== null);
    } catch (error) {
      console.error("Ошибка при получении данных", error);
      throw error;
    }
  };

  const initPlayer = async () => {
    const kinopoiskId = getKinopoiskId();
    if (!kinopoiskId) {
      setPlayerState(prev => ({ ...prev, error: 'Invalid video URL', isLoading: false }));
      return;
    }

    try {
      const sources = await fetchPlayerData(kinopoiskId);
      if (sources.length === 0) {
        throw new Error('No available sources found');
      }

      const sourceToSelect = sources.find(s => s.source === preferredSource) || sources[0];
      const translationToSelect = sourceToSelect.translations?.[0];

      setPlayerState({
        sources,
        iframeUrl: translationToSelect?.iframeUrl || sourceToSelect.iframeUrl,
        selectedSource: sourceToSelect.source,
        selectedTranslation: translationToSelect?.id || '',
        isLoading: false,
        error: null
      });

    } catch (error) {
      setPlayerState(prev => ({
        ...prev,
        error: error.message,
        isLoading: false
      }));
    }
  };

  const handleSourceChange = (source) => {
    const sourceData = playerState.sources.find(item => item.source === source);
    if (!sourceData) return;

    const translation = sourceData.translations?.[0];
    const newUrl = translation?.iframeUrl || sourceData.iframeUrl;

    localStorage.setItem('preferred-source', source);
    setPreferredSource(source);

    setPlayerState(prev => ({
      ...prev,
      iframeUrl: newUrl,
      selectedSource: source,
      selectedTranslation: translation?.id || '',
      isLoading: true
    }));

    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
    loadingTimeoutRef.current = setTimeout(() => {
      if (playerState.isLoading) {
        setPlayerState(prev => ({ ...prev, isLoading: false }));
      }
    }, CONFIG.LOADING_TIMEOUT);
  };

  const setupAdBlocker = (iframe) => {
    if (!iframe) return;

    const cleanup = () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };

    const handleLoad = () => {
      cleanup();
      
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!iframeDoc) return;

        observerRef.current = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
              const scripts = Array.from(iframeDoc.scripts || []);
              scripts.forEach(script => {
                if (script.src.includes('imasdk.googleapis.com')) {
                  script.remove();
                }
              });
            }
          });
        });

        observerRef.current.observe(iframeDoc, {
          childList: true,
          subtree: true
        });

        setPlayerState(prev => ({ ...prev, isLoading: false }));
      } catch (error) {
        console.error('Error setting up ad blocker:', error);
      }
    };

    iframe.addEventListener('load', handleLoad);
    return () => {
      cleanup();
      iframe.removeEventListener('load', handleLoad);
    };
  };

  useEffect(() => {
    initPlayer();
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, [video]);

  useEffect(() => {
    const iframe = document.getElementById('movie-player');
    return setupAdBlocker(iframe);
  }, [playerState.iframeUrl]);

  return (
    <div className={s.player}>
      <div className={s.content}>
        {playerState.error ? (
          <div className={s.error}>
            Ошибка: {playerState.error}
          </div>
        ) : playerState.isLoading ? (
          <img src={loading} alt="Загрузка..." className={s.loader} />
        ) : (
          <iframe
            id="movie-player"
            src={playerState.iframeUrl}
            style={CONFIG.DEFAULT_IFRAME_SIZE}
            allowFullScreen
            title="Video player"
          />
        )}
      </div>

      {playerState.sources.length > 0 && (
        <div className={s.sources}>
          {playerState.sources.map((item) => (
            <button
              key={item.source}
              className={`${s.source} ${
                playerState.selectedSource === item.source ? s.selected : ''
              }`}
              onClick={() => handleSourceChange(item.source)}
              disabled={playerState.isLoading}
            >
              {item.source}
              {item.translations?.length > 0 && (
                <span className={s.translationBadge}>
                  {item.translations.length}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Player;