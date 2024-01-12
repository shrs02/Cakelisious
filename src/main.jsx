import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Bday from "./pages/Bday";
import Aboutus from "./pages/Aboutus";
import Terms from "./pages/Terms";
import Cake from './pages/Cake'
import Home from "./pages/Home";
import Pastry from "./pages/Pastry";
import Wed from "./pages/Wed";
import { Provider } from 'react-redux'
import store from './store/store.js'
import {Login,Signup,Logout,Cart} from "./components/index.js"
import Cardc from "./pages/Cardc";
import Cardpa from "./pages/Cardpa.jsx";
import Cardw from "./pages/Cardw";
import Custom from "./pages/Custom";
import Cardcc from "./pages/Cardcc";
import Buy from "./pages/Buy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/cake",
            element: (
                    <Cake />
            ),
        },
        {
            path: "/pastry",
            element: (
                    <Pastry />
            ),
        },
        {
            path: "/bday",
            element: (
                    <Bday />
            ),
        },
        {
            path: "/wed",
            element: (
                    < Wed/>
            ),
        },
        {
            path: "/logout",
            element: (
                    < Logout/>
            ),
        },
        {
            path: "/cart",
            element: (
                    < Cart/>
            ),
        },
        {
            path: "/custom",
            element: (
                    < Custom/>
            ),
        },
        {
            path: "/cardc/:slug",
            element: (
                    < Cardc/>
            ),
        },
        {
            path: "/cardpa/:slug",
            element: (
                    < Cardpa/>
            ),
        },
        {
            path: "/cardw/:slug",
            element: (
                    < Cardw/>
            ),
        },
        {
            path: "/cardcc/:slug",
            element: (
                    < Cardcc/>
            ),
        },
        {
            path: "/aboutus",
            element: (
                    < Aboutus/>
            ),
        },
        {
            path: "/terms",
            element: (
                    < Terms/>
            ),
        },
        {
            path: "/buy",
            element: (
                    < Buy/>
            ),
        },
    ],
    },
    {
        path: "/login",
        element: (
                < Login/>
        ),
    },
    {
        path: "/signup",
        element: (
                < Signup/>
        ),
    },
    ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)



