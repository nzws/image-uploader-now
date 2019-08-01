import { h } from 'hyperapp';
import { linkGet } from '../utils/link';

export const Login = () => (
  <a
    href={linkGet('https://github.com/login/oauth/authorize', {
      client_id: process.env.GITHUB_CLIENT_ID
    })}
  >
    Sign in with GitHub
  </a>
);
