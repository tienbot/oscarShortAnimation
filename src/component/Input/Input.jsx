import s from './Input.module.css'

export const Input = ({value, onChange, onSubmit}) => {return <div>
    <form className={s.form} action="" onSubmit={onSubmit}>
        <input className={s.input} type="text" onChange={onChange} value={value} placeholder='Поиск по названию / году'/>
        {/* <input className={s.button} type="submit" value='Поиск'/> */}
    </form>
</div>}