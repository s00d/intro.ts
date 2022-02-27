import Hints from "./Hints";
import IntroTS from "./Intro";
export declare type Options = {
    steps: Array<number>;
    nextLabel: string;
    prevLabel: string;
    skipLabel: string;
    doneLabel: string | null;
    tooltipPosition: 'bottom' | 'top' | 'floating';
    hidePrev: boolean;
    hideNext: boolean;
    hideSkip: boolean;
    highlight: boolean;
    exitOnEsc: boolean;
    exitOnOverlayClick: boolean;
    showStepNumbers: boolean;
    keyboardNavigation: boolean;
    showButtons: boolean;
    showBullets: boolean;
    showProgress: boolean;
    scrollToElement: boolean;
    overlayOpacity: number;
    positionPrecedence: Array<"bottom" | "top" | "right" | "left">;
    helperElementPadding: number;
    additionalButtons: Array<{
        name: string;
        label: string;
        className: string;
        callback: () => void;
    }>;
};
export declare type size = {
    top: number;
    width: number;
    height: number;
    left: number;
};
declare global {
    interface Window {
        Hints: typeof Hints;
        IntroTS: typeof IntroTS;
    }
}
