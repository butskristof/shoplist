import { FC, ReactNode } from 'react';
import { Modal } from '@mantine/core';
import { IconTrash, IconX } from '@tabler/icons-react';
import IconButton from '@/components/common/IconButton.tsx';
import MutationResult from '@/components/common/MutationResult.tsx';
import { capitalize } from '@/utilities/string.ts';
import classes from './DeleteModal.module.scss';

export interface Props {
  entity: string;
  mutation: {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: Error | null;
  };
  confirmText: ReactNode;
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
            icon={<IconX />}
            variant="light"
            disabled={mutation.isPending}
            onClick={onClose}
          >
            No, keep {entity.toLowerCase()}
          </IconButton>
          <IconButton
            color="red"
            icon={<IconTrash />}
            loading={mutation.isPending}
            onClick={onDelete}
          >
            {mutation.isPending ? 'Deleting...' : 'Yes, delete'}
          </IconButton>
        </div>
      </>
    )}
  </Modal>
);

export default DeleteModal;
