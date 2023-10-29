import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import { MainLayer } from './layouts/main-layer';
import { Preloader } from './components/preloader/Preloader';

export const App = () => {
  const { loading, error } = useSelector((state) => state.authData);

  return (
    <div className="App">
      {console.log(loading)}
      <Preloader loading={loading} />
      <MainLayer />
    </div>
  );
}
