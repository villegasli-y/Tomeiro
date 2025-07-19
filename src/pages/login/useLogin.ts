import { removeUserLS, saveUserLS } from "../../utils/userLocalStore";
import { getUserSession, removerUserSession, saveUserSession } from "../../utils/userSessionStore";
import type { User } from '../../types/user';

export function useLogin() {
  return {
    login: (user: User) => {
      saveUserLS(user);
      saveUserSession();
    },
    logOut: () => {
      removeUserLS();
      removerUserSession();
    },
    isLogged: () => getUserSession() === true,
  }
}