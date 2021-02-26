import { useChallenge } from '../contexts/ChallengeContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useChallenge();
  return (
    <div className={styles.profileContainer}>
      <img src='https://github.com/davidfaria.png' alt='David Faria' />
      <div>
        <strong>David Faria</strong>
        <p>
          <img src='icons/level.svg' alt='Level' loading='lazy' />
          Level {level}
        </p>
      </div>
    </div>
  );
}
