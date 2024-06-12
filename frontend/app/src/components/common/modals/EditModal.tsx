import { FC } from 'react';
import { Modal, ModalProps } from '@mantine/core';

// TODO default maximizable, width, ...

const EditModal: FC<Omit<ModalProps, 'opened'>> = (props) => (
  <Modal
    opened
    {...props}
  />
);

export default EditModal;
