import { FC } from 'react';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { TextInput } from 'react-hook-form-mantine';
import { useShoplistsApiUpsertItem } from '@/data/shoplists-api.ts';
import IconButton from '@/components/common/IconButton.tsx';
import MutationResult from '@/components/common/MutationResult.tsx';
import EditModal from '@/components/common/modals/EditModal.tsx';
import { ListItem } from '@/components/lists/detail/Shoplist.tsx';

const schema = yup.object({
  name: yup.string().trim().required().label('Name'),
});
type FormSchemaType = yup.InferType<typeof schema>;

interface Props {
  listId: string;
  onClose: () => void;
  shoplistItem?: ListItem;
}

const EditShoplistItem: FC<Props> = ({ listId, onClose, shoplistItem }) => {
  const isEdit = shoplistItem != null;

  //#region mutation

  const queryClient = useQueryClient();
  const mutation = useShoplistsApiUpsertItem(queryClient);

  //#endregion

  //#region form

  const {
    control,
    handleSubmit,
    formState: { isDirty: isFormDirty },
  } = useForm<FormSchemaType>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: shoplistItem?.name ?? '',
    },
  });
  const isFormDisabled = mutation.isPending || mutation.isSuccess;

  const saveItem: SubmitHandler<FormSchemaType> = (values: FormSchemaType) =>
    mutation.mutate({
      id: isEdit ? shoplistItem?.id : undefined,
      listId,
      payload: {
        name: values.name,
        ticked: isEdit ? shoplistItem?.ticked : undefined,
      },
    });

  //#endregion

  // TODO move to hook?
  const tryClose = (force = false) => {
    let close = true;
    if (!force && isFormDirty && !mutation.isSuccess) {
      close = window.confirm(
        'There may be unsaved changes, are you sure you want to stop editing?',
      );
    }
    if (close) onClose();
  };

  return (
    <EditModal
      onClose={tryClose}
      title={`${isEdit ? 'Edit' : 'Add new'} list item`}
    >
      <form
        className="form"
        onSubmit={handleSubmit(saveItem)}
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
          <MutationResult
            mutation={mutation}
            successMessage="List item saved"
            errorMessage="Saving the list item failed"
          />
          <div className="actions">
            <IconButton
              icon={<IconDeviceFloppy />}
              type="submit"
              disabled={isFormDisabled}
              loading={mutation.isPending}
            >
              Save
            </IconButton>
          </div>
        </div>
      </form>
    </EditModal>
  );
};

export default EditShoplistItem;
