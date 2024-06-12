import { ChangeEvent, FC } from 'react';
import { Checkbox, MantineProvider } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { ShoplistItem as ShoplistItemModel } from '@/types/shoplists-api.types.ts';
import { useShoplistsApiUpdateItem } from '@/data/shoplists-api.ts';
import AppCard from '@/components/common/AppCard.tsx';
import ShoplistItemAction from '@/components/lists/detail/ShoplistItemAction.tsx';
import classes from './ShoplistItem.module.scss';

interface Props {
  item: ShoplistItemModel;
}

const ShoplistItem: FC<Props> = ({ item }) => {
  const queryClient = useQueryClient();
  const mutation = useShoplistsApiUpdateItem(queryClient);
  // TODO optimistic update?

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    mutation.mutate({
      ...item,
      ticked: event.target.checked,
    });

  return (
    <AppCard>
      <MantineProvider theme={{ cursorType: 'pointer' }}>
        <div className={classes.item}>
          <Checkbox
            size="md"
            label={item.name}
            checked={item.ticked}
            onChange={handleChange}
          />
          <div className={classes.actions}>
            <ShoplistItemAction icon={<IconEdit />} />
            <ShoplistItemAction icon={<IconTrash />} />
          </div>
        </div>
      </MantineProvider>
    </AppCard>
  );
};

export default ShoplistItem;
