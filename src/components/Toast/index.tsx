import styles from './styles.module.scss';

interface Toast {
  message: string;
  type: string;
  isLeaving: boolean;
}

export function Toast({ message, type, isLeaving }: Toast) {
  return (
    <div 
    
      className={`
        ${styles.toast_container}
        ${type === 'error'
          ? styles.error
          : styles.success}
        ${isLeaving
          ? styles.leave_animation
          : styles.enter_animation}
      `}
    >
      {message}
    </div>
  )
}