import { FC } from 'react';
import { Modal } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import IconButton from '@/components/common/IconButton.tsx';
import MutationResult from '@/components/common/MutationResult.tsx';
import { capitalize } from '@/utilities/string.ts';
import classes from './DeleteModal.module.scss';

export interface Props {
  entity: string;
  mutation: {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: Error;
  };
  confirmText: string;
  onDelete: () => void;
  onClose: () => void;
}
const DeleteModal: FC<Props> = ({ entity, onClose, onDelete, confirmText, mutation }) => (
  <Modal
    classNames={{
      content: classes.modal,
    }}
    opened
    onClose={onClose}
    withCloseButton={mutation.isError}
  >
    {mutation.isError || mutation.isSuccess ? (
      <MutationResult
        successMessage={`${capitalize(entity)} deleted`}
        errorMessage={`Deleting the ${entity.toLowerCase()} failed`}
        mutation={mutation}
      />
    ) : (
      <>
        <div className={classes.confirmText}>{confirmText}</div>
        <div className={classes.actions}>
          <IconButton
            icon={<IconTrash />}
            disabled={mutation.isLoading}
            onClick={onClose}
          >
            No, keep {entity.toLowerCase()}
          </IconButton>
          <IconButton
            icon={<IconTrash />}
            loading={mutation.isLoading}
            onClick={onDelete}
          >
            {mutation.isLoading ? 'Deleting...' : 'Yes, delete'}
          </IconButton>
        </div>
      </>
    )}
  </Modal>
);

export default DeleteModal;
