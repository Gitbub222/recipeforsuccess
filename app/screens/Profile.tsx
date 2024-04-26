import * as React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { clearUser } from '../features/userSlice';
import { auth } from '../../firebase/firebaseConfig';
import Loading from '../components/Loading';

const Profile = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const [isSigningOut, setIsSigningOut] = React.useState(false);

  // ... other code

  const handleSignOut = async () => {
    setIsSigningOut(true); // Set loading state

    try {
      await signOut(auth);
      dispatch(clearUser());
      navigation.navigate("Login")
    } catch (error) {
      console.error(error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <View style={{display: "flex", alignContent: "center", backgroundColor: "#f6e8d3", height: "100%"}}>

      {user && <Text style={styles.text}>{user.firstName} {user.lastName}</Text>}
      <TouchableOpacity
        style={styles.signOutButton}
        onPress={handleSignOut}
        disabled={isSigningOut} // Disable button while signing out
      >
        {isSigningOut ? (
          <Loading/>
        ) : (
          <Text style={styles.buttonText}>Sign Out</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  signOutButton: {
    alignSelf: 'center',
    backgroundColor: '#fc213e',
    width: '30%',
    padding: 10,
    borderRadius: 5,
    margin: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center"
  },
  text: {
    textAlign: "center",
    marginTop: 250,
    fontSize: 26,
    fontWeight: "bold"

  }
})

export default Profile;
