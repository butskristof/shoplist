import { Button } from '@mantine/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput } from 'react-hook-form-mantine';
import { FC } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import classes from './CreateShoplistItem.module.scss';
import { useShoplistApiCreateItem } from '@/data/shoplists-api.ts';
import { ShoplistItem } from '@/types/shoplists-api.types.ts';

const schema = yup.object({
  name: yup.string().trim().required().label('Name'),
});
type EditShoplistItem = yup.InferType<typeof schema>;

interface Props {
  listId: string;
}

const CreateShoplistItem: FC<Props> = ({ listId }) => {
  //#region form

  const { control, handleSubmit } = useForm<EditShoplistItem>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
    },
  });
  const onSubmit: SubmitHandler<EditShoplistItem> = (values: EditShoplistItem) => {
    const payload: ShoplistItem = {
      id: crypto.randomUUID(),
      name: values.name,
      ticked: false,
      listId,
    };
    return mutation.mutate(payload);
  };

  //#endregion

  //#region create
  const queryClient = useQueryClient();
  const mutation = useShoplistApiCreateItem(queryClient);

  const isFormDisabled = mutation.isPending || mutation.isSuccess;
  //#endregion

  return (
    <div className={classes.create}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextInput
            name="name"
            control={control}
            label="Name"
            withAsterisk
            disabled={isFormDisabled}
          />
        </div>
        <Button type="submit">Add</Button>
      </form>
    </div>
  );
};

export default CreateShoplistItem;
