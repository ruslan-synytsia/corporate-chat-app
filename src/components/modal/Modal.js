import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import style from './Modal.module.css';
import { setMessage, setStatusCode } from "./../../redux-store/authSlice";

export const Modal = ({ isOpen, children }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setModalVisible(isOpen)
  }, [isOpen]);

  const closeModal = () => {
    setModalVisible(false);
    dispatch(setStatusCode(null));
    dispatch(setMessage(null));
  };

  return (
    modalVisible && (
      <div className={style.modal_overlay}>
        <div className={style.modal_content}>
          {children}
          <button className={style.modal_ok} onClick={closeModal}>OK</button>
        </div>
      </div>
    )
  );
};