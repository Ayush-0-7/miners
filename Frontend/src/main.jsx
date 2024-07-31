import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { Store } from './app/Store.jsx'
import { createRoutesFromElements, Route, RouterProvider } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import Wallet from './components/Wallet.jsx'
import Layout from './features/Layout.jsx'
import SignUp from './components/SignUp.jsx'
import Login from './components/Login.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<App/>}/>
      <Route path='/wallet' element={<Wallet/>}/>
      <Route path='/signup' element={<SignUp/>}/>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <RouterProvider router={router} />
  </Provider>,
)
