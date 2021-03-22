import React, { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleProp, StyleSheet, ViewStyle } from 'react-native';

interface SafeAreaProps {
    safeAreaViewStyles?: StyleProp<ViewStyle>;
    avoidingKeyboardStyles?: StyleProp<ViewStyle>;
}

export const SafeArea = (props: PropsWithChildren<SafeAreaProps>) => {
    const safeAreaViewStyles = StyleSheet.flatten([styles.safeAreaView, props.safeAreaViewStyles]);
    const avoidingKeyboardStyles = StyleSheet.flatten([styles.kyboardAvoidingView, props.avoidingKeyboardStyles]);

    return (
        <SafeAreaView style={safeAreaViewStyles}>
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                style={avoidingKeyboardStyles}
                keyboardVerticalOffset={0}
            >
                {props.children}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export const BottomSafeArea = (props: { color: string }) => (
    <SafeAreaView style={{ flex: 0, backgroundColor: props.color }} />
);

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    kyboardAvoidingView: {
        flex: 1,
    },
});
