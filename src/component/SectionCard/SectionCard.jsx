import s from './SectionCard.module.css';
import { Container } from '../../layout/Container/Container';
import { data } from '../../data';
import { Card } from '../Card/Card';

export const SectionCard = () => {
    // Создаем копию массива и реверсируем её
    const reversedData = [...data].reverse();

    return (
        <section className={s.sectionCard}>
            <Container>
                <div className={s.sectionCard__content}>
                    {reversedData.map((el, index) => (
                        <Card
                            key={index}
                            index={index}
                            name={el.name}
                            originalName={el.originalName}
                            nominatedYear={el.nominatedYear}
                            isWin={el.isWin}
                            yearProduction={el.yearProduction}
                            platform={el.platform}
                            country={el.country}
                            genre={el.genre}
                            slogan={el.slogan}
                            director={el.director}
                            scenario={el.scenario}
                            producer={el.producer}
                            operator={el.operator}
                            composer={el.composer}
                            artist={el.artist}
                            installation={el.installation}
                            worldPremiere={el.worldPremiere}
                            age={el.age}
                            time={el.time}
                            description={el.description}
                            poster={`${import.meta.env.BASE_URL}${el.poster}`}
                            video={el.video}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
};
