import { EventEmitter } from "./EventEmitter";
declare class Hints extends EventEmitter {
    private hints;
    private hintsWrapper;
    private _hintClickCallback;
    private buttonClass;
    private hintButtonLabel;
    private target;
    constructor(target?: HTMLElement | null);
    enableHints(): void;
    hideHints(): void;
    hideHint(stepId: number): void;
    protected showHint(element: HTMLElement, stepId: number): void;
    protected removeHintDialog(): void;
    protected showHintDialog(element: HTMLElement, text: string, stepId: number): void;
}
export default Hints;
export { Hints };
