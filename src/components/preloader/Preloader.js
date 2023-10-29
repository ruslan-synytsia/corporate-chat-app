import React from 'react';
import style from './Preloader.module.css';

export const Preloader = ({ loading }) => {
  return (
    <div className={loading ? 'preload_container' : 'hide'}>
    <div className={style.Preloader}>
      <div className={style.Circle_container}>
        <div className={style.Circle}></div>
      </div>
      <div className={style.Circle_container}>
        <div className={style.Circle}></div>
      </div>
      <div className={style.Circle_container}>
        <div className={style.Circle}></div>
      </div>
    </div>
  </div>
  )
}