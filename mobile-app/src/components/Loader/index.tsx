import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Colors } from '../../consts/colors';
import { AnimatedPrint } from '../Print';

export const Loader = () => (
    <>
        <View style={styles.container}>
            <View style={styles.printsContainer}>
                <AnimatedPrint delay={1000} style={styles.leftPrint} />
                <AnimatedPrint delay={750} style={styles.rightPrint} />
                <AnimatedPrint delay={500} style={styles.leftPrint} />
                <AnimatedPrint delay={250} style={styles.rightPrint} />
                <AnimatedPrint delay={0} style={styles.leftPrint} />
            </View>
            <Text style={styles.loadingText}>loading...</Text>
        </View>
    </>
);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.backgroundColor,
    },
    printsContainer: {
        width: 80,
    },
    leftPrint: {
        transform: [{ rotate: '-10deg' }],
        alignSelf: 'flex-start',
    },
    rightPrint: {
        transform: [{ rotate: '10deg' }],
        alignSelf: 'flex-end',
    },
    loadingText: {
        marginVertical: 50,
        textAlign: 'center',
        color: Colors.lightTextColor,
        fontSize: 20,
    },
});
