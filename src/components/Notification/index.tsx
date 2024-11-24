import { useEffect, useRef } from 'react';
import SuccessIcon from '@/assets/images/success.svg?react';
import InfoIcon from '@/assets/images/info.svg?react';
import ErrorIcon from '@/assets/images/error.svg?react';
import WarningIcon from '@/assets/images/warning.svg?react';
import CloseIcon from '@/assets/images/close.svg?react';
import { useDispatch, useSelector } from '@/store';
import { closeNotification } from '@/store/slices/ui';

const iconMap = {
  error: ErrorIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  info: InfoIcon,
};

const classes = {
  error: {
    bg: 'bg-notification-error-bg',
    icon: 'text-notification-error-icon',
    label: 'text-notification-error-label',
  },
  success: {
    bg: 'bg-notification-success-bg',
    icon: 'text-notification-success-icon',
    label: 'text-notification-success-label',
  },
  warning: {
    bg: 'bg-notification-warning-bg',
    icon: 'text-notification-warning-icon',
    label: 'text-notification-warning-label',
  },
  info: {
    bg: 'bg-notification-info-bg',
    icon: 'text-notification-info-icon',
    label: 'text-notification-info-label',
  },
};

function Notification() {
  const dispatch = useDispatch();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isOpen = useSelector((state) => state.ui.notification.isOpen);
  const text = useSelector((state) => state.ui.notification.text);
  const type = useSelector((state) => state.ui.notification.type);

  useEffect(() => {
    if (isOpen) {
      timeoutRef.current = setTimeout(() => dispatch(closeNotification()), 5_000);
    }
  }, [dispatch, isOpen]);

  const Icon = type && iconMap[type];

  return (
    <div
      role='alert'
      className={`fixed right-1/2 translate-x-1/2 z-[1000] flex sm:w-[80%] w-[90%] p-3 pr-10 ${type ? classes[type].bg : ''} rounded-md transition-all duration-500 
        ${isOpen ? 'opacity-100 top-4' : 'top-0 opacity-0 pointer-events-none'}`}
    >
      <p className={`flex ${type ? classes[type].icon : ''}`}>
        {Icon && <Icon className='h-5 w-5 shrink-0' />}

        <span className={`ml-2 leading-5 ${type ? classes[type].label : ''}`}>{text}</span>
      </p>

      <button
        onClick={() => dispatch(closeNotification())}
        className={`flex items-center justify-center transition-all w-8 h-8 rounded-md absolute top-1.5 right-1.5 ${type ? classes[type].icon : ''}`}
        type='button'
      >
        <CloseIcon className='h-5 w-5' />
      </button>
    </div>
  );
}

export default Notification;
