import { Button, ButtonProps, createPolymorphicComponent, px } from '@mantine/core';
import { cloneElement, forwardRef, ReactElement } from 'react';

// https://mantine.dev/guides/polymorphic/#wrapping-polymorphic-components
// we use Mantine's utility function to create a polymorphic wrapper around
// their Button component
// this way, the IconButton will have all features of a normal Button, but will always
// have an icon on the left

interface Props extends ButtonProps {
  icon: ReactElement;
}

const IconButton = createPolymorphicComponent<'button', Props>(
  forwardRef<HTMLButtonElement, Props>(({ icon, ...props }, ref) => {
    const clonedIcon = cloneElement(icon, { size: px('1rem') });

    return (
      <Button
        leftSection={clonedIcon}
        {...props}
        ref={ref}
      />
    );
  }),
);

export default IconButton;
