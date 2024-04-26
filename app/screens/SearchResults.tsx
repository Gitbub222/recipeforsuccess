import * as React from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Card from '../components/SearchCard';
import { RootStackParamList } from '../types';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { addRecipe, removeRecipe } from '../features/userSlice';
import { getRecipe } from '../api/SPOON';
import { useDispatch, useSelector } from 'react-redux';

// const recipeData: Recipe = {
//     title: 'Creamy Funghi Risotto',
//     duration: '30 minutes',
//     calories: 850,
//     serves: 4,
//     ingredients: [
//         { name: 'Arborio rice', amount: '250g' },
//         { name: 'spring onions', amount: '2' },
//         { name: 'garlic cloves', amount: '2' },
//         { name: 'mixed mushrooms', amount: '500g' }
//         // ...other ingredients
//     ],
//     preparationSteps: [
//         'Heat up oil in a small pot.',
//         'Add the onions and garlic and cook until soft.',
//         'Add the mushrooms and cook until soft.',
//         'Add the rice and cook for 2 minutes.',
//         'Add the stock and stir until the rice is cooked.',
//         // ...other steps
//     ],
//     image: 'https://source.unsplash.com/400x300/?alfredo',
// };

type SavedScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Saved'
>;

const SearchResults = ({ route }: any) => {
    const { recipes } = route.params;
    const navigation = useNavigation<SavedScreenNavigationProp>();
    const handlePress = (id: number) => {
        navigation.navigate('RecipeDetail', { recipeID: id });
    }
    const savedRecipes = useSelector((state: any) => state.user.savedRecipes);

    const dispatch = useDispatch();

    const handleBookmark = (id: number) => {
        if (savedRecipes) {
            if (savedRecipes.includes(id)) {
                dispatch(removeRecipe(id as any))
            } else {
                dispatch(addRecipe(id as any))
            }
        } else {
            dispatch(addRecipe(id as any))
        }

        console.log(savedRecipes)
    }

    const renderItem = ({ item }: any) => (
        <TouchableOpacity onPress={() => handlePress(item.id)}>
            <View style={styles.cardContainer}>
                <Card id={item.id} title={item.title} description={''} imageUrl={item.image} handleBookmark={handleBookmark} />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Image source={require('../../assets/back-arrow.png')} style={{ width: 30, height: 20 }} />
            </TouchableOpacity>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 65, marginBottom: 20, alignSelf: "center" }}>Search Results</Text>

            <FlatList
                data={recipes}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={1}
                contentContainerStyle={styles.flatListContent}>
            </FlatList>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#f6e8d3',

    },
    backButton: {
        position: 'absolute',
        zIndex: 1000,
        top: 50,
        left: 16,
    },
    flatListContent: {
        margin: 8,
    },
    cardContainer: {
        margin: 8,
    },
});

export default SearchResults;
