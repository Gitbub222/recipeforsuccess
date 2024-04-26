import * as React from 'react';
import { StyleSheet, Image, View, Text, Button, Touchable, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipe } from '../api/SPOON';

const Welcome = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RecipeForSuccess</Text>
      <Text style={styles.subtitle}> -Discover a world of delicious</Text>
      <Text style={styles.callout}>
        The ultimate source for recipes.
      </Text>
      <Text style={styles.description}>Here you can find a wide variety of {"\n"}
        mouthwatering recipes to satisfy your taste{"\n"}buds.</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={() => {
          navigation.navigate("Login")
        }}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupButton} onPress={() => { navigation.navigate('SignUp') }}>
          <Text style={styles.signupButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: '#f6e8d3',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: "5%",
    marginBottom: "30%",
    marginTop: "20%",
  },
  subtitle: {
    fontSize: 15,
    marginLeft: "5%",
    marginBottom: "5%",
  },
  callout: {
    fontSize: 42,
    fontWeight: '900',
    marginLeft: "5%",
    marginBottom: "5%",
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
    marginLeft: "5%",
    marginBottom: "30%",
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: "center",
    width: '100%',
  },
  loginButton: {
    width: "90%",
    textAlign: "center",
    backgroundColor: '#106374',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 150,
    marginTop: 20,
    marginBottom: 20,
  },
  signupButton: {
    width: "90%",
    textAlign: "center",
    paddingVertical: 13,
    paddingHorizontal: 140,
    marginTop: 20,
    marginBottom: 20,
    borderColor: "#0f6374",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "none"

  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  },
  signupButtonText: {
    color: "#106374",
    fontSize: 16,
    fontWeight: "600"
  }
});

export default Welcome;
