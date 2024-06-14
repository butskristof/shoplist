import { useAuth } from '@/utilities/auth.ts';
import { useBffDiagnostics } from '@/data/bff.ts';

const UserDebugPage = () => {
  const auth = useAuth();
  const diagnosticsQuery = useBffDiagnostics();
  return (
    <div>
      <div>
        <h2>User</h2>
        <pre>{JSON.stringify(auth.user, null, 2)}</pre>
      </div>
      <div>
        <h2>Diagnostics</h2>
        <pre>{JSON.stringify(diagnosticsQuery.data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default UserDebugPage;
