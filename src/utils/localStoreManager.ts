export function setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getItem<T>(key: string): T | null{
    try{
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) as T : null;
    }catch(error){
        console.error(`Something went wrong reading ${key} from localStorage`, error);
        return null;
    }
}

export function removeItem(key: string): void {
    localStorage.removeItem(key);
}