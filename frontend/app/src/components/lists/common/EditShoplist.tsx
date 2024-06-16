import { FC } from 'react';
import * as yup from 'yup';
import { useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { TextInput } from 'react-hook-form-mantine';
import EditModal from '@/components/common/modals/EditModal.tsx';
import { useShoplistsApiUpsertList } from '@/data/shoplists-api.ts';
import MutationResult from '@/components/common/MutationResult.tsx';
import IconButton from '@/components/common/IconButton.tsx';
import { CreateListRequest } from '@/types/shoplists-api/lists/CreateList.types.ts';
import { UpdateListRequest } from '@/types/shoplists-api/lists/UpdateList.types.ts';

const schema = yup.object({
  name: yup.string().trim().required().label('Name'),
});
type FormSchemaType = yup.InferType<typeof schema>;

interface List {
  id: string;
  name: string;
}

interface Props {
  onClose: () => void;
  list?: List;
}

const EditShoplist: FC<Props> = ({ onClose, list }) => {
  const isEdit = list != null;

  //#region mutation

  const queryClient = useQueryClient();
  const mutation = useShoplistsApiUpsertList(queryClient);

  //#endregion

  //#region form

  const {
    control,
    handleSubmit,
    formState: { isDirty: isFormDirty },
  } = useForm<FormSchemaType>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: list?.name ?? '',
    },
  });
  const isFormDisabled = mutation.isPending || mutation.isSuccess;

  const saveList: SubmitHandler<FormSchemaType> = (values: FormSchemaType) => {
    const payload: CreateListRequest | UpdateListRequest = {
      name: values.name,
    };
    return mutation.mutate({ payload, id: list?.id });
  };

  //#endregion

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
      title={`${isEdit ? 'Edit' : 'Add new'} list`}
    >
      <form
        className="form"
        onSubmit={handleSubmit(saveList)}
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
            successMessage="List saved"
            errorMessage="Saving the list failed"
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

export default EditShoplist;
