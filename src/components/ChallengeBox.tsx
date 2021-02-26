import { useChallenge } from '../contexts/ChallengeContext';
import { useCountdown } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } = useChallenge();
  const { resetCountdown } = useCountdown();

  function handleChallengeSuccess() {
    completeChallenge();
    resetCountdown();
  }

  function handleChallengeFail() {
    resetChallenge();
    resetCountdown();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>
          <main>
            <img
              src={`icons/${activeChallenge.type}.svg`}
              alt='Type Challenge'
            />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button
              onClick={handleChallengeFail}
              type='button'
              className={styles.challengeFail}
            >
              Falhei
            </button>
            <button
              onClick={handleChallengeSuccess}
              type='button'
              className={styles.challengeSuccess}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize o ciclo para receber um desafio</strong>
          <p>
            <img src='icons/level-up.svg' alt='Level Up' />
            Avance de level completando desafios
          </p>
        </div>
      )}
    </div>
  );
}
