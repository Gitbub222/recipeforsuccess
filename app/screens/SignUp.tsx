import * as React from 'react';
import { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TextInput, Alert, TouchableOpacity, Image } from 'react-native';
import { auth, db } from '../../firebase/firebaseConfig'; // Assuming it's your Firebase config file
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, setDoc, doc } from 'firebase/firestore';


const SignUp = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSignUp = async () => {
    if (!email || !password || !firstName || !lastName) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      // Firebase sign-up
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const favorites: string[] = []
      // Store user data in Firestore (assuming the rule shown above)
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        firstName,
        lastName,
        email,
        favorites

        // No need to set uid explicitly when using setDoc
      });

      // Success 
      Alert.alert('Success', 'Account created and user data saved!');
      navigation.navigate('Login');

    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };



  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Welcome")}>
        <Image source={require('../../assets/back-arrow.png')} style={{ width: 30, height: 20 }} />
      </TouchableOpacity>
      <Text style={styles.text}>Sign Up</Text>
      <View style={styles.inputContainer1}>
        <View style={styles.firstNameLabelContainer}>
          <Text style={styles.label1Text}>First name</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={text => setFirstName(text)}
          />
        </View>
        <View style={styles.lastNameLabelContainer}>
          <Text style={styles.label1Text}>Last name</Text>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={text => setLastName(text)}
          />
        </View>
      </View>
      <View style={styles.inputContainer2}>
        <Text style={styles.label2Text}>Email</Text>
        <TextInput
          style={[styles.input, { width: '90%' }]}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Text style={styles.label2Text}>Password</Text>
        <TextInput
          style={[styles.input, { width: '90%' }]}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6e8d3',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  firstNameLabelContainer: {
    flexDirection: 'column',
    alignItems: "center",
    width: '50%',
  },
  lastNameLabelContainer: {
    flexDirection: 'column',
    alignItems: "center",
    width: '50%',
  },
  text: {
    color: 'black',
    fontFamily: "Helvetica",
    fontSize: 45,
    fontWeight: "500",
    marginTop: 100,
    marginBottom: 50,
  },
  label1Text: {
    alignSelf: "center",
    color: 'black',
    fontSize: 15,
    marginLeft: -80
  },
  inputContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  inputContainer2: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: "center",
    alignItems: "center",
    width: '100%',
    
  },
  label2Text: {
    alignSelf: "flex-start",
    color: 'black',
    fontSize: 15,
    marginLeft: 20
  },
  input: {
    height: 50,
    backgroundColor: '#fcfcfc',
    borderRadius: 10,
    width: '80%',
    paddingHorizontal: "2%",
    margin: 10,
  },
  button: {
    width: "90%",
    backgroundColor: '#106374',
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 30,
    marginBottom: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "600"
  },
  linkText: {
    color: '#007bff',
    fontSize: 16,
    marginTop: 10,
  },
  backButton: {
    position: 'absolute',
    zIndex: 100,
    top: 65,
    left: 16,
  },
});

export default SignUp;
