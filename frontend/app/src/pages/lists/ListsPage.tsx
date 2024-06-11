import { Link } from 'react-router-dom';
import { useShoplistsApiLists } from '@/hooks/api/shoplists-api.ts';

const ListsPage = () => {
  const { data: lists = [] } = useShoplistsApiLists();

  return (
    <div>
      <h1>Lists</h1>
      <ul>
        {lists.map((l) => (
          <li key={l.id}>
            <Link to={`/lists/${l.id}`}>{l.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ListsPage;
