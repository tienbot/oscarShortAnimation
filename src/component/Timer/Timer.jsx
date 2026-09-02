import { useState, useEffect, useRef } from "react";
import s from "./Timer.module.css";

const MS_IN_DAY = 24 * 60 * 60 * 1000;
const MS_IN_WEEK = 7 * MS_IN_DAY;

const calcParts = (ms) => {
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(ms / MS_IN_DAY);
  const hours = Math.floor((ms % MS_IN_DAY) / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
};

const getUpcomingWednesday = (now) => {
  const daysUntilWednesday = (2 - now.getDay() + 13) % 7;
  const candidate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + daysUntilWednesday,
    18,
    59,
    59,
    0
  );
  if (candidate.getTime() <= now.getTime()) {
    return new Date(candidate.getTime() + MS_IN_WEEK);
  }
  return candidate;
};

export const Timer = ({ onExpire }) => {
  // фиксируем "текущую цель" один раз при монтировании
  const [target, setTarget] = useState(() => getUpcomingWednesday(new Date()));

  const [timeLeft, setTimeLeft] = useState(() =>
    calcParts(target.getTime() - Date.now())
  );

  const firedRef = useRef(false);

  useEffect(() => {
    const tick = () => {
      const diff = target.getTime() - Date.now();

      if (diff <= 0 && !firedRef.current) {
        // цель наступила → вызываем onExpire
        if (typeof onExpire === "function") {
          try {
            onExpire();
          } catch (e) {
            console.error("onExpire error:", e);
          }
        }
        firedRef.current = true;

        // сразу готовим следующую цель
        const nextTarget = new Date(target.getTime() + MS_IN_WEEK);
        setTarget(nextTarget);
        firedRef.current = false; // сбрасываем для следующей недели
      }

      setTimeLeft(calcParts(diff));
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [onExpire, target]);

  if (!timeLeft) return <p>Загрузка...</p>;

  return (
    <div className={s.timer}>
      <p>
        До публикации новой порции короткометражек: {timeLeft.days}д{" "}
        {timeLeft.hours}ч {timeLeft.minutes}м {timeLeft.seconds}с
      </p>
    </div>
  );
};
