import { Options } from "./types";
import { EventEmitter } from "./EventEmitter";
declare class IntroTS extends EventEmitter {
    private _options;
    private _steps;
    private _activeStep;
    private _target;
    private block;
    private layer;
    private active;
    constructor(target?: HTMLElement | null);
    setOption(option: string, value: any): this;
    setOptions(options: Options): this;
    refresh(): this;
    start(step?: number | null): this;
    getStep(): number | null;
    addStep(element: HTMLElement | string, intro: string, step?: number, position?: string): this;
    addSteps(data: Array<{
        element: HTMLElement;
        intro: string;
        position: string;
    }>): this;
    next(step?: number | null, revert?: boolean): void;
    previous(step?: number | null): void;
    stop(): void;
    protected _onKeyDown(e: KeyboardEvent): void;
    protected getProgress(): number;
    protected createElement(targetElement: HTMLElement): boolean;
}
export default IntroTS;
export { IntroTS };
