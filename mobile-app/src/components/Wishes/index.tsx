import React from 'react';
import { Breed } from 'common';
import { FlatList, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Text, View } from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { hashColor } from '../../utils/hashColor';
import { Colors } from '../../consts/colors';

interface WishesProps {
    items: Breed[];
    onDeleteItem: (item: Breed) => void;
    style: ViewStyle;
}

export const Wishes = (props: WishesProps) => (
    <FlatList
        style={props.style}
        data={props.items}
        scrollEnabled={true}
        ItemSeparatorComponent={Separator}
        keyExtractor={e => e.id}
        renderItem={renderItem(props)}
    />
);

const Separator = () => <View style={styles.separator} />;

const renderItem = (props: WishesProps) => (itemProps: { item: Breed; index: number }) => (
    <View style={styles.item}>
        <Icon name="pets" size={20} style={styles.icon} color={hashColor(itemProps.item.name)} />
        <Text style={styles.itemText}>{itemProps.item.name}</Text>
        <TouchableOpacity onPress={() => props.onDeleteItem(itemProps.item)}>
            <Icon name="close" size={20} style={styles.deleteIcon} color={Colors.backgroundColor} />
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    icon: {
        marginHorizontal: 10,
    },
    item: {
        paddingVertical: 20,
        borderRadius: 11,
        backgroundColor: Colors.fieldColor,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemText: {
        flex: 1,
        color: Colors.darkTextColor,
    },
    separator: {
        height: 15,
    },
    deleteIcon: {
        marginHorizontal: 15,
    },
});
