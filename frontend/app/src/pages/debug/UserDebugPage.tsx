import { IconClipboard } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useAuth } from '@/utilities/auth.ts';
import { useBffDiagnostics } from '@/data/bff.ts';
import IconButton from '@/components/common/IconButton.tsx';

const UserDebugPage = () => {
  const auth = useAuth();
  const diagnosticsQuery = useBffDiagnostics();

  const copyAccessTokenToClipboard = async () => {
    const accessToken = diagnosticsQuery.data?.UserAccessToken;
    if (accessToken) {
      await navigator.clipboard.writeText(accessToken);
      notifications.show({ message: 'Access token copied to clipboard', color: 'green' });
    }
  };

  return (
    <div>
      <div>
        <h2>User</h2>
        <pre>{JSON.stringify(auth.user, null, 2)}</pre>
      </div>
      <div>
        <h2>Diagnostics</h2>
        <pre>{JSON.stringify(diagnosticsQuery.data, null, 2)}</pre>
        <div>
          <IconButton
            icon={<IconClipboard />}
            onClick={copyAccessTokenToClipboard}
          >
            Copy access token to clipboard
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default UserDebugPage;
