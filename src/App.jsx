import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
// import { database } from "./firebase";
// import { data } from "./data";
import { ref, push, onValue } from "firebase/database";
import { useEffect, useState } from "react";

function App() {
  // const [state, setState] = useState([]);

  // const addOscars = (oscar) => {
  //   push(ref(database, "oscars/"), oscar) // Исправлено путь для соответствия с чтением данных
  //     .then(() => {
  //       console.log("Oscar added successfully!");
  //     })
  //     .catch((error) => {
  //       console.error("Error adding oscar: ", error);
  //     });
  // };

  // const writeData = () => {
  //   data.forEach(addOscars);
  // };

  // useEffect(() => {
  //   const oscarsRef = ref(database, "oscars/"); // Исправлено путь для консистентности
  //   onValue(oscarsRef, (snapshot) => {
  //     const data = snapshot.val();
  //     const oscarsList = data ? Object.values(data) : []; // Преобразование в массив, если данные существуют
  //     setState(oscarsList); // Обновление состояния oscars
  //   });
  // }, []); // Пустой массив зависимостей для запуска только при монтировании

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;