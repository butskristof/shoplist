import { Button } from '@mantine/core';
import { IoAdd } from 'react-icons/io5';
import LeftRightHeader from '@/components/common/LeftRightHeader.tsx';
import classes from './ListsPage.module.scss';

const ListsPage = () => (
  <div>
    <LeftRightHeader
      left={<h1>Lists</h1>}
      right={
        <div className={classes['header-actions']}>
          <Button leftSection={<IoAdd size={20} />}>Add new list</Button>
        </div>
      }
    />
  </div>
);
export default ListsPage;
