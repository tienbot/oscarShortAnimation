import s from './Loader.module.css'

export const Loader = () => {
    return <div className={s.dotSpinner}>
        <div className={s.dotSpinner__dot}></div>
        <div className={s.dotSpinner__dot}></div>
        <div className={s.dotSpinner__dot}></div>
        <div className={s.dotSpinner__dot}></div>
        <div className={s.dotSpinner__dot}></div>
        <div className={s.dotSpinner__dot}></div>
        <div className={s.dotSpinner__dot}></div>
        <div className={s.dotSpinner__dot}></div>
    </div>
}