import React from 'react';
import { SocketProvider } from '../../context/SocketProvider';

export const withSocket = (Component) => {
  return (props) => (
    <SocketProvider>
      <Component {...props} />
    </SocketProvider>
  );
};