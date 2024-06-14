export interface BffUser {
  sub: string;
  auth_time: number;
  name: string;
  given_name: string;
  preferred_username: string;
  nickname: string;
  groups: string;
  'bff:session_expires_in': number;
}

export type Claim = {
  type:
    | 'sub'
    | 'auth_time'
    | 'name'
    | 'given_name'
    | 'preferred_username'
    | 'nickname'
    | 'groups'
    | 'bff:session_expires_in';
  value: unknown;
};
