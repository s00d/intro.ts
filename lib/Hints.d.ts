import { EventEmitter } from "./EventEmitter";
export declare class Hints extends EventEmitter {
    private hints;
    private hintsWrapper;
    private _hintClickCallback;
    private buttonClass;
    private hintButtonLabel;
    private target;
    constructor(target?: HTMLElement | null);
    enableHints(): void;
    showHint(element: HTMLElement, stepId: number): void;
    hideHints(): void;
    hideHint(stepId: number): void;
    protected removeHintDialog(): void;
    protected showHintDialog(element: HTMLElement, text: string, stepId: number): void;
}
export default Hints;
