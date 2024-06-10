import { Link } from 'react-router-dom';

const LISTS = ['Groceries'];
const ListsOverview = () => (
  <ul>
    {LISTS.map((l) => (
      <li key={l}>
        <Link to={`/lists/${l}`}>{l}</Link>
      </li>
    ))}
  </ul>
);
export default ListsOverview;
