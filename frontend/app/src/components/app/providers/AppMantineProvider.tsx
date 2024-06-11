import { FC } from 'react';
import { CSSVariablesResolver, MantineProvider } from '@mantine/core';
import { PropsWithChildren } from '@/types/PropsWithChildren.ts';

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
  </MantineProvider>
);

export default AppMantineProvider;
