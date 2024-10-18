import { useParams, Link } from "react-router-dom";
import { Container } from '../../layout/Container/Container';
import s from './FilmPage.module.css';
import { data } from "../../data";

export const FilmPage = () => {
    const { id } = useParams();
    const film = data[id];

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
                <img className={s.card__img} src={`${import.meta.env.BASE_URL}${poster}`} alt={originalName} />
                <p className={s.card__name}>{name}</p>
                <p>{originalName}</p>
                <p>{nominatedYear}</p>
                <p>{isWin}</p>
                <p>{yearProduction}</p>
                <p>{platform}</p>
                <p>{country}</p>
                <p>{genre}</p>
                <p>{slogan}</p>
                <p>{director}</p>
                <p>{scenario}</p>
                <p>{producer}</p>
                <p>{operator}</p>
                <p>{composer}</p>
                <p>{artist}</p>
                <p>{installation}</p>
                <p>{worldPremiere}</p>
                <p>{age}</p>
                <p>{time}</p>
                <p>{description}</p>
                <p>{video}</p>
                <a target='_blank' href={kinopoisk}>Страница Кинопоиска</a>
            </Container>
        </main>
    );
}
