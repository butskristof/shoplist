import clsx from 'clsx';
import { useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { IconBrandGithub, IconLogout, IconMoon, IconSettings, IconSun } from '@tabler/icons-react';
import { FC } from 'react';
import { PropsWithClassName } from '@/types/PropsWithClassName.ts';
import classes from './AppFooter.module.scss';
import AppFooterAction from '@/components/app/layout/AppFooterAction.tsx';
import { useAuth } from '@/utilities/auth.ts';

const AppFooter: FC<PropsWithClassName> = ({ className }) => {
  const footerClassName = clsx(className, classes.footer);

  const { toggleColorScheme } = useMantineColorScheme();
  const colorScheme = useComputedColorScheme(); // does not return auto
  const { isAuthenticated } = useAuth();

  return (
    <footer className={footerClassName}>
      <div className={classes.actions}>
        <AppFooterAction
          icon={colorScheme === 'dark' ? <IconSun /> : <IconMoon />}
          label="Toggle colour scheme"
          onClick={toggleColorScheme}
        />

        <AppFooterAction
          icon={<IconBrandGithub />}
          label="GitHub"
          component="a"
          href="https://github.com/butskristof/shoplists"
          target="_blank"
        />

        <AppFooterAction
          icon={<IconSettings />}
          label="Settings"
        />

        {isAuthenticated && (
          <AppFooterAction
            icon={<IconLogout />}
            label="Sign out"
            component="a"
            href="/bff/logout"
          />
        )}
      </div>
    </footer>
  );
};

export default AppFooter;
