import App from "./App"
import HomePage from "./pages/HomePage"
import GamePage from "./pages/GamePage"
import Scores from "./pages/Scores"
const routes = [
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/game',
        element: <GamePage />
    },
    {   path: '/scores',
        element: <Scores />

    },

]

export default routes