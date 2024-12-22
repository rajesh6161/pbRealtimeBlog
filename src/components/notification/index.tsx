import React, { useEffect } from 'react';
import { ToastContainer, toast, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface NotificationProps {
  notification: {
    type: 'error' | 'success' | 'promise';
    msg: string;
  };
}

const TOAST_POSITION: ToastPosition = 'top-right';

const Notifier: React.FC<NotificationProps> = ({ notification: { type, msg } }) => {
  const errorToast = () => {
    toast.error(msg || 'Error Notification !', {
      position: TOAST_POSITION,
    });
  };

  const successToast = () => {
    toast.success(msg || 'Success Notification !', {
      position: TOAST_POSITION,
    });
  };

  const promiseToast = () => {
    toast.promise(
      Promise.resolve(msg || 'Promise Notification !'),
      {
        pending: 'Pending...',
        success: 'Success !',
        error: 'Error !'
      }
    );
  };

  useEffect(() => {
    if (type === 'error') {
      errorToast();
    } else if (type === 'success') {
      successToast();
    } else if (type === 'promise') {
      promiseToast();
    }
  }, [type, msg]);

  return <ToastContainer position={TOAST_POSITION} />;
};

export default Notifier;
