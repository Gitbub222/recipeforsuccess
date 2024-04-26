import * as React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View, Image, Text, TextInput } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { RootStackParamList } from '../types';
import { useNavigation } from '@react-navigation/native';
import { getRecipesByIngredients, parseIngredients } from '../api/SPOON';

type SearchScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Search'
>;

const CustomInput = ({ placeholder, ...rest }: any) => {
  return (
    <View style={styles.inputContainer}>
      <Image source={require('../../assets/search-unselected.png')} style={styles.icon} />
      <TextInput
        style={styles.customInput}
        placeholder={placeholder}
        {...rest}
      />
    </View>
  );
};


const Search = () => {
  const { height } = useWindowDimensions();
  const [ingredient, setIngredient] = useState('');
  // Explicitly typing the ingredientsList as an array of strings
  const [ingredientsList, setIngredientsList] = useState<any>([]);
  const navigation = useNavigation<SearchScreenNavigationProp>();

  const handleSearch = () => {
    getRecipesByIngredients(parseIngredients(ingredientsList)).then((response: any) => {
      console.log("SEARCH: \t", response, "\n\t")
      navigation.navigate('SearchResults', { recipes: response });
      setIngredientsList([])

    })

  }


  const addIngredient = () => {
    if (ingredient) {
      setIngredientsList([...ingredientsList, ingredient]);
      setIngredient('');
    }
  };

  const removeIngredient = (index: number) => {
    const newIngredientsList = ingredientsList.filter((_: any, i: number) => i !== index);
    setIngredientsList(newIngredientsList);
  };

  const IngredientChips = () => (
    <ScrollView style={{ height: "70%" }} pagingEnabled={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
      <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {ingredientsList.map((item: any, index: number) => (
          <TouchableOpacity key={index} style={styles.chip} onPress={() => removeIngredient(index)}>
            <Text style={styles.chipText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6e8d3" }}>
      <View style={{ padding: 16 }}>
        <CustomInput
          placeholder="Add ingredient... e,g. chicken"
          value={ingredient}
          onChangeText={setIngredient}
        />
        <TouchableOpacity style={styles.button} onPress={addIngredient}>
          <Text style={styles.buttonText}>Add Ingredient</Text>
        </TouchableOpacity>
        <IngredientChips />
        <TouchableOpacity disabled={ingredientsList.length == 0} onPress={handleSearch} style={[styles.searchButton,
        { backgroundColor: ingredientsList.length == 0 ? 'grey' : '#0f6374' },
        { top: Math.round(height * .7) }]}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6e8d3',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#f59002',
    width: '60%',
    padding: 10,
    borderRadius: 5,
    margin: 20,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  chipsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#0f6374',
    margin: 5,
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'transparent'
  },
  chipText: {
    fontSize: 16,
    color: '#0f6374',
  },
  searchButton: {
    position: 'absolute',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 26,
    alignSelf: 'center',
  },
  searchButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 28,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    marginVertical: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  customInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 20,
  },
});



export default Search;
