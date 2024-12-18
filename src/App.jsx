import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { database } from "./firebase";
import { data } from "./data";
import { ref, set, onValue } from "firebase/database";
import { useEffect, useState } from "react";

function App() {

  // const [state, setState] = useState([]);

  // // Функция для перезаписи данных
  // const writeData = () => {
  //   set(ref(database, "oscars/"), data) // Полностью заменяем данные
  //     .then(() => {
  //       console.log("Data updated successfully!");
  //     })
  //     .catch((error) => {
  //       console.error("Error updating data: ", error);
  //     });
  // };

  // useEffect(() => {
  //   // Вызов writeData для перезаписи данных
  //   writeData();

  //   const oscarsRef = ref(database, "oscars/");
  //   onValue(oscarsRef, (snapshot) => {
  //     const data = snapshot.val();
  //     const oscarsList = data ? Object.values(data) : []; // Преобразование в массив, если данные существуют
  //     setState(oscarsList);
  //   });
  // }, []); // Пустой массив зависимостей для выполнения только при монтировании

  return (
    <>
      {/* <button onClick={writeData}>Перезаписать данные</button> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
