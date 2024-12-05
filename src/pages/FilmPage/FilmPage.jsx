import React, { useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { Container } from '../../layout/Container/Container';
import s from './FilmPage.module.css';
import { data } from "../../data";  // Структура данных с films
import VkVideo from '../../component/VkVideo/VkVideo';
import { MegaVideo } from "../../component/MegaVideo/MegaVideo";
import YoutubeVideo from "../../component/YoutubeVideo/YoutubeVideo";
import oscar from '/oscar.webp';
import Player from '../../component/Player/Player';

export const FilmPage = () => {
    const { id } = useParams();
    
    // Поиск фильма в структуре данных
    const filmData = data.find(item => item.films.some(film => film.kinopoiskId === Number(id))); // Найти объект с фильмами
    const film = filmData ? filmData.films.find(film => film.kinopoiskId === Number(id)) : null; // Найти сам фильм в массиве films
    
    const [isBlurred, setIsBlurred] = useState(true); // Изначально картинка с блюром

    const handleClick = () => setIsBlurred(false); // Убираем блюр при клике

    if (!film) {
        return <div>Error: Film not found</div>;
    }
    
    const {
        nameRu,
        nameOriginal,
        nominatedYear,
        year,
        platform,
        countries = [],
        genre,
        slogan,
        director = [],
        scenario = [],
        producer = [],
        operator = [],
        composer = [],
        artist = [],
        installation = [],
        worldPremiere,
        ageLimitLine,
        ratingMpaa,
        filmLength,
        description,
        posterUrl,
        video,
        webUrl,
        nomination = []
    } = film;

    const isWinShortAnimatedFilm = nomination.length > 0 && nomination[0]?.isWinShortAnimatedFilm;

    return (
        <main>
            <Container>
                <Link to="/oscarShortAnimation" className={s.backLink}>← На главную</Link>
                <div className={s.filmPage__content}>
                    <div className={s.filmPage__img}>
                        <img className={s.card__img} src={posterUrl} alt={nameOriginal || nameRu} />
                    </div>
                    <div className={s.filmPage__info}>
                        <h1>{nameRu}</h1>
                        <p>{nameOriginal}</p>
                        <a 
                            className={s.filmPage__kinopoisk} 
                            target='_blank' 
                            href={webUrl} 
                            rel="noopener noreferrer"
                        >
                            Страница Кинопоиска
                        </a>
                        <h2>О фильме</h2>
                        <div className={s.filmPage__content_table}>
                            {[
                                { label: 'Год номинации', value: nominatedYear },
                                { label: 'Год производства', value: year },
                                { label: 'Платформа', value: platform },
                                { label: 'Страна', value: countries.map(c => c.country).join(', ') },
                                { label: 'Жанр', value: genre },
                                { label: 'Слоган', value: slogan },
                                { label: 'Режиссер', value: director.join(', ') },
                                { label: 'Сценарий', value: scenario.join(', ') },
                                { label: 'Продюсер', value: producer.join(', ') },
                                { label: 'Оператор', value: operator.join(', ') },
                                { label: 'Композитор', value: composer.join(', ') },
                                { label: 'Художник', value: artist.join(', ') },
                                { label: 'Монтажер', value: installation.join(', ') },
                                { label: 'Премьера в мире', value: worldPremiere },
                                { label: 'Возраст', value: ageLimitLine },
                                { label: 'Рейтинг MPAA', value: ratingMpaa.toLocaleUpperCase() },
                                { label: 'Время', value: filmLength }
                            ].filter(item => item.value).map((row, index) => (
                                <div key={index} className={s.filmPage__content_row}>
                                    <div className={s.filmPage__content_left}><p>{row.label}:</p></div>
                                    <div className={s.filmPage__content_right}><p>{row.value}</p></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={s.film__price}>
                        <img
                            src={oscar}
                            alt="оскар"
                            className={`${s.film__oscar} ${isBlurred ? s.film__blur : ''} ${isWinShortAnimatedFilm ? '' : s.film__nuar}`}
                            onClick={handleClick}
                        />
                    </div>
                </div>
                <p className={s.filmPage__descr}>{description}</p>
                {video.startsWith('https://mega.nz/') ? (
                    <MegaVideo video={video} />
                ) : video.startsWith('https://vk.com/') || video.startsWith('https://vkvideo.ru/') ? (
                    <VkVideo video={video} />
                ) : video.startsWith('https://www.youtube.com/') ? (
                    <YoutubeVideo video={video} />
                ) : video.startsWith('https://www.kinopoisk.ru') ? (
                    <Player video={video} />
                ) : (
                    <div>Неподдерживаемый формат видео</div>
                )}
                <p className={s.commercial}>
                    Надоела реклама в плеере?{' '}
                    <a href="https://adblockplus.org/ru/download" target='_blank' rel="noopener noreferrer">
                        Установите это расширение
                    </a>
                </p>
            </Container>
        </main>
    );
};
