import { useParams, Link } from "react-router-dom";
import { Container } from '../../layout/Container/Container';
import s from './FilmPage.module.css';
import { data } from "../../data";
import VkVideo from '../../component/VkVideo/VkVideo'

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
                            <div className={s.filmPage__content_left}>
                                <p>Год номинации:</p>
                                <p>Год производства:</p>
                                {platform && <p>Платформа:</p>}
                                <p>Страна:</p>
                                {genre && <p>Жанр:</p>}
                                {slogan && <p>Слоган:</p>}
                                <p>Режиссер:</p>
                                <p>Сценарий:</p>
                                <p>Продюсер:</p>
                                {operator && <p>Оператор:</p>}
                                {composer && <p>Композитор:</p>}
                                {artist && <p>Художник:</p>}
                                {installation && <p>Монтажер:</p>}
                                <p>Премьера в мире:</p>
                                {age && <p>Возрастное ограничение:</p>}
                                <p>Время:</p>
                            </div>
                            <div className="">
                                <p>{nominatedYear}</p>
                                <p>{yearProduction}</p>
                                {platform && <p>{platform}</p>}
                                <p>{country}</p>
                                {genre && <p>{genre}</p>}
                                {slogan && <p>{slogan}</p>}
                                <p>{director}</p>
                                <p>{scenario}</p>
                                <p>{producer}</p>
                                {operator && <p>{operator}</p>}
                                {composer && <p>{composer}</p>}
                                {artist && <p>{artist}</p>}
                                {installation && <p>{installation}</p>}
                                <p>{worldPremiere}</p>
                                {age && <p>{age}</p>}
                                <p>{time}</p>
                            </div>
                        </div>
                        
                    </div>

                </div>
                
               
                <p className={s.filmPage__descr}>{description}</p>
                {video && (
                    <div>
                        <VkVideo video={video} />
                    </div>
                )}
            </Container>
        </main>
    )
}
