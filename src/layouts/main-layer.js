import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from '../pages/authorization/login/LoginPage';
import { RegistrationPage } from '../pages/authorization/registration/RegistrationPage';
import { HomePage } from '../pages/home/HomePage';
import { withSocket } from '../HOC/withSocket/withSocket';

const HomePageWithSocket = withSocket(HomePage);

export const MainLayer = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/home" element={<HomePageWithSocket />} />
    </Routes>
  )
}
