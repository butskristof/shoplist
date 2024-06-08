import { FC } from 'react';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IoLogoGithub } from 'react-icons/io';
import { PiMoon, PiSun } from 'react-icons/pi';
import classes from './AppFooter.module.scss';

interface Props {
  className: string;
}

const AppFooter: FC<Props> = ({ className }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <footer className={`${className} ${classes.footer}`}>
      <ActionIcon
        size="lg"
        color="gray"
        variant="subtle"
        aria-label="Toggle colour scheme"
        onClick={toggleColorScheme}
      >
        {colorScheme === 'dark' ? <PiSun size={18} /> : <PiMoon size={18} />}
      </ActionIcon>
      <ActionIcon
        component="a"
        href="https://github.com/butskristof/shoplist"
        target="_blank"
        size="lg"
        color="gray"
        variant="subtle"
        aria-label="GitHub"
      >
        <IoLogoGithub size={18} />
      </ActionIcon>
    </footer>
  );
};

export default AppFooter;
