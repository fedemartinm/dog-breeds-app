import React from 'react';
import { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from '../store';
import { addBreedAsync, getBreedsAsync } from '../services/breedsService';
import { BottomSafeArea, SafeArea } from '../components/SafeArea';
import { addWish, removeWish } from '../slices/wishesSlice';
import { Autocomplete } from '../components/Autocomplete';
import { Wishes } from '../components/Wishes';
import { Colors } from '../consts/colors';
import { Header } from '../components/Header';
import { Loader } from '../components/Loader';
import { Breed } from 'common';
import { View } from 'react-native-animatable';

export const WishListScreen = () => {
    const dispatch = useDispatch();
    const { loading, list } = useSelector(state => state.breeds);
    const wishes = useSelector(state => state.wishes);

    // load breeds on start
    useEffect(() => {
        dispatch(getBreedsAsync() as any);
    }, []);

    // screen actions
    const addBreed = async (breed: string) => {
        const addedBreed = await dispatch(addBreedAsync({ id: breed, name: breed }));
        dispatch(addWish(addedBreed));
    };

    const itemClicked = (breed: Breed) => {
        dispatch(addWish(breed));
    };

    const onDeleteItem = (breed: Breed) => {
        dispatch(removeWish(breed));
    };

    return (
        <>
            {loading && <Loader />}
            <StatusBar backgroundColor={Colors.backgroundColor} barStyle="light-content" />
            <SafeArea safeAreaViewStyles={styles.safeArea} avoidingKeyboardStyles={styles.container}>
                <Header title={'Breed Wish List'} background={require('../resources/images/header.png')} />
                <View style={styles.content}>
                    <Autocomplete
                        displayValue="name"
                        KeyValue="id"
                        placeholder="Add breed"
                        items={list}
                        bordered={true}
                        allowAditions={true}
                        onItemclick={itemClicked}
                        onAddItem={addBreed}
                    />
                    <Wishes items={wishes} onDeleteItem={onDeleteItem} style={styles.wishes} />
                </View>
            </SafeArea>
            <BottomSafeArea color={Colors.surfaceColor} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
    },
    safeArea: {
        backgroundColor: Colors.backgroundColor,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.surfaceColor,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingVertical: 34,
        paddingBottom: 17,
    },
    wishes: {
        width: '90%',
        flex: 1,
    },
});
