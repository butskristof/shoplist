import { Link, To } from 'react-router-dom';
import { FC } from 'react';
import { IconArrowLeft } from '@tabler/icons-react';
import classes from './DetailPageHeader.module.scss';
import IconButton from '@/components/common/IconButton.tsx';

interface Props {
  backTo: To;
}
const DetailPageHeader: FC<Props> = ({ backTo }) => (
  <div className={classes.header}>
    <IconButton
      component={Link}
      to={backTo}
      icon={<IconArrowLeft />}
      variant="light"
    >
      Back to overview
    </IconButton>
  </div>
);

export default DetailPageHeader;
