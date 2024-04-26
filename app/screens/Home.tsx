import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Image, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { addRecipe, clearUser, removeRecipe } from '../features/userSlice';
import { auth } from '../../firebase/firebaseConfig';
import SearchCard from '../components/SearchCard';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, recipes1 } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Loading from '../components/Loading';

type SavedScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Saved'
>;

const Home = () => {

  const navigation = useNavigation<SavedScreenNavigationProp>();
  const handlePress = (id: number) => {
    navigation.navigate('RecipeDetail', { recipeID: id });
  }
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);
  const savedRecipes = useSelector((state: any) => state.user.user ? state.user.user.favorites : []); // Add condition here
  const [isLoading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const handleBookmark = (id: any) => {
    if (!savedRecipes.includes(id))
      dispatch(addRecipe(id))
    else
      dispatch(removeRecipe(id))
  }

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(false);
    }
  }, [isLoggedIn]); // Dependency array focuses on 'isLoggedIn'

  if (isLoading) return <Loading />

  const renderItem = ({ item }: any) => (
    <TouchableOpacity onPress={() => handlePress(item.id)}>
      <View style={styles.cardContainer}>
        <SearchCard id={item.id} title={item.title} description={''} imageUrl={item.image} handleBookmark={handleBookmark} isBookmarked={savedRecipes.includes(item.id)} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tops Picks!</Text>

      <FlatList
        data={recipes1}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id}
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
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 75,
    marginBottom: 20,
    alignSelf: "flex-start",
    marginLeft: 30,
  }
});

export default Home;
