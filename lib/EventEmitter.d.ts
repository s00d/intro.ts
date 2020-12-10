export declare class EventEmitter {
    private listeners;
    addEventListener(type: string, callback: (params: any) => void): void;
    removeEventListener(type: string): void;
    protected dispatch(event: string, args?: {
        [key: string]: any;
    }): void;
}
