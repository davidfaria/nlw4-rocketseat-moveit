import { useChallenge } from '../contexts/ChallengeContext';
import styles from '../styles/components/CompleteChallenge.module.css';

export function CompleteChallenges() {
  const { challengesCompleted } = useChallenge();
  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  );
}
