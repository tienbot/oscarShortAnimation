import { useParams, Link } from "react-router-dom";
import { Container } from '../../layout/Container/Container';
import s from './FilmPage.module.css';
import { data } from "../../data";

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
                <Link to="/oscarShortAnimation" className={s.backLink}>Back to Home</Link>
                <h1>{name}</h1>
                <p>{originalName}</p>
                <img className={s.card__img} src={`${import.meta.env.BASE_URL}${poster}`} alt={originalName} />
                <p>Год номинации  {nominatedYear}</p>
                {/* <p>{isWin}</p> */}а÷
                <p>Год производства  {yearProduction}</p>
                {platform && <p>Платформа {platform}</p>}
                <p>Страна  {country}</p>
                {genre && <p>Жанр  {genre}</p>}
                {slogan && <p>Слоган {slogan}</p>}
                <p>Режиссер {director}</p>
                <p>Сценарий {scenario}</p>
                <p>Продюссер {producer}</p>
                {operator && <p>Оператор {operator}</p>}
                {composer && <p>Композитор {composer}</p>}
                {artist && <p>Художник {artist}</p>}
                {installation && <p>Монтажер {installation}</p>}
                <p>Премьера в мире {worldPremiere}</p>
                {age && <p>Возрастное ограничение {age}</p>}
                <p>Время {time}</p>
                <p>{description}</p>
                {/* <p>{video}</p> */}
                <div>
                    <iframe src={video} width="640" height="360" allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;" frameborder="0" allowfullscreen></iframe>
                </div>
                <a target='_blank' href={kinopoisk}>Страница Кинопоиска</a>
            </Container>
        </main>
    );
}
