import { getItem, setItem, removeItem } from "./sessionStoreManager";

const SESSION_KEY = "sessionUser";

export function saveUserSession() {
  setItem(SESSION_KEY, true);
}

export function getUserSession(): boolean | null {
  return getItem<boolean>(SESSION_KEY) === true;
}

export function removerUserSession() {
  removeItem(SESSION_KEY);
}
