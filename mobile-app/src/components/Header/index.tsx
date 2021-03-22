import React from 'react';
import { ImageSourcePropType, StyleSheet, Text } from 'react-native';
import { Image, View } from 'react-native-animatable';
import { Colors } from '../../consts/colors';

interface HeaderProps {
    title: string;
    background: ImageSourcePropType;
}

export const Header = (props: HeaderProps) => (
    <View style={styles.container}>
        <Image source={props.background} resizeMode="contain" style={styles.image} />
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    image: {
        position: 'absolute',
        width: '100%',
        height: 70,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    titleContainer: {
        height: 70,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.lightTextColor,
    },
});
