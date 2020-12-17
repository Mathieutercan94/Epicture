import {Button, View} from 'react-native';
import React from 'react';
import GetImage from './GetImage';

export default class HomeScreen extends React.Component {

    state = {
        count: 0
    }

    render() {

        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <GetImage/>
            </View>
        );
    }
}


