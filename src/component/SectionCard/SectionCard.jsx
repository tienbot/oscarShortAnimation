import s from './SectionCard.module.css'
import { Container } from '../../layout/Container/Container'
import { data } from '../../data'
import { Card } from '../Card/Card'
import { useNavigate } from 'react-router-dom'

export const SectionCard = () => {
    const navigate = useNavigate()

    return <section className={s.sectionCard}>
        <Container>
            <div className={s.sectionCard__content}>
                {data.map((el, index)=><Card
                    index = {index}
                    name = {el.name}
                    originalName = {el.originalName}
                    nominatedYear = {el.nominatedYear}
                    isWin= {el.isWin}
                    yearProduction= {el.yearProduction}
                    platform= {el.platform}
                    country= {el.country}
                    genre= {el.genre}
                    slogan= {el.slogan}
                    director= {el.director}
                    scenario= {el.scenario}
                    producer= {el.producer}
                    operator= {el.operator}
                    composer= {el.composer}
                    artist= {el.artist}
                    installation= {el.installation}
                    worldPremiere= {el.worldPremiere}
                    age= {el.age}
                    time= {el.time}
                    description= {el.description}
                    poster= {`${import.meta.env.BASE_URL}${el.poster}`}
                    video= {el.video}
                    onClick = {() => navigate('/FilmPage')}
                />)}
            </div>
        </Container>
    </section>
}