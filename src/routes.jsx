import { createBrowserRouter } from "react-router-dom";
import App from './App'
import App2 from './App2'


const router = createBrowserRouter([
    {
        path: '/',
        element : <App/>
    },
    {
        path: '/App2',
        element : <App2/>
    },
    {
        path: '*',
        element : <div>Error: Page is not found</div>
    },
])

export default router;