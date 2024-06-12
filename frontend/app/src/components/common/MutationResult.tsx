import { FC } from 'react';
import { Alert } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import ApiError from '@/components/common/ApiError.tsx';

interface Props {
  successMessage: string;
  errorMessage: string;
  mutation: {
    isSuccess: boolean;
    isError: boolean;
    error: Error;
  };
}

const MutationResult: FC<Props> = ({ successMessage, errorMessage, mutation }) => (
  <div className="result">
    {mutation.isSuccess && (
      <Alert
        styles={{
          root: {
            padding: 'var(--mantine-spacing-xs)',
          },
          icon: {
            marginInlineEnd: '0.25rem',
          },
        }}
        color="green"
        icon={<IconCheck />}
      >
        {successMessage}
      </Alert>
    )}
    {mutation.isError && (
      <ApiError
        error={mutation.error}
        message={`${errorMessage}, please refer to the error information below for more details.`}
      />
    )}
  </div>
);

export default MutationResult;
