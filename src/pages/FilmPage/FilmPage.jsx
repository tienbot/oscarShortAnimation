import { useParams, Link } from "react-router-dom";
import { Container } from '../../layout/Container/Container';
import s from './FilmPage.module.css';
import { data } from "../../data";
import VkVideo from '../../component/VkVideo/VkVideo'
import { MegaVideo } from "../../component/MegaVideo/MegaVideo";

import Player from '../../component/Player/Player'

export const FilmPage = () => {
    const { id } = useParams();
    const film = data.find(film => film.id === id); // Ищем фильм по id

    // Проверка на случай, если по переданному id нет фильма.
    if (!film) {
        return <div>Error: Film not found</div>;
    }

    const {
        name,
        originalName,
        nominatedYear,
        isWin,
        yearProduction,
        platform,
        country,
        genre,
        slogan,
        director,
        scenario,
        producer,
        operator,
        composer,
        artist,
        installation,
        worldPremiere,
        age,
        time,
        description,
        poster,
        video,
        kinopoisk
    } = film;

    return (
        <main>
            <Container>
                <Link to="/oscarShortAnimation" className={s.backLink}>← На главную</Link>
                <div className={s.filmPage__content}>
                    <div className={s.filmPage__img}>
                        <img className={s.card__img} src={`${import.meta.env.BASE_URL}${poster}`} alt={originalName} />
                    </div>
                    <div className={s.filmPage__info}>
                        <h1>{name}</h1>
                        <p>{originalName}</p>
                        <a className={s.filmPage__kinopoisk} target='_blank' href={kinopoisk} rel="noopener noreferrer">Страница Кинопоиска</a>
                        <h2>О фильме</h2>
                        <div className={s.filmPage__content}>
                            <div className={s.filmPage__content_table}>
                                <div className={s.filmPage__content_row}>
                                    <div className={s.filmPage__content_left}><p>Год номинации:</p></div>
                                    <div className={s.filmPage__content_right}><p>{nominatedYear}</p></div>
                                </div>
                                <div className={s.filmPage__content_row}>
                                    <div className={s.filmPage__content_left}><p>Год производства:</p></div>
                                    <div className={s.filmPage__content_right}><p>{yearProduction}</p></div>
                                </div>
                                <div className={s.filmPage__content_row}>
                                    <div className={s.filmPage__content_left}>{platform && <p>Платформа:</p>}</div>
                                    <div className={s.filmPage__content_right}>{platform && <p>{platform}</p>}</div>
                                </div>
                                <div className={s.filmPage__content_row}>
                                    <div className={s.filmPage__content_left}><p>Страна:</p></div>
                                    <div className={s.filmPage__content_right}><p>{country}</p></div>
                                </div>
                                <div className={s.filmPage__content_row}>
                                    <div className={s.filmPage__content_left}>{genre && <p>Жанр:</p>}</div>
                                    <div className={s.filmPage__content_right}>{genre && <p>{genre}</p>}</div>
                                </div>
                                <div className={s.filmPage__content_row}>
                                    <div className={s.filmPage__content_left}>{slogan && <p>Слоган:</p>}</div>
                                    <div className={s.filmPage__content_right}>{slogan && <p>{slogan}</p>}</div>
                                </div>
                                <div className={s.filmPage__content_row}>
                                    <div className={s.filmPage__content_left}><p>Режиссер:</p></div>
                                    <div className={s.filmPage__content_right}><p>{director}</p></div>
                                </div>
                                <div className={s.filmPage__content_row}>
                                    <div className={s.filmPage__content_left}><p>Сценарий:</p></div>
                                    <div className={s.filmPage__content_right}><p>{scenario}</p></div>
                                </div>
                                <div className={s.filmPage__content_row}>
                                    <div className={s.filmPage__content_left}><p>Продюсер:</p></div>
                                    <div className={s.filmPage__content_right}><p>{producer}</p></div>
                                </div>
                                <div className={s.filmPage__content_row}>
                                    <div className={s.filmPage__content_left}>{operator && <p>Оператор:</p>}</div>
                                    <div className={s.filmPage__content_right}>{operator && <p>{operator}</p>}</div>
                                </div>
                                <div className={s.filmPage__content_row}>
                                    <div className={s.filmPage__content_left}>{composer && <p>Композитор:</p>}</div>
                                    <div className={s.filmPage__content_right}>{composer && <p>{composer}</p>}</div>
                                </div>
                                <div className={s.filmPage__content_row}>
                                    <div className={s.filmPage__content_left}>{artist && <p>Художник:</p>}</div>
                                    <div className={s.filmPage__content_right}>{artist && <p>{artist}</p>}</div>
                                </div>
                                <div className={s.filmPage__content_row}>
                                    <div className={s.filmPage__content_left}>{installation && <p>Монтажер:</p>}</div>
                                    <div className={s.filmPage__content_right}>{installation && <p>{installation}</p>}</div>
                                </div>
                                <div className={s.filmPage__content_row}>
                                    <div className={s.filmPage__content_left}><p>Премьера в мире:</p></div>
                                    <div className={s.filmPage__content_right}><p>{worldPremiere}</p></div>
                                </div>
                                <div className={s.filmPage__content_row}>
                                    <div className={s.filmPage__content_left}>{age && <p>Возрастное ограничение:</p>}</div>
                                    <div className={s.filmPage__content_right}>{age && <p>{age}</p>}</div>
                                </div>
                                <div className={s.filmPage__content_row}>
                                    <div className={s.filmPage__content_left}><p>Время:</p></div>
                                    <div className={s.filmPage__content_right}><p>{time}</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
                <p className={s.filmPage__descr}>{description}</p>
                {video.startsWith('https://mega.nz/') ? (
                    <MegaVideo video={video} />
                ) : video.startsWith('https://vk.com/') ? (
                    <VkVideo video={video} />
                ) : video.startsWith('https://www.kinopoisk.ru') ? (
                    <Player video={video} />
                ) : (
                    <div>Неподдерживаемый формат видео</div>
                )}
            </Container>
        </main>
    )
}
