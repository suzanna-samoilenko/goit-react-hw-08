import { useDispatch, useSelector } from "react-redux";
import styles from "./SearchBox.module.css";
import { changeFilter } from "/src/redux/filters/slice.js";
import { selectFilter } from "/src/redux/filters/selectors.js";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={styles.searchBox}>
      <label className={styles.searchBoxLabel}>
        Find contacts by name
        <input
          type="text"
          value={filter}
          onChange={handleChange}
          className={styles.inputSearchBox}
        />
      </label>
    </div>
  );
};

export default SearchBox;
