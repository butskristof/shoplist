import Shoplist from '../../components/shoplist/Shoplist.tsx';

const LIST = {
  name: 'Groceries',
  items: ['Pesto', 'Penne'],
};

const ListDetail = () => (
  <div className="counter">
    <Shoplist
      name={LIST.name}
      items={LIST.items}
    />
  </div>
);
export default ListDetail;
