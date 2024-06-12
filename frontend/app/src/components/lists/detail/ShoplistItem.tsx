import { ChangeEvent, FC } from 'react';
import { ActionIcon, Checkbox, MantineProvider } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { ShoplistItem as ShoplistItemModel } from '@/types/shoplists-api.types.ts';
import { useShoplistsApiUpsertItem } from '@/data/shoplists-api.ts';
import AppCard from '@/components/common/AppCard.tsx';
import classes from './ShoplistItem.module.scss';

interface Props {
  item: ShoplistItemModel;
  onEdit: () => void;
  onDelete: () => void;
}

const ShoplistItem: FC<Props> = ({ item, onEdit, onDelete }) => {
  const queryClient = useQueryClient();
  const mutation = useShoplistsApiUpsertItem(queryClient);
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
            <ActionIcon onClick={onEdit}>
              <IconEdit size={16} />
            </ActionIcon>
            <ActionIcon onClick={onDelete}>
              <IconTrash size={16} />
            </ActionIcon>
          </div>
        </div>
      </MantineProvider>
    </AppCard>
  );
};

export default ShoplistItem;
