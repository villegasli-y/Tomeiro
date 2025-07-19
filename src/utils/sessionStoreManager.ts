export function setItem<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
}

export function getItem<T>(key: string): T | null{
    try{
        const stored = sessionStorage.getItem(key);
        return stored ? JSON.parse(stored) as T : null;
    }catch(error){
        console.error(`Something went wrong reading ${key} from sessionStorage`, error);
        return null;
    }
}

export function removeItem(key: string): void {
    sessionStorage.removeItem(key);
}