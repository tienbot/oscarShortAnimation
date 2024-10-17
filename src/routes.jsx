import { createBrowserRouter } from "react-router-dom";
import { Main } from "./pages/Main/Main";
import { FilmPage } from "./pages/FilmPage/FilmPage";

const router = createBrowserRouter([
    {
        path: '/oscarShortAnimation',
        element: <Main />
    },
    {
        path: '/oscarShortAnimation/film/:id',
        element: <FilmPage />
    },
    {
        path: '*',
        element: <div>Error: Page is not found</div>
    },
]);

export default router;
