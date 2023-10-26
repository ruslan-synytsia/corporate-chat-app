import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';
import style from './FormAuthorization.module.css';
import { InputForm } from './InputForm/InputForm';
import { AutoLogin } from '../autoLogin/AutoLogin';
import { Modal } from '../modal/Modal';
import { fetchAuthLogin, fetchAuthRegistration } from '../../redux-store/authSlice';

export const FormAuthorization = (props) => {
  const dispatch = useDispatch();
  const {
    statusCode,
    message,
    loading,
    error } = useSelector((state) => state.authData);

  const {
    handleSubmit,
    control,
    register,
    watch,
    formState: { errors },
    setValue,
    reset
  } = useForm();

  const [serverMessage, setServerMessage] = useState('');
  const [errorMessagesVisible, setErrorMessagesVisible] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

//============================= Helpers =============================
  const updateAutoLogin = (newValue) => {
    setValue('autoLogin', newValue);
  };

  const resetModalOpen = () => {
    setModalOpen(false)
  };

  const enableErrors = () => {
    setIsSubmit(true);
    setErrorMessagesVisible(true)
  };

  const disableErrors = () => {
    if (isSubmit) {
      setIsSubmit(false);
      setTimeout(() => {
        setErrorMessagesVisible(false);
      }, 1000)
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
      setPasswordVisible((prevVisible) => !prevVisible);
  };

  //============================ UseEffect function =============================

  useEffect(() => {
    if (props.type === 'login') {
      if (statusCode === 1 && message) {
        setServerMessage(message); // This is a user login error
        setModalOpen(true) //An error message is displayed here to the user
      }
    } else {
      // Checking the response status
      if (statusCode === 1 && message) {
        setServerMessage(message); // This is a user login error
        setModalOpen(true) //An error message is displayed here to the user
      } else {
        // Handling successful login
        if (message) {
          setServerMessage(message);
          setModalOpen(true);
        }
      }
    }
  }, [props.type, statusCode, message]);

  //============================= Function onSubmit =============================
  const onSubmit = async (data) => {
    try {
      if (props.type === 'login') {
        dispatch(fetchAuthLogin(data));
      } else {
        const { repeat_pass, ...formData } = data;
        dispatch(fetchAuthRegistration(formData));
      }
    } catch (err) {
      console.log(err)
    }
    resetModalOpen();
    reset();
  };

  return (
    <>
      <Modal isOpen={modalOpen}><span>{serverMessage}</span></Modal>
      {
        props.type === 'login' ?
          // Form login option =================
          <form
            className={style.Form_authorization}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={style.logo}>
              <img src={logo} alt="Logo" />
              <div className={style.logo_title}>
                <span className={style.logo_title_part_one}>Corporate</span>
                <span className={style.logo_title_part_two}>Chat</span>
              </div>
            </div>

            {/* Login input */}
            <InputForm
              type={'text'}
              name={'login'}
              label={'Login'}
              control={control}
              rules={{
                required: 'This field is required',
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message: 'Login must contain only Latin letters',
                },
                minLength: {
                  value: 3,
                  message: 'Login must be at least 3 characters long',
                },
                maxLength: {
                  value: 12,
                  message: 'Login must not exceed 12 characters',
                },
              }}
              errors={errors}
              errorMessagesVisible={errorMessagesVisible}
              disableErrors={disableErrors}
            />

            {/* Password input */}
            <InputForm
              passwordVisible={passwordVisible}
              type={'password'}
              name={'password'}
              label={'Password'}
              control={control}
              rules={{
                required: 'This field is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
                },
                maxLength: {
                  value: 16,
                  message: 'Password must not exceed 16 characters',
                },
                pattern: {
                  value: /^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*])[\w!@#$%^&*]+$/,
                  message: 'Password must contain only Latin letters at least one uppercase letter and one special character (!@#$%^&*)',
                },
              }}
              errorMessagesVisible={errorMessagesVisible}
              disableErrors={disableErrors}
              errors={errors}
              togglePasswordVisibility={togglePasswordVisibility}
            />

            {/* AutoLogin component */}
            <div className={style.Form_authorization_item}>
              <AutoLogin register={register} setValue={updateAutoLogin} />
            </div>

            {/* Submit button */}
            <div className={style.Form_authorization_item}>
              <input type="submit" value="Submit" onClick={enableErrors} />
            </div>

            {/* Link to back */}
            <div className={style.back}>
              <span>Don't have an account?</span>
              <Link to={'/registration'}>Sign Up</Link>
            </div>

          </form>
          :
          // Form registration option =================
          <form
            className={style.Form_authorization}
            onSubmit={handleSubmit(onSubmit)}
          >

            {/* Link to back */}
            <div className={style.back}>
              <span>Have an account?</span>
              <Link to={'/'}>Log in now</Link>
            </div>

            {/* Username input */}
            <InputForm
              type={'text'}
              name={'username'}
              label={'First Name'}
              control={control}
              rules={{
                required: 'This field is required',
                maxLength: {
                  value: 24,
                  message: 'First Name must not exceed 24 characters',
                },
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message: 'Password must contain only Latin letters',
                },
              }}
              errorMessagesVisible={errorMessagesVisible}
              disableErrors={disableErrors}
              errors={errors}
            />

            {/* LastName input */}
            <InputForm
              type={'text'}
              name={'last_name'}
              label={'Last Name'}
              control={control}
              rules={{
                required: 'This field is required',
                maxLength: {
                  value: 24,
                  message: 'Last Name must not exceed 24 characters',
                },
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: 'Last Name must contain only Latin letters',
                },
              }}
              errorMessagesVisible={errorMessagesVisible}
              disableErrors={disableErrors}
              errors={errors}
            />

            {/* Login input */}
            <InputForm
              type={'text'}
              name={'login'}
              label={'Login'}
              control={control}
              rules={{
                required: 'This field is required',
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: 'Login must contain only Latin letters',
                },
                minLength: {
                  value: 3,
                  message: 'Login must be at least 3 characters long',
                },
                maxLength: {
                  value: 12,
                  message: 'Login must not exceed 12 characters',
                },
              }}
              errors={errors}
              errorMessagesVisible={errorMessagesVisible}
              disableErrors={disableErrors}
            />

            {/* Password input */}
            <InputForm
              passwordVisible={passwordVisible}
              type={'text'}
              name={'password'}
              label={'Password'}
              control={control}
              rules={{
                required: 'This field is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
                },
                maxLength: {
                  value: 16,
                  message: 'Password must not exceed 16 characters',
                },
                pattern: {
                  value: /^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*])[\w!@#$%^&*]+$/,
                  message: 'Password must contain only Latin letters at least one uppercase letter and one special character (!@#$%^&*)',
                },
              }}
              errorMessagesVisible={errorMessagesVisible}
              disableErrors={disableErrors}
              errors={errors}
              togglePasswordVisibility={togglePasswordVisibility}
            />

            {/* Repeat password input */}
            <InputForm
              passwordVisible={passwordVisible}
              type={'text'}
              name={'repeat_pass'}
              label={'Repeat Password'}
              control={control}
              rules={{
                required: 'This field is required',
                validate: {
                  passwordMatch: (value) => value === watch('password') || 'Passwords do not match',
                },
              }}
              errorMessagesVisible={errorMessagesVisible}
              disableErrors={disableErrors}
              errors={errors}
              togglePasswordVisibility={togglePasswordVisibility}
            />

            {/* Email input */}
            <InputForm
              type={'text'}
              name={'email'}
              label={'Email'}
              control={control}
              rules={{
                required: 'This field is required',
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid format email',
                },
              }}
              errorMessagesVisible={errorMessagesVisible}
              disableErrors={disableErrors}
              errors={errors}
            />

            {/* Autologin component */}
            <div className={style.Form_authorization_item}>
              <AutoLogin register={register} setValue={updateAutoLogin} />
            </div>

            {/* Submit button */}
            <div className={style.Form_authorization_item}>
              <input type="submit" value="Submit" onClick={enableErrors} />
            </div>
          </form>
      }
    </>
  );
}