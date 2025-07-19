import { getItem, setItem, removeItem } from "./localStoreManager";
import type { User } from '../types/user';

const USER_KEY = "user";

export function saveUserLS(user: User) {
  setItem(USER_KEY, user);
}

export function getUserLS(): User | null {
  return getItem<User>(USER_KEY);
}

export function removeUserLS() {
  removeItem(USER_KEY);
}
