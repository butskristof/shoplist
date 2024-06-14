import { IconLogin2 } from '@tabler/icons-react';
import IconButton from '@/components/common/IconButton.tsx';

const UnauthenticatedView = () => {
  const returnUrl = window.location.origin;
  return (
    <div className="full-page-info">
      <h1>You are not logged in</h1>
      <p>Please log in to access the application.</p>
      <div className="actions">
        <IconButton
          icon={<IconLogin2 size="1.25rem" />}
          component="a"
          href={`/bff/login?returnUrl=${returnUrl}`}
          size="lg"
        >
          Log in
        </IconButton>
      </div>
    </div>
  );
};

export default UnauthenticatedView;
