import { useMutation } from '@tanstack/react-query';
import { createContext, useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'sonner';

import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from '@/constants/local-storage';
import { UserService } from '@/services/users';
export const AuthContext = createContext({
  user: null,
  login: () => {},
  signup: () => {},
  signOut: () => {},
  isInitialize: true,
});

const setTokens = (tokens) => {
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, tokens.refreshToken);
};

const removeTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isInitialize, setIsinitialize] = useState(true);
  const signupMutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (variables) => {
      const response = await UserService.signup(variables);
      return response;
    },
  });

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (variables) => {
      const response = await UserService.login(variables);
      return response;
    },
  });

  useEffect(() => {
    const init = async () => {
      try {
        setIsinitialize(true);
        const accessToken = localStorage.getItem(
          LOCAL_STORAGE_ACCESS_TOKEN_KEY
        );
        const refreshToken = localStorage.getItem(
          LOCAL_STORAGE_REFRESH_TOKEN_KEY
        );
        if (!accessToken && !refreshToken) return;
        const response = await UserService.me();
        setUser(response);
      } catch (e) {
        setUser(null);
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
        //setTokens(createdUser.tokens);
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
