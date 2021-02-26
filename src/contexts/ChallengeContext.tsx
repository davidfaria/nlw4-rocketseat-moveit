import React from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

type Challenge = {
  type: 'body' | 'eye';
  description: string;
  amount: number;
};

// TIPAGEM DO CONTEXTO (PASSO 1)
type ChallengesContextData = {
  activeChallenge: Challenge;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  levelUp: () => void;
  closeLevelUpModal: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
};

const ChallengesContext = React.createContext({} as ChallengesContextData);

// TIPAGEM DO PROVIDER PASSO 2 (SIMPLIFICA O WRAPPER GLOBAL NO APP)
type ChallengesProviderProps = {
  children: React.ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
};

const PERMISSION = {
  GRANTED: 'granted'
} as const;

const COOKIES = {
  LEVEL: 'level',
  CURRENT_EXPERIENCE: 'currentExperience',
  CHALLENGES_COMPLETED: 'challengesCompleted'
} as const;

function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
  const [level, setLevel] = React.useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = React.useState(
    rest.currentExperience ?? 0
  );
  const [challengesCompleted, setChallengesCompleted] = React.useState(
    rest.challengesCompleted ?? 0
  );
  const [activeChallenge, setActiveChallenge] = React.useState<Challenge>(null);
  const [isLevelModalOpen, setisLevelModalOpen] = React.useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  React.useEffect(() => {
    Notification.requestPermission();
  }, []);

  React.useEffect(() => {
    Cookies.set(COOKIES.LEVEL, String(level));
    Cookies.set(COOKIES.CURRENT_EXPERIENCE, String(currentExperience));
    Cookies.set(COOKIES.CHALLENGES_COMPLETED, String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setisLevelModalOpen(true);
  }

  function closeLevelUpModal() {
    setisLevelModalOpen(false);
  }

  function startNewChallenge() {
    const randowChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randowChallengeIndex] as Challenge;
    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === PERMISSION.GRANTED) {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}XP`
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        activeChallenge,
        level,
        currentExperience,
        challengesCompleted,
        experienceToNextLevel,
        levelUp,
        closeLevelUpModal,
        startNewChallenge,
        resetChallenge,
        completeChallenge
      }}
    >
      {children}
      {isLevelModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}

// passo 3 SIMṔLIFICAR O USO LIKE HOOK
function useChallenge(): ChallengesContextData {
  const context = React.useContext(ChallengesContext);

  if (!context) {
    throw new Error('useChallenge must be used within an AuChallengesProvider');
  }

  return context;
}

export { ChallengesProvider, useChallenge };
