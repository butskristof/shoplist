import { FC } from 'react';
import { ElementProps, Paper, PaperProps } from '@mantine/core';

interface Props extends PaperProps, ElementProps<'div', keyof PaperProps> {}

const PaperContentBox: FC<Props> = (props) => (
  <Paper
    withBorder
    radius="md"
    {...props}
    styles={{
      root: {
        padding: 'var(--default-padding)',
      },
    }}
  >
    {props.children}
  </Paper>
);

export default PaperContentBox;
