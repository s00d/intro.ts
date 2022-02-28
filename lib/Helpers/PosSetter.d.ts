export declare class PosSetter {
    private readonly showStepNumbers;
    private readonly positionPrecedence;
    constructor(showStepNumbers?: boolean, positionPrecedence?: Array<string>);
    place(step: number | undefined, tooltipLayer: HTMLElement, arrowLayer: HTMLElement, helperNumberLayer: HTMLElement): void;
    private _determineAutoAlignment;
    private _determineAutoPosition;
    private _checkLeft;
    private _checkRight;
    private topRightAligned;
    private topMiddleAligned;
    private topLeftAligned;
    private top;
    private right;
    private left;
    private floating;
    private bottomRightAligned;
    private bottomMiddleAligned;
    private default;
}
