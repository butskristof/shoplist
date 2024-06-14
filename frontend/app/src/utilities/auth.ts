import { useBffUser } from '@/data/bff.ts';
import { BffUser, Claim } from '@/types/bff.types.ts';

export const useAuth = () => {
  const query = useBffUser();
  const user = query.data != null ? mapClaimsToBffUser(query.data) : undefined;

  return {
    query,
    isLoading: query.isPending,
    isAuthenticated: query.isSuccess,
    claims: query.data,
    user,
  };
};

const findClaimValueByType = (claims: Claim[], type: string): string | undefined =>
  claims.find((c) => c.type === type)?.value;

const mapClaimsToBffUser = (claims: Claim[]): BffUser => {
  const authTimeValue = findClaimValueByType(claims, 'auth_time');
  const authTime = authTimeValue ? Number(authTimeValue) : undefined;
  const expiresInValue = findClaimValueByType(claims, 'bff:session_expires_in');
  const expiresIn = expiresInValue ? Number(expiresInValue) : undefined;

  return {
    sub: findClaimValueByType(claims, 'sub'),
    auth_time: authTime,
    name: findClaimValueByType(claims, 'name'),
    given_name: findClaimValueByType(claims, 'given_name'),
    preferred_username: findClaimValueByType(claims, 'preferred_username'),
    nickname: findClaimValueByType(claims, 'nickname'),
    groups: findClaimValueByType(claims, 'groups'),
    'bff:session_expires_in': expiresIn,
  };
};
