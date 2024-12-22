import { client } from '../../utils/config';
import { AdminAuthResponse, RecordAuthResponse, RecordModel } from 'pocketbase';


interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  passwordConfirm: string;
}

interface User {
  id: string;
  email: string;
  [key: string]: any;
}

const login = async ({ email, password }: LoginCredentials, isAdmin: boolean): Promise<User> => {
  if (isAdmin) {
    const authData:AdminAuthResponse = await client.admins.authWithPassword(email, password);
    await client.authStore.save(authData.token, authData.admin);
    const { id, email: adminEmail, ...rest } = authData.admin;
    return { id, email: adminEmail, ...rest };
  } else {
    const authData: RecordAuthResponse<RecordModel> = await client.collection("users").authWithPassword(email, password);
    await client.authStore.save(authData.token, authData.record);
    const { id, email: userEmail, ...rest } = authData.record;
    return { id, email: userEmail, ...rest };
  }
};

const register = async ({ email, password, passwordConfirm }: RegisterCredentials): Promise<User> => {
  const record = await client.collection("users").create({
    email,
    password,
    passwordConfirm,
  });
  const { id, ...rest } = record;
  return { id, email, ...rest };
};

const logout = (): void => {
  client.authStore.clear();
  window.location.reload();
};

const authService = {
  login,
  register,
  logout,
};

export type { LoginCredentials, RegisterCredentials, User };
export default authService;
