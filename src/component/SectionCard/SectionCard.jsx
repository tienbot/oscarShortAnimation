import { useState} from "react";
import s from "./SectionCard.module.css";
import { Container } from "../../layout/Container/Container";
import { data } from "../../data";
import { Card } from "../Card/Card";
import { Input } from "../Input/Input";

export const SectionCard = () => {
  const reversedData = [...data].reverse();

  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState(reversedData); // Изменяемый / дополняемый массив

  function startSearch(e) {
    e.preventDefault();
    const newData = reversedData.filter(
      (el) =>
        el.name.toLowerCase().includes(search.toLowerCase()) ||
        el.originalName.toLowerCase().includes(search.toLowerCase()) ||
        el.nominatedYear.toString().includes(search)
    );
    setFilterData(newData);
  }

  return (
    <section className={s.sectionCard}>
      <Container>
        <Input
          value={search}
          onChange={(el) => setSearch(el.target.value)}
          onSubmit={(e) => startSearch(e)}
        />
        {filterData.length > 0 ? (
          <div className={s.sectionCard__content}>
            {filterData.map((el) => (
              <Card
                key={el.id}
                id={el.id}
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
        ) : (
            <div className={s.oops}>
                {/* <p>Упс! Мы честно искали, но ничего не нашли 😔</p> */}
                <p>Упс! Пока такого фильма нет(</p>
                {/* <p>Eсли номинировался на премию Оскар, то он здесь обязательно появится</p> */}
                {/* <p>👀</p> */}

            </div>
        )}
      </Container>
    </section>
  );
};
