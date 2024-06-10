import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const getLists = () => fetch('http://localhost:3000/lists').then((r) => r.json());

const ListsOverview = () => {
  const { data: lists = [] } = useQuery({
    queryKey: ['lists'],
    queryFn: getLists,
  });

  return (
    <div>
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
export default ListsOverview;
