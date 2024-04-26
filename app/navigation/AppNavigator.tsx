import * as React from 'react';
import { Image } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Saved from '../screens/Saved';
import Profile from '../screens/Profile';

const Tab = createMaterialBottomTabNavigator();

const AppNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#f59002"
            inactiveColor='#0f6374'
            barStyle={{ backgroundColor: '#f6e8d3' }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        focused ? <Image source={require('../../assets/home-selected.png')} style={{ width: 20, height: 20 }} /> :
                            <Image source={require('../../assets/home-unselected.png')} style={{ width: 20, height: 20 }} />
                    ),
                }}
            />
            
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color, focused }) => (
                        focused ? <Image source={require('../../assets/search-selected.png')} style={{ width: 20, height: 20 }} /> :
                            <Image source={require('../../assets/search-unselected.png')} style={{ width: 20, height: 20 }} />
                    ),
                }}
            />
            <Tab.Screen
                name="Saved"
                component={Saved}
                options={{
                    tabBarLabel: 'Saved',
                    tabBarIcon: ({ color, focused }) => (
                        focused ? <Image source={require('../../assets/bookmark-selected.png')} style={{ width: 20, height: 20 }} /> :
                            <Image source={require('../../assets/bookmark-unselected.png')} style={{ width: 20, height: 20 }} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, focused }) => (
                        focused ? <Image source={require('../../assets/profile-selected.png')} style={{ width: 20, height: 20 }} /> :
                            <Image source={require('../../assets/profile-unselected.png')} style={{ width: 20, height: 20 }} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default AppNavigator;
