import { isAxiosError } from 'axios';

const MAX_RETRIES = 6;
const HTTP_STATUS_TO_NOT_RETRY = [400, 401, 403, 404];

export const retryIfNotClientError = (failureCount: number, error: unknown) => {
  if (failureCount > MAX_RETRIES) {
    return false;
  }

  if (isAxiosError(error) && HTTP_STATUS_TO_NOT_RETRY.includes(error.response?.status ?? 0)) {
    // console.log(`Aborting retry due to ${error.response?.status} status`);
    return false;
  }

  return true;
};
