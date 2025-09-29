const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API = {
  signup: `${BASE_URL}/api/auth/signup`,
  signin: `${BASE_URL}/api/auth/signin`,
  googleSignin: `${BASE_URL}/api/auth/google`,
};
