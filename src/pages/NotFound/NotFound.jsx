import { Link } from "react-router-dom";
import s from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={s.container}>
      <p className={s.error}>Not found</p>
      <Link to="/" className={s.backButton}>
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
