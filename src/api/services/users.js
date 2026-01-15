import { api, protectedApi } from '@/lib/axios';

export const UserService = {
  signup: async (input) => {
    const response = await api.post('/users', {
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      password: input.password,
    });
    return {
      id: response.data.id,
      email: response.data.email,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
    };
  },

  login: async (input) => {
    const response = await api.post('/login', {
      email: input.email,
      password: input.password,
    });
    return {
      id: response.data.id,
      email: response.data.email,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      tokens: response.data.tokens,
    };
  },

  me: async () => {
    const response = await protectedApi.get('/users/me');
    return {
      id: response.data.id,
      email: response.data.email,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
    };
  },

  getBalance: async (input) => {
    const queryParams = new URLSearchParams();
    queryParams.set('from', input.from);
    queryParams.set('to', input.to);
    const response = await protectedApi.get(
      `/users/balance?${queryParams.toString()}`
    );
    return response.data;
  },
};
