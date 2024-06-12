// https://mantine.dev/guides/polymorphic/#wrapping-polymorphic-components
// we use Mantine's utility function to create a polymorphic wrapper around
// their Button component

import {
  ActionIcon,
  ActionIconProps,
  createPolymorphicComponent,
  px,
  Tooltip,
} from '@mantine/core';
import { cloneElement, forwardRef, ReactElement } from 'react';

interface Props extends ActionIconProps {
  icon: ReactElement;
  label: string;
}

const AppFooterAction = createPolymorphicComponent<'button', Props>(
  forwardRef<HTMLButtonElement, Props>(({ icon, label, ...props }, ref) => {
    const clonedIcon = cloneElement(icon, { size: px('1.2rem') });
    return (
      <Tooltip
        label={label}
        withArrow
        arrowSize={8}
      >
        <ActionIcon
          size="lg"
          color="gray"
          variant="subtle"
          {...props}
          ref={ref}
        >
          {clonedIcon}
        </ActionIcon>
      </Tooltip>
    );
  }),
);

export default AppFooterAction;
