import { Dimensions, Platform, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../consts/colors';
import { Measurements } from '../../utils/measurements';

export const ModalSeparation = 17;

export const styles = StyleSheet.create({
    container: {
        width: '90%',
        marginBottom: ModalSeparation,
    },
    textInputContainer: {
        flexDirection: 'row',
    },
    textInput: {
        backgroundColor: Colors.fieldColor,
        height: 44,
        borderRadius: 11,
        color: Colors.darkTextColor,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 15,
        marginBottom: 5,
        width: '100%',
    },
    elevated: {
        ...Platform.select({
            android: {
                backgroundColor: Colors.fieldColor,
                elevation: 2,
            },
            ios: {
                shadowColor: Colors.shadowColor,
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
            },
        }),
    },
    rounded: {
        borderRadius: 11,
        overflow: 'hidden',
    },
    overlay: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    placeholder: {
        display: 'flex',
        justifyContent: 'center',
    },
    placeholderText: {
        color: Colors.darkTextColor,
    },
    separator: {
        height: 1,
        backgroundColor: Colors.surfaceColor,
    },
    resultsContainer: {
        backgroundColor: Colors.fieldColor,
        overflow: 'hidden',
    },
    results: {
        backgroundColor: 'white',
        width: '100%',
    },
    defaultItem: {
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    deafultItemText: {
        color: Colors.darkTextColor,
        fontSize: 16,
        lineHeight: 20,
    },
    defaultAddButton: {
        position: 'absolute',
        zIndex: 1,
        top: 7,
        bottom: 4,
        right: 10,
        height: 30,
        width: 30,
    },
    defaultAddIcon: {
        height: 30,
        width: 30,
    },
});

// Calculated styles

type CalculateStylesArgs = {
    measurements?: Measurements;
    keyboardHeight: number;
    bottomOffset: number;
    itemsCount: number;
};

type CalculatedStylesResult = {
    modal: ViewStyle;
    results: ViewStyle;
};

export function calculateStyles(args: CalculateStylesArgs): CalculatedStylesResult {
    const defaultStyles = {
        modal: {},
        results: {},
    };
    if (typeof args.measurements === 'undefined') {
        return defaultStyles;
    }
    const window = Dimensions.get('window');
    const [, , width, height, pageXOffset, pageYOffset] = args.measurements;
    const modalMaxHeight = window.height - pageYOffset - (args.bottomOffset + args.keyboardHeight);

    // Quick fix for android auto-correct section.
    // I should try with windowSoftInputMode="adjustResize" on android manifiest
    const paddingBottom = Platform.OS === 'android' && args.keyboardHeight ? 40 : 0;
    const resultsMaxHeight = modalMaxHeight - height - ModalSeparation - paddingBottom;

    const itemHeight = styles.deafultItemText.lineHeight + styles.defaultItem.paddingVertical * 2;
    const resutlsHeight = args.itemsCount * itemHeight;
    return {
        modal: {
            left: pageXOffset,
            top: pageYOffset,
            width,
            height: resutlsHeight < modalMaxHeight ? resutlsHeight : modalMaxHeight,
            maxHeight: modalMaxHeight,
            position: 'relative',
            display: 'flex',
        },
        results: {
            height: resutlsHeight < resultsMaxHeight ? resutlsHeight : resultsMaxHeight,
            maxHeight: resultsMaxHeight,
        },
    };
}
