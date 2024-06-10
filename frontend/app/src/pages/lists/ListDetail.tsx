import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import Shoplist from '../../components/shoplist/Shoplist.tsx';

const getList = (id) =>
  fetch(`http://localhost:3000/lists/${id}?_embed=items`).then((r) => r.json());

const ListDetail = () => {
  const { id } = useParams();
  const { data: list = null } = useQuery({
    queryKey: ['lists', id],
    queryFn: () => getList(id),
  });

  return (
    <div>
      <div>
        <Link to="/lists">Back to overview</Link>
      </div>
      {list && (
        <Shoplist
          name={list.name}
          items={list.items}
        />
      )}
    </div>
  );
};
export default ListDetail;
