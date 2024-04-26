import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Card from '../components/SavedCard';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getRecipe } from '../api/SPOON';
import { RootStackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Loading from '../components/Loading';

type SavedScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Saved'
>;

const Saved = () => {

  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);
  const savedRecipes = useSelector((state: any) => state.user.user ? state.user.user.favorites : []); // Add condition here
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const navigation = useNavigation<SavedScreenNavigationProp>();

  const handlePress = (id: number) => {
    navigation.navigate('RecipeDetail', { recipeID: id });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setLoading(false);
      setData([]);
    }
  }, [isLoggedIn]); // Dependency array focuses on 'isLoggedIn'

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!isLoggedIn) {
        setLoading(false);
        setData([]);
        return;
      }
      try {
        const recipes: any = await Promise.all(savedRecipes.map((id: number) => getRecipe(id).then((response: any) => response)));
        setData(recipes);
      } catch (err) {
        console.log('Failed to fetch recipe');
        setError('Failed to fetch recipes');
      } finally {
        setLoading(false);
      }
    };
    if (isLoggedIn) {
      fetchRecipe();
    }
  }, [savedRecipes, isLoggedIn]);

  console.log(data)

  if (isLoading) return <Loading />
  if (error) return <Text>{error}</Text>;

  const renderItem = ({ item }: any) => {
    if (item == null || item == undefined) {
      return null; // Skip rendering if the item is null
    }
    return (
      <TouchableOpacity onPress={() => handlePress(item.id)}>
        <View style={styles.cardContainer}>
          <Card title={item.title} imageUrl={item.image} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: '10%' }}>
        {
          data.length > 0 && !data.some(value => value === null) ?
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item: any) => item.id.toString()}
              numColumns={2}
              contentContainerStyle={styles.flatListContent}
            />
            :
            <></>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f6e8d3',
  },
  flatListContent: {
    marginTop: '1%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    margin: 8,
  },
});

export default Saved;