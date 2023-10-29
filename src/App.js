import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import { MainLayer } from './layouts/main-layer';
import { Preloader } from './components/preloader/Preloader';

export const App = () => {
  const { loading, error } = useSelector((state) => state.authData);
  console.log('APP')

  return (
    <div className="App">
      <Preloader loading={loading} />
      <MainLayer />
    </div>
  );
}
