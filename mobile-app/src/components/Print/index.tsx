import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import { StyleProp, View, ViewStyle } from 'react-native';
import { PrintAnimation } from '../../consts/animations';
import { Colors } from '../../consts/colors';

const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

interface AnimatedPrintProps {
    delay: number;
    style: StyleProp<ViewStyle>;
}

export const AnimatedPrint = (props: AnimatedPrintProps) => (
    <View style={props.style}>
        <AnimatedIcon
            name="pets"
            size={30}
            color={Colors.lightTextColor}
            delay={props.delay}
            duration={2000}
            animation={PrintAnimation}
            iterationCount="infinite"
        />
    </View>
);
