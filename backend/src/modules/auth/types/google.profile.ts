export interface OAuthProfile {
  provider: 'google';
  providerAccountId: string;
  email: string;
  displayName: string;
  picture?: string;
  accessToken?: string;
  refreshToken?: string;
}
