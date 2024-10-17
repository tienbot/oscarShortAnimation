import './App.css'
import {Main} from './pages/Main/Main'
import { FilmPage } from './pages/FilmPage/FilmPage'
import { data } from './data'
import { RouterProvider } from 'react-router-dom'
import router from './routes'

function App() {
  
  return (
    <>
      <RouterProvider router={router}/>
      {/* <Main/> */}
      {/* <FilmPage
        name = {data[0].name}
        originalName = {data[0].originalName}
        nominatedYear = {data[0].nominatedYear}
        isWin= {data[0].isWin}
        yearProduction= {data[0].yearProduction}
        platform= {data[0].platform}
        country= {data[0].country}
        genre= {data[0].genre}
        slogan= {data[0].slogan}
        director= {data[0].director}
        scenario= {data[0].scenario}
        producer= {data[0].producer}
        operator= {data[0].operator}
        composer= {data[0].composer}
        artist= {data[0].artist}
        installation= {data[0].installation}
        worldPremiere= {data[0].worldPremiere}
        age= {data[0].age}
        time= {data[0].time}
        description= {data[0].description}
        poster= {`${import.meta.env.BASE_URL}${data[0].poster}`}
        video= {data[0].video}
      /> */}
    </>
  )
}

export default App
