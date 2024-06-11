import { FC } from 'react';
import clsx from 'clsx';
import { ActionIcon, Tooltip, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import {
  IoExitOutline,
  IoLogoGithub,
  IoMoonOutline,
  IoSettingsOutline,
  IoSunnyOutline,
} from 'react-icons/io5';
import { PropsWithClassName } from '@/types/PropsWithClassName.ts';
import classes from './AppFooter.module.scss';

const AppFooter: FC<PropsWithClassName> = ({ className }) => {
  const footerClassName = clsx(className, classes.footer);
  const { toggleColorScheme } = useMantineColorScheme();
  const colorScheme = useComputedColorScheme(); // does not return auto

  return (
    <footer className={footerClassName}>
      <div className={classes.actions}>
        <Tooltip
          label="Toggle colour scheme"
          withArrow
          arrowSize={8}
        >
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            onClick={toggleColorScheme}
          >
            {colorScheme === 'dark' ? (
              <IoSunnyOutline size="1.2rem" />
            ) : (
              <IoMoonOutline size="1.2rem" />
            )}
          </ActionIcon>
        </Tooltip>
        <Tooltip
          label="GitHub"
          withArrow
          arrowSize={8}
        >
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            component="a"
            href="https://gitub.com/butskristof/shoplist"
            target="_blank"
          >
            <IoLogoGithub size="1.2rem" />
          </ActionIcon>
        </Tooltip>
        <Tooltip
          label="Settings"
          withArrow
          arrowSize={8}
        >
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
          >
            <IoSettingsOutline size="1.2rem" />
          </ActionIcon>
        </Tooltip>
        <Tooltip
          label="Sign out"
          withArrow
          arrowSize={8}
        >
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
          >
            <IoExitOutline size="1.2rem" />
          </ActionIcon>
        </Tooltip>
      </div>
    </footer>
  );
};

export default AppFooter;
