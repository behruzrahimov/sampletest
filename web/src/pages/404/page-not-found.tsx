import styles from "./page-not-found.style.module.css";
export default function PageNotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.text404}>404</h1>
      <h3 className={styles.textPageNotFound}>page not found</h3>
    </div>
  );
}