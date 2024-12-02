import { Link } from "react-router-dom";
import s from './Card.module.css'

export const Card = ({id, index, name, originalName, nominatedYear, isWin, yearProduction, platform, country, genre, slogan, director, scenario, producer, operator, composer, artist, installation, worldPremiere, age, time, description, poster, video}) => {
    
    return <>
         <article key={index} className={s.card}>
            <img className={s.card__img} src={poster} alt={originalName} />
            <Link to={`/oscarShortAnimation/film/${id}`}>
                <div className={s.card__info}>
                    <p className={s.card__name}>{name} ({nominatedYear})</p>
                    <p>{description}</p>
                    <p>Длительность - {time}</p>
                </div>
            </Link>
        </article>
    </>
}