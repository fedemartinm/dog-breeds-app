import { ReactElement, RefObject, useEffect, useRef, useState } from 'react';
import { Keyboard, KeyboardEvent, MeasureOnSuccessCallback } from 'react-native';

/**
 * keyboard height measurement hook
 * @returns
 */
export const useKeyboard = (): number => {
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    const show = (e: KeyboardEvent) => {
        setKeyboardHeight(e.endCoordinates.height);
    };

    const hide = () => {
        setKeyboardHeight(0);
    };

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', show);
        Keyboard.addListener('keyboardDidHide', hide);
        return (): void => {
            Keyboard.removeListener('keyboardDidShow', show);
            Keyboard.removeListener('keyboardDidHide', hide);
        };
    }, []);

    return keyboardHeight;
};

// Arguments extractor
export type Parameters<T> = T extends (...args: infer T) => any ? T : never;

export type Measurements = Parameters<MeasureOnSuccessCallback>;

export type MeasurableElement<T> = T & {
    measure: (callback: MeasureOnSuccessCallback) => void;
};

/**
 * Gets measurements from the provided element ref
 * @returns
 */
export function useMeasurement<T>() {
    const [measurements, setMeasurements] = useState<Measurements>();
    const reference = useRef<T>() as RefObject<T>;

    useEffect(() => {
        const currentRef = reference.current as MeasurableElement<T>;
        currentRef.measure((...params) => setMeasurements(params));
    }, []);

    return { reference, measurements };
}
