import React, { useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notifier = ({ notification: { type, msg } }) => {
  const errorToast = () => {
    toast.error('Error Notification !', {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const successToast = () => {
    toast.success('Success Notification !', {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const promiseToast = () => {
    toast.promise('Promise Notification !', {
      pending: 'Pending...',
      success: 'Success !',
      error: 'Error !',

      position: toast.POSITION.TOP_RIGHT,
    });
  };
  useEffect(() => {
    if (type === 'error') {
      errorToast();
    } else if (type === 'success') {
      successToast();
    } else if (type === 'promise') {
      promiseToast();
    }
  }, [type]);
  return <ToastContainer />;
};

export default Notifier;
