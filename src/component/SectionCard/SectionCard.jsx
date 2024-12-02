import { useState} from "react";
import s from "./SectionCard.module.css";
import { Container } from "../../layout/Container/Container";
import { data } from "../../data";
import { Card } from "../Card/Card";
import { Input } from "../Input/Input";
import { Timer } from "../Timer/Timer";

export const SectionCard = () => {
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState(data.slice(5)); // Изменяемый / дополняемый массив
  const [showLastFive, setShowLastFive] = useState(false); // Переключатель на последние 5 фильмов

  const handleEndOfWeek = () => {
    // Отображаем последние 5 фильмов
    setFilterData(data);
    setShowLastFive(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  
    const newData = showLastFive //если true
      ? data.filter(  //поиск по всей data
          (el) =>
            el.name.toLowerCase().includes(search.toLowerCase()) ||
            el.originalName.toLowerCase().includes(search.toLowerCase()) ||
            el.nominatedYear.toString().includes(search)
        )
      : data 
          .slice(5) //иначе поиск по всей data, кроме первых 5
          .filter(
            (el) =>
              el.name.toLowerCase().includes(search.toLowerCase()) ||
              el.originalName.toLowerCase().includes(search.toLowerCase()) ||
              el.nominatedYear.toString().includes(search)
          );
    setFilterData(newData);
  };
  
  
  let arrID = filterData.map(item => item.id)
  let randomID = arrID[Math.floor(Math.random() * arrID.length)]

  let getWinners = () => {
    let winners = data.filter(el => el.isWin === true)
    setFilterData(winners)
  }
  
  return (
    <section className={s.sectionCard}>
      <Container>
        <Input
          value={search}
          onChange={(el) => setSearch(el.target.value)}
          onSubmit={handleSearch}
          randomID={randomID}
          winners = {getWinners}
          all={() => setFilterData(data)}
        />
        {/* <button onClick={()=>{handleEndOfWeek()}}>test</button> */}
        {!showLastFive && <Timer onEnd={handleEndOfWeek} />}

        {filterData.length > 0 ? (
          <div className={s.sectionCard__content}>
            {filterData.map((el) => (
              <Card key={el.id} {...el} poster={`${import.meta.env.BASE_URL}${el.poster}`} />
            ))}
          </div>
        ) : (
            <div className={s.oops}>
                <p>Упс! Пока такого фильма нет(</p>
            </div>
        )}
      </Container>
    </section>
  );
};
