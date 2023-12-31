import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import style from './RegistrationPage.module.css';
import { FormAuthorization } from '../../../components/form/FormAuthorization';

export const RegistrationPage = () => {
  const navigate = useNavigate();
  const { accessAuth } = useSelector((state) => state.authData)

  useEffect(() => {
    if (accessAuth) {
      navigate('/home');
    }
  }, [accessAuth]);

  return (
    <div className={style.Registration_page}>
      <div className={style.col_1}>
        <FormAuthorization />
      </div>
      <div className={style.col_2}>
        <div className={style.content}>
          <h1>Hello and welcome to our<span> Corporate</span><span> Chat</span></h1>
          <p>
            <span>We're thrilled to have you join our community of professionals.</span><span>Feel free to ask questions, share ideas, and engage in insightful discussions.</span><span>Together, we can achieve great things. Once again, a warm welcome to you!</span>
          </p>
        </div>
      </div>
    </div>
  )
}