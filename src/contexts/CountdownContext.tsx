import React from 'react';
import { useChallenge } from './ChallengeContext';

type CountdownContextData = {
  minutes: number;
  seconds: number;
  isActive: boolean;
  hasFinish: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
};

const CountdownContext = React.createContext({} as CountdownContextData);

type CountdownProviderProps = {
  children: React.ReactNode;
};

const DEFAULT_INIT_TIME = 25 * 60;
let countdownTimeout: NodeJS.Timeout;
function CountdownProvider({ children }) {
  const { startNewChallenge } = useChallenge();
  const [time, setTime] = React.useState(DEFAULT_INIT_TIME);
  const [isActive, setIsActive] = React.useState(false);
  const [hasFinish, setHasFinish] = React.useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setHasFinish(false);
    setTime(DEFAULT_INIT_TIME);
  }

  React.useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      startNewChallenge();
      setHasFinish(true);
      setIsActive(false);
    }
  }, [isActive, time]);

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        isActive,
        hasFinish,
        startCountdown,
        resetCountdown
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}

function useCountdown(): CountdownContextData {
  const context = React.useContext(CountdownContext);

  if (!context) {
    throw new Error('useCountdown must be used within an CountdownProvider');
  }

  return context;
}

export { CountdownProvider, useCountdown };
