import { useEffect, useState } from "react";
import s from "./Timer.module.css";

export const Timer = ({ onEnd }) => {
  const [timeLeft, setTimeLeft] = useState("");

  const calculateTimeLeft = () => {
    const now = new Date();

    // Расчет времени окончания среды
    const daysUntilWednesday = (2 - now.getDay() + 7) % 7;
    const endOfWednesday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + daysUntilWednesday,
      23, //23
      59, //59
      59 // Конец среды
    );
    
    const diff = endOfWednesday - now;

    if (diff <= 0) {
      return null; // Таймер завершен
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();

      if (!newTimeLeft) {
        clearInterval(timer);
        onEnd(); // Сообщаем об окончании таймера
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [onEnd]);

  return (
    <div className={s.timer}>
      {timeLeft ? (
        <p>
          До публикации новых короткометражек: {timeLeft.days}д {timeLeft.hours}ч {timeLeft.minutes}м {timeLeft.seconds}с
        </p>
      ) : (
        <p>Время вышло!</p>
      )}
    </div>
  );
};
