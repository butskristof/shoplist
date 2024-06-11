import { Checkbox } from '@mantine/core';
import { FC } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const updateItem = (item) =>
  fetch(`http://localhost:3000/items/${item.id}`, {
    method: 'PUT',
    body: JSON.stringify(item),
  }).then((r) => r.json());

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
}

const ShoplistItem: FC<Props> = ({ item }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateItem,
    onSuccess: () => {
      queryClient.invalidateQueries(['lists', item.listId]);
    },
  });
  const handleChange = (event) => {
    const newValue = event.currentTarget.checked;
    mutation.mutate({
      ...item,
      ticked: newValue,
    });
  };
  return (
    <Checkbox
      label={item.name}
      checked={item.ticked}
      onChange={handleChange}
    />
  );
};

export default ShoplistItem;
