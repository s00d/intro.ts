export declare class Block {
    private layer;
    private reference;
    private arrow;
    private tooltip;
    private tooltipText;
    private progress;
    private progressBar;
    private buttons;
    private helperElementPadding;
    private buttonsList;
    private overlay;
    private helperNumberLayer;
    private targetElement;
    private helper;
    private _posSetter;
    constructor(helperElementPadding: number | undefined, showStepNumbers: boolean, positionPrecedence: Array<string>);
    create(targetElement: HTMLElement): void;
    createButton(name: string, label: string, className: string, callback: () => void, last?: boolean): void;
    addButton(name: string, label: string, className: string, callback: () => void, last?: boolean): void;
    removeButton(name: string): void;
    setButtonsClass(step: 'first' | 'last' | string, hide: boolean): void;
    setButtonClass(button: string, className: string): void;
    setButtonText(button: string, text: string): void;
    removeButtonClass(button: string, className: string): void;
    disable(): void;
    setProgress(progress?: number, step?: number): void;
    addHelperClass(highlightClass: string): void;
    removeHelperClass(highlightClass: string): void;
    setShowButtons(): void;
    setShowProgress(): void;
    setText(text: string): void;
    setShowHelperNumber(): void;
    overlayClick(): void;
    setOverlayOpacity(overlayOpacity: number): void;
    generateButtons(): void;
    updatePosition(step: number | undefined): void;
    protected generateHelperNumber(): void;
    protected generateOverlay(): void;
    protected generateProgress(): void;
    protected generateLayer(): void;
    protected generateTooltipText(): void;
    protected generateTooltip(): void;
    protected generateArrow(): void;
    protected generateReference(): void;
    protected generateHelper(): void;
}
