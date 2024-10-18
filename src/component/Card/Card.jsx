import { Link } from "react-router-dom";
import s from './Card.module.css'
// import img from '../../assets/posters/2022/1.webp'

export const Card = ({id, index, name, originalName, nominatedYear, isWin, yearProduction, platform, country, genre, slogan, director, scenario, producer, operator, composer, artist, installation, worldPremiere, age, time, description, poster, video}) => {
    
    return <>
         <article key={index} className={s.card}>
            {/* <img className={s.card__img} src={poster} alt={originalName} /> */}
            <img className={s.card__img} src={poster} alt={originalName} />
            {/* <p className={s.card__name}>{name}</p> */}
            {/* <p>{originalName}</p>
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
            <p>{video}</p> */}
            <Link to={`/oscarShortAnimation/film/${id}`}>
                <div className={s.card__info}>
                    <p className={s.card__name}>{name} ({yearProduction})</p>
                    <p>{description}</p>
                    <p>Длительность - {time}</p>
                </div>
            </Link>
        </article>
    </>
}