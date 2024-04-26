import * as React from 'react';
import { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Text, TouchableOpacity, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { auth, db } from '../../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { USER, setUser } from '../features/userSlice';


const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userID = userCredential.user.uid;

      // Fetch user data from Firestore
      const userDocRef = doc(db, 'users', userID);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        dispatch(setUser({
          uid: userID,
          email: userCredential.user.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          favorites: userData.favorites || [], // Handle potential undefined
          // Add other essential properties from userData
        } as USER));
        navigation.navigate("Main")
      } else {
        console.log("User document not found");
        // Handle the case where a user document doesn't exist 
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Welcome")}>
        <Image source={require('../../assets/back-arrow.png')} style={{ width: 30, height: 20 }} />
      </TouchableOpacity>

      <Text style={styles.text}>Welcome!</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6e8d3',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontFamily: "Helvetica",
    fontSize: 45,
    fontWeight: "500",
    marginTop: 100,
    marginBottom: 50,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: "center",
    width: '100%',
    marginBottom: 10,

  },
  input: {
    height: 50,
    backgroundColor: '#fcfcfc',
    borderRadius: 10,
    width: '90%',
    margin: 10,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: "4%",
  },
  button: {
    width: "90%",
    backgroundColor: '#106374',
    borderRadius: 10,
    paddingVertical: 15,
    // paddingHorizontal: 150,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "600"
  },
  backButton: {
    position: 'absolute',
    zIndex: 100,
    top: 65,
    left: 16,
  },
});


export default Login;
