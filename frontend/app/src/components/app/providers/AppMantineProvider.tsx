import { FC } from 'react';
import { CSSVariablesResolver, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { PropsWithChildren } from '@/types/PropsWithChildren.ts';
import '@mantine/notifications/styles.css';

const resolver: CSSVariablesResolver = (theme) => ({
  variables: {},
  light: {
    '--mantine-color-text': theme.colors.gray[8],
  },
  dark: {
    '--mantine-color-text': theme.white,
  },
});

const AppMantineProvider: FC<PropsWithChildren> = ({ children }) => (
  <MantineProvider
    defaultColorScheme="auto"
    cssVariablesResolver={resolver}
  >
    {children}
    <Notifications />
  </MantineProvider>
);

export default AppMantineProvider;
