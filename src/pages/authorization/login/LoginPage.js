import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './LoginPage.module.css';
import { FormAuthorization } from '../../../components/form/FormAuthorization';
import { useSelector } from 'react-redux';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { accessAuth } = useSelector((state) => state.authData)

  useEffect(() => {
    if (accessAuth) {
      navigate('/home');
    }
  }, [accessAuth]);

  return (
    <div className={style.Login_page}>
      <div className={style.bcg_img}></div>
      <FormAuthorization type={'login'} />
    </div>
  )
}