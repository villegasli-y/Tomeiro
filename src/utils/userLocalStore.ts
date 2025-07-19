import { setItem, getItem, removeItem } from "./localStoreManager";

const USER_KEY = "user";

interface User {
  username: string;
  password: string;
}

export function saveUserLS(user: User) {
  setItem(USER_KEY, user);
}

export function getUserLS(): User | null {
 return getItem<User>(USER_KEY);
}

export function removeUserLS() {
  removeItem(USER_KEY);
}