import { useDisclosure } from '@mantine/hooks';
import { FC, ReactNode } from 'react';
import { AppShell, Burger, Group, UnstyledButton } from '@mantine/core';
import classes from './AppLayout.module.css';

interface Props {
  children: ReactNode;
}

const AppLayout: FC<Props> = ({ children }) => {
  const [opened, { toggle }] = useDisclosure(); // mobile menu open

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group
          h="100%"
          px="md"
        >
          <Group
            justify="space-between"
            style={{ flex: 1 }}
          >
            <div>Shoplist</div>
            <Group
              ml="xl"
              gap={0}
              visibleFrom="sm"
            >
              <UnstyledButton className={classes.control}>Home</UnstyledButton>
              <UnstyledButton className={classes.control}>Blog</UnstyledButton>
              <UnstyledButton className={classes.control}>Contacts</UnstyledButton>
              <UnstyledButton className={classes.control}>Support</UnstyledButton>
            </Group>
          </Group>
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
          />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar
        py="md"
        px={4}
      >
        <UnstyledButton className={classes.control}>Home</UnstyledButton>
        <UnstyledButton className={classes.control}>Blog</UnstyledButton>
        <UnstyledButton className={classes.control}>Contacts</UnstyledButton>
        <UnstyledButton className={classes.control}>Support</UnstyledButton>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default AppLayout;
