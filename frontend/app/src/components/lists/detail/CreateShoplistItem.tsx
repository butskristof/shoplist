import { Button } from '@mantine/core';
import { FormEvent } from 'react';
import classes from './CreateShoplistItem.module.scss';

interface CreateShoplistItem {
  name: string;
}

const CreateShoplistItem = () => {
  const submit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className={classes.create}>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
          />
        </div>
        <Button type="submit">Add</Button>
      </form>
    </div>
  );
};

export default CreateShoplistItem;
