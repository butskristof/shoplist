import { cloneElement, FC, ReactElement } from 'react';
import { ActionIcon } from '@mantine/core';

interface Props {
  icon: ReactElement;
}

const ShoplistItemAction: FC<Props> = ({ icon }) => {
  const clonedIcon = cloneElement(icon, { size: 16 });
  return <ActionIcon>{clonedIcon}</ActionIcon>;
};

export default ShoplistItemAction;
