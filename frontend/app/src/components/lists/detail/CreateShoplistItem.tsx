import { Alert, Button, Modal } from '@mantine/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput } from 'react-hook-form-mantine';
import { FC } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { LuSave } from 'react-icons/lu';
import { IoCheckmark } from 'react-icons/io5';
import classes from './CreateShoplistItem.module.scss';
import { useShoplistApiCreateItem } from '@/data/shoplists-api.ts';
import { ShoplistItem } from '@/types/shoplists-api.types.ts';
import ApiError from '@/components/common/ApiError.tsx';

const schema = yup.object({
  name: yup.string().trim().required().label('Name'),
});
type EditShoplistItem = yup.InferType<typeof schema>;

interface Props {
  listId: string;
  onClose: () => void;
}

const CreateShoplistItem: FC<Props> = ({ listId, onClose }) => {
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
    <Modal
      opened
      onClose={onClose}
      title="Add new list item"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={clsx('form', classes.create)}
      >
        <div className="field">
          <TextInput
            data-autofocus
            name="name"
            control={control}
            label="Name"
            withAsterisk
            disabled={isFormDisabled}
          />
        </div>

        <div className="footer">
          <div className="result">
            {mutation.isSuccess && (
              <Alert
                styles={{
                  root: {
                    padding: 'var(--mantine-spacing-xs)',
                  },
                  icon: {
                    marginInlineEnd: '0.25rem',
                  },
                }}
                color="green"
                icon={<IoCheckmark />}
              >
                List item saved
              </Alert>
            )}
            {mutation.isError && (
              <ApiError
                error={mutation.error}
                message="Saving the list item failed, please refer to the error information below for more details."
              />
            )}
          </div>
          <div className="actions">
            <Button
              type="submit"
              leftSection={<LuSave />}
              disabled={isFormDisabled}
              loading={mutation.isPending}
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CreateShoplistItem;
