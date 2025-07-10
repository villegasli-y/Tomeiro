const USER_KEY = "user";

interface User {
  username: string;
  password: string;
}

export function saveUserLS(user: User) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUserLS(): User | null {
  const stored = localStorage.getItem(USER_KEY);
  return stored ? JSON.parse(stored) : null;
}

export function removeUserLS() {
  localStorage.removeItem(USER_KEY);
}