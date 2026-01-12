import { useMutation } from '@tanstack/react-query';
import { createContext, useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { api } from '@/lib/axios';
export const AuthContext = createContext({
  user: null,
  login: () => {},
  signup: () => {},
  signOut: () => {},
  isInitialize: true,
});

const LOCAL_STORAGE_ACCESS_TOKEN = 'accessToken';
const LOCAL_STORAGE_REFRESH_TOKEN = 'refreshToken';

const setTokens = (tokens) => {
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, tokens.accessToken);
  localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN, tokens.refreshToken);
};

const removeTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);
  localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isInitialize, setIsinitialize] = useState(true);
  const signupMutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (variables) => {
      const response = await api.post('/users', {
        first_name: variables.firstName,
        last_name: variables.lastName,
        email: variables.email,
        password: variables.password,
      });

      return response.data;
    },
  });

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (variables) => {
      const response = await api.post('/login', {
        email: variables.email,
        password: variables.password,
      });

      return response.data;
    },
  });

  useEffect(() => {
    const init = async () => {
      try {
        setIsinitialize(true);
        const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
        const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN);
        if (!accessToken && !refreshToken) return;
        const response = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(response.data);
      } catch (e) {
        setUser(null);
        removeTokens();
        console.log(e);
      } finally {
        setIsinitialize(false);
      }
    };
    init();
  }, []);

  const signup = (data) => {
    signupMutation.mutate(data, {
      onSuccess: (createdUser) => {
        setUser(createdUser);
        setTokens(createdUser.tokens);
        toast.success('Conta criada com Sucesso!');
      },
      onError: () => {
        toast.error('Error ao criar a conta!');
      },
    });
  };

  const login = async (data) => {
    loginMutation.mutate(data, {
      onSuccess: (loggedUser) => {
        setUser(loggedUser);
        setTokens(loggedUser.tokens);
      },
      onError: () => {
        toast.error('Error ao Fazer Login!');
      },
    });
  };

  const signOut = () => {
    removeTokens();
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{ user: user, login, signup, isInitialize, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
