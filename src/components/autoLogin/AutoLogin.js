import React, { useEffect, useState } from 'react';
import style from './AutoLogin.module.css';

export const AutoLogin = ({ register, setValue }) => {
  // Getting the checkbox state from local storage or setting the default value
  const initialRememberMe = localStorage.getItem('rememberMe') === 'true' || false;
  const [rememberMe, setRememberMe] = useState(initialRememberMe);
  
  useEffect(() => {
    setValue(initialRememberMe);
  }, [setValue, initialRememberMe]);
  
  const handleRememberMeChange = () => {
    const newValue = !rememberMe;
    setRememberMe(newValue);
  
    // Saving the new value in local storage
    localStorage.setItem('rememberMe', newValue);
  };

  return (
    <div className={style.Autologin}>
        <label htmlFor={'autoLogin'} className={style.Autologin_label_checkbox}>
            <span>Remeber Me</span>
            <input 
              {...register('autoLogin', { defaultValue: rememberMe })} 
              id={'autoLogin'} 
              type="checkbox" 
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            <div className={style.Autologin_custom_check_icon}></div>
        </label>
    </div>
  )
}