import React from 'react';
import LoginComponent from './components/LoginComponent';
import SearchScreen from './components/Search';
import SettingsScreen from './components/Settings';
import HomeScreen from './components/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

class App extends React.Component {
    state = {
        isLog: false,
    };

    changeIsLog = (bool) => {
        this.setState({
            isLog: bool,
        });
    };

    render() {
        if (this.state.isLog === false) {
            return <LoginComponent changeLog={this.changeIsLog}/>;
        } else {
            return (
                <NavigationContainer>
                    <Tab.Navigator>
                        <Tab.Screen name="Home" component={HomeScreen}/>
                        <Tab.Screen name="Disconnect" component={() => <SettingsScreen changeLog={this.changeIsLog}/>}/>
                        <Tab.Screen name="Search" component={SearchScreen}/>
                    </Tab.Navigator>
                </NavigationContainer>
            );
        }
    }
}

export default App;
