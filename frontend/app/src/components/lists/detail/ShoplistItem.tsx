import { FC } from 'react';
import { Checkbox } from '@mantine/core';
import { ShoplistItem as ShoplistItemType } from '@/types/shoplists-api.types.ts';
import PaperContentBox from '@/components/common/PaperContentBox.tsx';

interface Props {
  item: ShoplistItemType;
}

const ShoplistItem: FC<Props> = ({ item }) => {
  const handleChange = () => console.log('do mutation');
  return (
    <PaperContentBox>
      <Checkbox
        label={item.name}
        checked={item.ticked}
        onChange={handleChange}
      />
    </PaperContentBox>
  );
};

export default ShoplistItem;
