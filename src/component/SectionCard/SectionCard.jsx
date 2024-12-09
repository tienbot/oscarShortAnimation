import { useState, useEffect } from "react";
import s from "./SectionCard.module.css";
import { Container } from "../../layout/Container/Container";
import { Card } from "../Card/Card";
import { Input } from "../Input/Input";
import { Timer } from "../Timer/Timer";
import { onValue, ref } from "firebase/database";
import { database } from "../../firebase";
import { Loader } from "../Loader/Loader";

export const SectionCard = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]); // Изначально пустой массив для фильтрации
  const [showMore, setShowMore] = useState(false); // Переключатель на последние 5 фильмов
  const [isLoading, setIsLoading] = useState(true); // Состояние для отображения Loader

  // Функция для извлечения всех фильмов из данных
  function getAllFilms(data) {
    return data.flatMap((yearData) => yearData.films);
  }

  //получить больше фильмов
  function getMoreFilms(data) {
    return data.flatMap((yearData) => yearData.films).slice(338);
  }

  function getFilms(data) {
    return data.flatMap((yearData) => yearData.films).slice(343);
  }

  const showAll = () => {
    // Отображаем все фильмы
    const allFilms = getAllFilms(data);
    setFilterData(allFilms); // Устанавливаем все фильмы для отображения
    setShowMore(true);
  };

  const handleEndOfWeek = () => {
    // Отображаем последние 5 фильмов
    const allFilms = getMoreFilms(data);
    setFilterData(allFilms); // Берем последние 5 фильмов
    setShowMore(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const normalizeSearch = (str) => str.toLowerCase().includes(search.toLowerCase());

    const filterFilms = (films) =>
      films.filter(
        (film) =>
          normalizeSearch(film.nameRu) ||
          normalizeSearch(film.nameOriginal) ||
          normalizeSearch(film.nominatedYear.toString())
      );

    const filmsToSearch = showMore ? getMoreFilms(data) : getFilms(data);
    const newData = filterFilms(filmsToSearch);

    setFilterData(newData);
  };

  const getWinners = () => {
    const allFilms = getAllFilms(data);
    const winners = allFilms.filter(
      (film) => film.nomination.some((nom) => nom.isWinShortAnimatedFilm)
    );
    setFilterData(winners);
  };

  // Генерация случайного ID из фильтров
  const arrID = filterData.map((film) => film.kinopoiskId);
  const randomID = arrID[Math.floor(Math.random() * arrID.length)];

  useEffect(() => {
    const oscarsRef = ref(database, "oscars/");
    onValue(oscarsRef, (snapshot) => {
      const data = snapshot.val();
      const oscarsList = data ? Object.values(data) : []; // Преобразование в массив, если данные существуют
      setData(oscarsList); // Сохранение данных в состоянии
      setFilterData(getFilms(oscarsList)); // Установка начального состояния фильтра
      setIsLoading(false); // Отключаем Loader после загрузки данных
    });
  }, []); // Пустой массив зависимостей для запуска только при монтировании

  document.title = 'Animation Shortcut Oscar'
  

  if (isLoading) {
    return <div className='loadingPage'>
        <Loader />
    </div>
}

  return (
    <section className={s.sectionCard}>
      <Container>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSubmit={handleSearch}
          randomID={randomID}
          winners={getWinners}
          all={showAll}
          q = {filterData.length}
        />

        {/* <button onClick={handleEndOfWeek}>Выкл. таймер</button>
        <button onClick={showAll}>Показать все фильмы</button> */}

        {!showMore && <Timer onEnd={handleEndOfWeek} />}

        {filterData.length > 0 ? (
          <div className={s.sectionCard__content}>
            {filterData.map((film) => (
              <Card key={film.kinopoiskId} {...film} />
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
