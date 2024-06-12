// https://mantine.dev/guides/polymorphic/#wrapping-polymorphic-components
// we use Mantine's utility function to create a polymorphic wrapper around
// their Paper component

import { createPolymorphicComponent, Paper, PaperProps } from '@mantine/core';
import { forwardRef } from 'react';

interface Props extends PaperProps {}

const AppCard = createPolymorphicComponent<'div', Props>(
  forwardRef<HTMLDivElement, Props>(({ styles, ...props }, ref) => (
    <Paper
      withBorder
      radius="md"
      styles={{
        root: {
          padding: 'var(--mantine-spacing-md)',
        },
        ...styles,
      }}
      {...props}
      ref={ref}
    />
  )),
);

export default AppCard;
