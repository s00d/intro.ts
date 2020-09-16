import { Options, size } from "./types";
export declare function mergeOptions(oldOptions?: Options | null, newOptions?: Options | null): Options;
export interface ForEach {
    (value: any, index: number): void;
}
export declare function _forEach(arr: Array<any> | NodeListOf<Element>, forEach: ForEach, complete?: () => void): void;
export declare function _getOffset(element: Element): size;
export declare function _getWinSize(): size;
export declare function _removeEntry(stringArray: Array<string>, el: string): void;
export declare function _getPropValue(element: HTMLElement, propName: string): string;
export declare function _isFixed(element: HTMLElement): boolean;
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
export declare function _setHelperLayerPosition(helperLayer: HTMLElement, helperElementPadding?: number, offset?: number): void;
export declare function alignHintPosition(position: string, hint: HTMLElement, element: HTMLElement): void;
