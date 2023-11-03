import React from 'react';
import style from './Waiting.module.css';

export const Waiting = () => {
  return (
    <div className={style.Waiting}>
      <span>Downloading...</span>
      <div className={style.Waiting_animate}>
        <div className={style.Waiting_animate_circle}></div>
      </div>
    </div>
  )
}