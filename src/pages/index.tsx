import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ChallengeBox } from '../components/ChallengeBox';
import { CompleteChallenges } from '../components/CompleteChallenge';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChallengesProvider } from '../contexts/ChallengeContext';
import { CountdownProvider } from '../contexts/CountdownContext';

import styles from '../styles/pages/Home.module.css';

type IndexProps = {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
};

export default function Index({
  level,
  currentExperience,
  challengesCompleted
}: IndexProps) {
  return (
    <ChallengesProvider
      level={level}
      currentExperience={currentExperience}
      challengesCompleted={challengesCompleted}
    >
      <Head>
        <title>Início | focus.it</title>
      </Head>

      <div className={styles.container}>
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompleteChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  };
};
