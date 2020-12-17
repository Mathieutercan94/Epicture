import {Button, Text, View, AsyncStorage, ImageBackground, StyleSheet} from 'react-native';
import React from 'react';

export default class SettingsScreen extends React.Component {
    disconnect = async () => {
        await AsyncStorage.removeItem('token');
        this.props.changeLog(false);
    };
    
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red'}}>
                <View>
                    <Button onPress={this.disconnect} title="Disconnect"/>
                </View>
            </View>
        );
    }
}
