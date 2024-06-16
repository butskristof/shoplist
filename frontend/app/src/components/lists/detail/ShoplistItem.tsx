import { ChangeEvent, FC } from 'react';
import { ActionIcon, Checkbox, MantineProvider } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useShoplistsApiUpsertItem } from '@/data/shoplists-api.ts';
import AppCard from '@/components/common/AppCard.tsx';
import classes from './ShoplistItem.module.scss';
import { ListItem } from '@/types/shoplists-api/lists/GetList.types.ts';
import { UpdateListItemRequest } from '@/types/shoplists-api/listitems/UpdateListItem.types.ts';

interface Props {
  listId: string;
  item: ListItem;
  onEdit: () => void;
  onDelete: () => void;
}

const ShoplistItem: FC<Props> = ({ listId, item, onEdit, onDelete }) => {
  const queryClient = useQueryClient();
  const mutation = useShoplistsApiUpsertItem(queryClient);
  // TODO optimistic update?

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const payload: UpdateListItemRequest = {
      ...item,
      ticked: event.target.checked,
      listId,
    };
    mutation.mutate(payload);
  };

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
            <ActionIcon
              onClick={onDelete}
              color="red"
            >
              <IconTrash size={16} />
            </ActionIcon>
          </div>
        </div>
      </MantineProvider>
    </AppCard>
  );
};

export default ShoplistItem;
