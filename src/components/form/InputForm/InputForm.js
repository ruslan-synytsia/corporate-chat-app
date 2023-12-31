import React from 'react';
import { Controller } from 'react-hook-form';
import style from '../FormAuthorization.module.css';

export const InputForm = ({
  passwordVisible,
  type,
  name,
  label,
  control,
  rules,
  errors,
  errorMessagesVisible,
  disableErrors,
  togglePasswordVisibility
}) => {

  return (
    <div className={style.Form_authorization_item}>
      <label htmlFor={name}>{label}</label>
      <Controller
        defaultValue={''}
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            {
              name === 'password' || name === 'repeat_pass' ?
                <>
                  <input
                    {...field}
                    type={passwordVisible ? 'text' : 'password'}
                    onMouseEnter={disableErrors}
                    onTouchStart={disableErrors}
                  />
                  {name === 'password' && (
                    <span
                      className={
                        `${passwordVisible ? style.visible : style.unvisible} ${style.passwordToggle}`
                      }
                      onClick={togglePasswordVisibility}
                    ></span>
                  )}
                </> :
                <>
                  <input
                    {...field}
                    type={type}
                    onMouseEnter={disableErrors}
                    onTouchStart={disableErrors}
                  />
                </>
            }
          </>
        )}
      />
      {errors[name] && errorMessagesVisible && (
        <p
          className={`${style.error}`}
          onMouseEnter={disableErrors}
          onTouchStart={disableErrors}
        >
          {errors[name].message}
        </p>
      )}
    </div>
  );
};  
