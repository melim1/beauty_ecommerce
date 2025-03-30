import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import NotFoundPage from './components/NotFoundPage';
import CartPage from './components/cart/CartPage'
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";

import React from 'react'
import ProductPage from './components/product/ProductPage';
import Profil from './components/profil/Profil';
import InstagramPage from './components/Instagram/InstagramPage';

const App = () => {
  return (
    <BrowserRouter>

      <Routes>
        <Route index element={<NavBar />} />
        <Route path='products/:slug' element={<ProductPage />}></Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/profile' element={<Profile />} />

      <Route path="*" element={<NotFoundPage />} />
       
      </Routes>
    </BrowserRouter>
  )
}

export default App

