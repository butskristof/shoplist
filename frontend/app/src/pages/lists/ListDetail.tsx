import { Link, useParams } from 'react-router-dom';
import Shoplist from '../../components/shoplist/Shoplist.tsx';
import { useShoplistsApiList } from '../../hooks/api/shoplists-api.ts';

const ListDetail = () => {
  const { id } = useParams();
  const { data: list = null } = useShoplistsApiList(id);

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
