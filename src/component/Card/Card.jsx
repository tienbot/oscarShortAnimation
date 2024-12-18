import { Link } from "react-router-dom";
import s from './Card.module.css'

export const Card = ({kinopoiskId, posterUrl, index, nameRu, originalName, nominatedYear, filmLength, description,}) => {
    
    return <>
         <article key={index} className={s.card}>
            <img className={s.card__img} src={posterUrl} alt={originalName} loading="lazy"/>
            <Link to={`/oscarShortAnimation/film/${kinopoiskId}`}>
                <div className={s.card__info}>
                    <p className={s.card__name}>{nameRu} ({nominatedYear})</p>
                    <p className={s.card__descr}>{description}</p>
                    <p>Длительность - {filmLength}</p>
                </div>
            </Link>
        </article>
    </>
}