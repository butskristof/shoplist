import { FC, ReactNode, useState } from 'react';
import { Button, Tabs } from '@mantine/core';
import axios, { AxiosError } from 'axios';
import clsx from 'clsx';
import NotFound from '@/components/common/NotFound.tsx';
import classes from './ApiError.module.scss';

interface Props {
  error: unknown;
  message?: string;
  entity?: string;
  actions?: ReactNode;
  page?: boolean;
}

const ApiError: FC<Props> = ({ error, message, entity, actions, page = false }) => {
  const [showDetails, setShowDetails] = useState(false);
  const toggleShowDetails = () => setShowDetails(!showDetails);

  const isAxiosError = axios.isAxiosError(error);
  const isNotFound = isAxiosError && error.response?.status === 404;

  if (isNotFound)
    return (
      <NotFound
        entity={entity}
        actions={actions}
      />
    );

  const wrapperClassName = clsx(classes.ApiError, page && 'full-page-info');
  return (
    <div className={wrapperClassName}>
      <div className={classes.message}>
        {message || 'Something went wrong while executing your request.'}
      </div>
      <div>
        <Button onClick={toggleShowDetails}>{showDetails ? 'Hide' : 'Show'} error details</Button>
      </div>
      {showDetails && (
        <Tabs
          defaultValue="API_RESPONSE"
          className={classes.details}
        >
          <Tabs.List justify={page ? 'center' : 'left'}>
            <Tabs.Tab value="API_RESPONSE">API response</Tabs.Tab>
            <Tabs.Tab value="ERROR">Error</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="API_RESPONSE">
            <pre>{JSON.stringify((error as AxiosError)?.response?.data, null, 2)}</pre>
          </Tabs.Panel>

          <Tabs.Panel value="ERROR">
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </Tabs.Panel>
        </Tabs>
      )}
    </div>
  );
};

export default ApiError;
