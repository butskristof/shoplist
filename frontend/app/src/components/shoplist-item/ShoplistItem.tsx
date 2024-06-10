import { Checkbox } from '@mantine/core';
import { FC } from 'react';

interface Props {
  name: string;
}

const ShoplistItem: FC<Props> = ({ name }) => <Checkbox label={name} />;

export default ShoplistItem;
