import s from './Input.module.css'
import logo from '/oscars.svg'
import { Link } from "react-router-dom";

export const Input = ({value, onChange, onSubmit, randomID, q}) => {
  return (
    <div className={s.wrapper}>
      <img src={logo} alt="logo" className={s.logo} />
      <div className={s.buttons}>
        {randomID && (
          <Link to={`/oscarShortAnimation/film/${randomID}`}>
            <button className={s.button}>Любой из {q} мультов</button>
          </Link>
        )}
      </div>
      <form className={s.form} action="" onSubmit={onSubmit}>
        <input
          className={s.input}
          type="text"
          onChange={onChange}
          value={value}
          placeholder='Поиск по названию / году'
        />
      </form>
    </div>
  );
}
