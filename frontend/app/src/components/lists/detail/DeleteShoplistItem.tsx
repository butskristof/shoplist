import { FC } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import DeleteModal from '@/components/common/modals/DeleteModal.tsx';
import { useShoplistsApiDeleteItem } from '@/data/shoplists-api.ts';
import { ListItem } from '@/components/lists/detail/Shoplist.tsx';

interface Props {
  item: ListItem;
  listId: string;
  onClose: () => void;
}

const DeleteShoplistItem: FC<Props> = ({ onClose, item, listId }) => {
  const queryClient = useQueryClient();
  const mutation = useShoplistsApiDeleteItem(queryClient);

  const handleDelete = async () => {
    await mutation.mutateAsync({ id: item.id, listId });
    notifications.show({ message: 'List item deleted', color: 'green' });
    onClose();
  };

  return (
    <DeleteModal
      entity="list item"
      onDelete={handleDelete}
      onClose={onClose}
      mutation={mutation}
      confirmText={
        <>
          Delete item <strong>{item.name}</strong>?
        </>
      }
    />
  );
};

export default DeleteShoplistItem;
