import s from './Main.module.css'
import {SectionCard} from '../../component/SectionCard/SectionCard'


export const Main = () => {
    return <main>
        <SectionCard/>
    </main>
}

// import { Link } from "react-router-dom";
// import { Container } from '../../layout/Container/Container';
// import s from './Main.module.css';
// import { data } from "../../data";

// export const Main = () => {
//     return (
//         <main>
//             <Container>
//                 <div className={s.cardContainer}>
//                     {data.map((film, index) => (
//                         <div key={index} className={s.card}>
//                             <h2>{film.name}</h2>
//                             <img src={`${import.meta.env.BASE_URL}${film.poster}`} alt={film.name} />
//                             <Link to={`/oscarShortAnimation/film/${index}`}>View Details</Link>
//                         </div>
//                     ))}
//                 </div>
//             </Container>
//         </main>
//     );
// }
