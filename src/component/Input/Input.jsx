import s from './Input.module.css'
import logo from '/oscars.svg'
import { Link } from "react-router-dom";



export const Input = ({value, onChange, onSubmit, randomID, winners, all}) => {return <div className={s.wrapper}>
    <img src={logo} alt="logo" className={s.logo} />
    <div className={s.buttons}>
        <Link to={`/oscarShortAnimation/film/${randomID}`}>
            <button className={s.button}>Случайная</button>
        </Link>
        {/* <button className={s.button} type='button' onClick={all}>Все</button>
        <button className={s.button} type='button' onClick={winners}>Победители</button> */}
    </div>
    <form className={s.form} action="" onSubmit={onSubmit}>
        <input className={s.input} type="text" onChange={onChange} value={value} placeholder='Поиск по названию / году'/>
    </form>
</div>}