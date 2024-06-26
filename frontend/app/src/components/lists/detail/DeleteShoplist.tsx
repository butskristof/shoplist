import { FC } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { useShoplistsApiDeleteList } from '@/data/shoplists-api.ts';
import DeleteModal from '@/components/common/modals/DeleteModal.tsx';

interface List {
  id: string;
  name: string;
}

interface Props {
  list: List;
  onClose: (deleted: boolean) => void;
}

const DeleteShoplist: FC<Props> = ({ list, onClose }) => {
  const queryClient = useQueryClient();
  const mutation = useShoplistsApiDeleteList(queryClient);

  const handleDelete = async () => {
    await mutation.mutateAsync(list.id);
    notifications.show({ message: 'List deleted', color: 'green' });
    onClose(true);
  };

  return (
    <DeleteModal
      entity="list"
      onDelete={handleDelete}
      onClose={() => onClose(false)}
      mutation={mutation}
      confirmText={
        <>
          Delete list <strong>{list.name}</strong>?
        </>
      }
    />
  );
};

export default DeleteShoplist;
