import React, { useMemo, useRef, useState } from 'react';
import { FlatList, FlatListProps, Keyboard, Modal, Platform, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native-animatable';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useKeyboard, useMeasurement } from '../../utils/measurements';
import { styles, calculateStyles } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../consts/colors';

interface AutocompleteProps<T> {
    items: T[];

    //extractors
    displayValue: keyof T;
    KeyValue: keyof T;

    allowAditions?: boolean;
    placeholder?: string;
    bordered?: boolean;
    render?: (items: T) => React.ReactNode;
    onItemclick?: (item: T) => void;
    onAddItem?: (item: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;

    // Composition API
    itemComponent?: FlatListProps<T>['renderItem'];
    separatorComponent?: FlatListProps<T>['ItemSeparatorComponent'];
    emptyComponent?: FlatListProps<T>['ListEmptyComponent'];
    headerComponent?: FlatListProps<T>['ListHeaderComponent'];
    footerComponent?: FlatListProps<T>['ListFooterComponent'];
}

export function Autocomplete<T>(props: AutocompleteProps<T>) {
    const [stateText, setStateText] = useState('');
    const [visible, setVisible] = useState(false);
    const inputRef = useRef<TextInput | null>(null);

    // filter
    const results = useMemo(() => {
        return props.items.filter(item => {
            const displayValue = item[props.displayValue];
            return (displayValue as any).toString().startsWith(stateText);
        });
    }, [props.items, stateText]);

    // events
    const onFocus = async () => {
        props.onFocus && props.onFocus();
    };

    const onBlur = () => {
        props.onBlur && props.onBlur();
    };

    const onChangeText = (text: string) => {
        setStateText(text);
    };

    const onOpenModal = async () => {
        setVisible(true);
    };

    const onCloseModal = () => {
        setVisible(false);
    };

    const onShowModal = () => {
        // prevent race condition by forcing focus
        // after modal is showed
        inputRef.current?.focus();
    };

    const onItemclick = (item: T) => {
        Keyboard.dismiss();
        setStateText('');
        setVisible(false);
        props.onItemclick && props.onItemclick(item);
    };

    const onAddItem = () => {
        if (
            stateText &&
            props.allowAditions &&
            props.items.every(item => (item[props.displayValue] as any) !== stateText)
        ) {
            const newItem = stateText;
            setVisible(false);
            setStateText('');
            Keyboard.dismiss();
            props.onAddItem && props.onAddItem(newItem);
        }
    };

    // Compositon
    const compositionProps = { ...props, onItemclick, onAddItem };
    const keyExtractor = (item: T) => item[props.KeyValue] as any;
    const renderItem = props.itemComponent ? props.itemComponent : createDefaultItem(compositionProps);
    const defaultAddButton = createDefaultAddButton(compositionProps);
    const ItemSeparatorComponent = props.separatorComponent
        ? props.separatorComponent
        : createDefaultSeparator(compositionProps);

    //
    // Adjust modal to fit visible space
    //
    const keyboardHeight = useKeyboard();
    const { bottom: bottomOffset } = useSafeAreaInsets();
    const { reference, measurements } = useMeasurement<TouchableOpacity>();
    const itemsCount = results.length;

    const calculatedStyles = useMemo(
        () => calculateStyles({ measurements, keyboardHeight, bottomOffset, itemsCount }),
        [measurements, keyboardHeight, bottomOffset, itemsCount],
    );

    // layout optimization, enabled for default items
    const getItemLayout =
        props.itemComponent || props.separatorComponent
            ? undefined
            : (item: any, index: number) => {
                  const itemHeight =
                      styles.deafultItemText.lineHeight +
                      styles.defaultItem.paddingVertical * 2 +
                      styles.separator.height;
                  return {
                      index,
                      length: itemHeight,
                      offset: itemHeight * index,
                  };
              };

    return (
        <View style={styles.container}>
            <View style={styles.textInputContainer}>
                <TouchableOpacity onPress={onOpenModal} ref={reference} style={[styles.textInput, styles.placeholder]}>
                    <Text style={styles.placeholderText}>{stateText ? stateText : props.placeholder}</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={onCloseModal}
                onShow={onShowModal}
            >
                <TouchableOpacity activeOpacity={1} onPress={onCloseModal} style={styles.overlay}>
                    <View style={calculatedStyles.modal}>
                        <TextInput
                            ref={inputRef}
                            autoCorrect={false}
                            style={[styles.textInput, styles.elevated]}
                            value={stateText}
                            onChangeText={onChangeText}
                            placeholder={props.placeholder}
                            onFocus={onFocus}
                            onBlur={onBlur}
                        />
                        {stateText ? defaultAddButton : null}
                        <View
                            style={[
                                styles.elevated,
                                Platform.select({
                                    android: styles.rounded,
                                }),
                            ]}
                        >
                            <View
                                style={[
                                    styles.resultsContainer,
                                    Platform.select({
                                        ios: styles.rounded,
                                    }),
                                ]}
                            >
                                <FlatList
                                    style={calculatedStyles.results}
                                    keyboardShouldPersistTaps={'always'}
                                    contentContainerStyle={styles.results}
                                    data={results}
                                    keyExtractor={keyExtractor}
                                    renderItem={renderItem}
                                    ItemSeparatorComponent={ItemSeparatorComponent}
                                    getItemLayout={getItemLayout}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

// Default components

function createDefaultSeparator<T>(props: AutocompleteProps<T>) {
    return function (separatorProps: { leadingItem: T }) {
        return props.bordered ? (
            <View key={separatorProps.leadingItem[props.KeyValue] as any} style={styles.separator} />
        ) : null;
    };
}

function createDefaultItem<T>(props: AutocompleteProps<T>) {
    return function (itemProps: { item: T }) {
        return (
            <TouchableOpacity
                key={itemProps.item[props.KeyValue] as any}
                style={styles.defaultItem}
                onPress={() => {
                    props.onItemclick && props.onItemclick(itemProps.item);
                }}
            >
                <Text style={styles.deafultItemText} numberOfLines={2}>
                    {itemProps.item[props.displayValue]}
                </Text>
            </TouchableOpacity>
        );
    };
}

function createDefaultAddButton<T>(props: AutocompleteProps<T>) {
    if (!props.allowAditions) {
        return null;
    }
    return (
        <TouchableOpacity
            style={[styles.defaultAddButton, styles.elevated]}
            onPress={() => props.onAddItem && props.onAddItem('')}
        >
            <Icon name="add" size={30} color={Colors.backgroundColor} style={styles.defaultAddIcon} />
        </TouchableOpacity>
    );
}
