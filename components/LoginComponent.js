import React from 'react';
import {WebView} from 'react-native-webview';
import {AsyncStorage} from 'react-native';

const RCTNetworking = require('react-native/Libraries/Network/RCTNetworking');

export default class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        RCTNetworking.clearCookies(() => {
        });
    }

    async componentDidMount() {
        const token = await AsyncStorage.getItem('token');
        const client_id = await AsyncStorage.getItem("client_id");
        if (client_id === null) {
            await AsyncStorage.setItem('client_id', '00d22fd0ab51572');
        }
        if (token !== null) {
            this.props.changeLog(true);
        }
    }

    handleNavigation = async (e) => {
        const url = e.url;
        const fields = url.split('=');
        const access_token = fields[1].split('&');
        if (e.url.search('access_token') !== -1) {
            await AsyncStorage.setItem('token', access_token[0]);
            this.props.changeLog(true);
        }
        return (0);
    };
    render() {
        return (
            <WebView
                ref="webview"
                source={{uri: 'https://api.imgur.com/oauth2/authorize?client_id=00d22fd0ab51572&response_type=token'}}
                onNavigationStateChange={this.handleNavigation}
            />
        );
    }
}
