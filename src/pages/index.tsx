import Head from 'next/head';
import styles from '../styles/Home.module.css';
import StatusApp from '../components/statusApp';

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dev Dashboard</title>
        <link rel="icon" href="/speed.png" />
      </Head>

      <header className={styles.header}>
        <h1 className={styles.title}>
          Welcome to the developer dashboard
        </h1>
      </header>

      <main className={styles.main}>
        <StatusApp />
      </main>

      <footer className={styles.footer}>
        <p>
          qnouqr ©
        </p>
      </footer>
    </div>
  )
}

export default Home;
