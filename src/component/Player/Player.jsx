import React, { useState, useEffect } from 'react';
import s from './Player.module.css';
import loading from '../../assets/loading.svg';

const Player = ({ video }) => {
    const [iframeUrl, setIframeUrl] = useState('');
    const [sources, setSources] = useState([]);
    const [selectedSource, setSelectedSource] = useState('');
    const [selectedTranslation, setSelectedTranslation] = useState('');

    useEffect(() => {
        // Извлекаем числовой ID из URL, например, '4308670' из 'https://www.kinopoisk.ru/film/4308670/'
        const kinopoiskId = video.match(/\/film\/(\d+)\//)?.[1];

        if (kinopoiskId) {
            const fetchPlayerData = async () => {
                try {
                    const response = await fetch(`https://kinobox.tv/api/players?kinopoisk=${kinopoiskId}`);
                    const result = await response.json();

                    if (Array.isArray(result)) {
                        const filteredSources = result.filter((item) => item.iframeUrl !== null);
                        setSources(filteredSources);

                        // Устанавливаем первую доступную кнопку как активную
                        if (filteredSources.length > 0 && filteredSources[0].translations.length > 0) {
                            setIframeUrl(filteredSources[0].translations[0].iframeUrl);
                            setSelectedSource(filteredSources[0].source);
                            setSelectedTranslation(filteredSources[0].translations[0].id);
                        }
                    } else {
                        console.error("Полученные данные не являются массивом", result);
                    }
                } catch (error) {
                    console.error("Ошибка при получении данных", error);
                }
            };

            fetchPlayerData();
        }
    }, [video]);

    const handleSourceChange = (source) => {
        setSelectedSource(source);
        const sourceData = sources.find(item => item.source === source);
        if (sourceData && sourceData.translations.length > 0) {
            setIframeUrl(sourceData.translations[0].iframeUrl);
            setSelectedTranslation(sourceData.translations[0].id);
        } else if (sourceData) {
            setIframeUrl(sourceData.iframeUrl);
        }
    };

    // Блокировка рекламы с использованием MutationObserver
    useEffect(() => {
        const iframe = document.getElementById('movie-player');
        if (iframe) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        const adScripts = Array.from(iframe.contentDocument?.scripts || []).filter(
                            script => script.src.includes('imasdk.googleapis.com')
                        );
                        adScripts.forEach(adScript => adScript.remove());
                    }
                });
            });

            iframe.addEventListener('load', () => {
                const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
                observer.observe(iframeDocument, { childList: true, subtree: true });
            });

            return () => observer.disconnect();
        }
    }, [iframeUrl]);

    return (
        <div className={s.player}>
            <div className={s.content}>
                {iframeUrl ? (
                    <iframe id="movie-player" src={iframeUrl} width="600" height="400" allowFullScreen />
                ) : (
                    <img src={loading} alt="Loading..." />
                )}
            </div>

            <div className={s.sources}>
                {sources.map((item) => (
                    <button
                        key={item.source}
                        value={item.source}
                        className={`${s.source} ${selectedSource === item.source ? s.selected : ''}`}
                        onClick={() => handleSourceChange(item.source)}
                    >
                        {item.source}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Player;
