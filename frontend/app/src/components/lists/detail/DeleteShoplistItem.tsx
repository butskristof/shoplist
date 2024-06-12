import { FC } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import DeleteModal from '@/components/common/modals/DeleteModal.tsx';
import { ShoplistItem } from '@/types/shoplists-api.types.ts';
import { useShoplistsApiDeleteItem } from '@/data/shoplists-api.ts';

interface Props {
  item: ShoplistItem;
  onClose: () => void;
}

const DeleteShoplistItem: FC<Props> = ({ onClose, item }) => {
  const queryClient = useQueryClient();
  const mutation = useShoplistsApiDeleteItem(queryClient);

  const handleDelete = async () => {
    await mutation.mutateAsync(item.id);
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
