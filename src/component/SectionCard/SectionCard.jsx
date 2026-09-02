import { useState, useEffect } from "react";
import s from "./SectionCard.module.css";
import { Container } from "../../layout/Container/Container";
import { Card } from "../Card/Card";
import { Input } from "../Input/Input";
import { onValue, ref, set } from "firebase/database";
import { database } from "../../firebase";
import { Loader } from "../Loader/Loader";

export const SectionCard = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(null);
  const [startIndex, setStartIndex] = useState(null);
  const indexRef = ref(database, "currentIndex");

  // --- получение фильмов ---
  const getFilmsRange = () => {
    if (startIndex === null || currentIndex === null || !data.length) return [];
    const films = [];
    for (let i = currentIndex; i <= startIndex; i++) {
      if (data[i] && data[i].films) {
        films.push(...data[i].films);
      }
    }
    return films;
  };

  // --- загрузка данных ---
  useEffect(() => {
    const oscarsRef = ref(database, "oscars/");
    onValue(oscarsRef, (snapshot) => {
      const data = snapshot.val();
      const oscarsList = data ? Object.values(data) : [];
      setData(oscarsList);
      if (oscarsList.length > 0) setStartIndex(oscarsList.length - 1);
      setIsLoading(false);
    });

    onValue(indexRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const index = typeof data === "object" ? data.value : data;
        setCurrentIndex(index);
      }
    });
  }, []);

  document.title = "Animation Shortcut Oscar";

  if (isLoading) {
    return (
      <div className="loadingPage">
        <Loader />
      </div>
    );
  }

  const filmsToShow = getFilmsRange()
    .filter((film) => {
      const normalizeSearch = (str) =>
        str.toLowerCase().includes(search.toLowerCase());
      return (
        normalizeSearch(film.nameRu) ||
        normalizeSearch(film.nameOriginal) ||
        normalizeSearch(film.nominatedYear.toString())
      );
    })
    .reverse();

  // --- выбираем случайный фильм ---
  const getRandomFilmId = () => {
    if (!filmsToShow.length) return null;
    const randomIndex = Math.floor(Math.random() * filmsToShow.length);
    return filmsToShow[randomIndex].kinopoiskId;
  };

  return (
    <section className={s.sectionCard}>
      <Container>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSubmit={(e) => e.preventDefault()}
          randomID={getRandomFilmId()}
          q={filmsToShow.length}
        />

        {filmsToShow.length > 0 ? (
          <div className={s.sectionCard__content}>
            {filmsToShow.map((film) => (
              <Card key={film.kinopoiskId} {...film} />
            ))}
          </div>
        ) : (
          <div className={s.oops}>
            <p>Упс! Пока фильмов нет(</p>
          </div>
        )}
      </Container>
    </section>
  );
};