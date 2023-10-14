import styles from "./homepage.module.css";

export const metadata = {
  title: "Page not found",
  description: "No page was found at this URL",
};

async function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Not found!</h1>
    </div>
  );
}

export default NotFound;
