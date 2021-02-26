import React from 'react';
import { useCountdown } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  const {
    minutes,
    seconds,
    isActive,
    hasFinish,
    startCountdown,
    resetCountdown
  } = useCountdown();

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  return (
    <>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinish ? (
        <button disabled type='button' className={styles.countdownButton}>
          Ciclo encerrado
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type='button'
              onClick={resetCountdown}
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button
              type='button'
              onClick={startCountdown}
              className={styles.countdownButton}
            >
              Iniciar um ciclo
            </button>
          )}
        </>
      )}
    </>
  );
}
