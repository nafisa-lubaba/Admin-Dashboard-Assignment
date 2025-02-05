import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import User from './assets/Pages/User.jsx';
import Products from './assets/Pages/Products.jsx';
import Dashboard from './Layouts/Dashboard.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element:<Dashboard></Dashboard>,
    children: [
     {
      path: "/",
      element: <User></User>,
     },
     {
      path: "/products",
      element: <Products></Products>,
     }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
