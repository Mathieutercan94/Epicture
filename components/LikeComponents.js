import React from 'react';
import {Image, View, Button, AsyncStorage, Text} from 'react-native';
import {SearchBar} from 'react-native-elements';
import SearchComponent from './SearchComponent';
import CommentBar from './CommentBar';

export default class LikeComponents extends React.Component {
    constructor(props) {
        super(props);
        this.setState({
            props: props,
        });
    }

    state = {
        props: null,
        up: false,
        prev_up: false,
        down: false,
        prev_down: false,
        search: '',
    };

    async componentDidUpdate(prevProps) {
        let access_token = await AsyncStorage.getItem('token');

        if (this.state.up === true && this.state.prev_up === false) {
            this.setState({
                prev_up: true,
            });
            const myHeaders = new Headers();
            let url = 'https://api.imgur.com/3/gallery/' + this.props.id + '/vote/up';
            myHeaders.append('Authorization', 'Bearer ' + access_token);
            const t = await fetch(url
                , {
                    method: 'POST',
                    headers: myHeaders,
                });
        }

        if (this.state.down === true && this.state.prev_down === false) {
            this.setState({
                prev_down: true,
            });
            const myHeaders = new Headers();
            let url = 'https://api.imgur.com/3/gallery/' + this.props.id + '/vote/down';
            myHeaders.append('Authorization', 'Bearer ' + access_token);
            const t = await fetch(url
                , {
                    method: 'POST',
                    headers: myHeaders,
                });
        }
    }

    voteup = () => {
        this.setState({
            up: true,
            down: false,
        });
    };

    updateSearch = (search) => {
        this.setState({
            search: search,
        });
    };

    votedown = () => {
        this.setState({
            down: true,
            up: false,
        });
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: "red"}}>
                <View>
                    <Image key={this.props.k} source={{uri: this.props.img}}
                           style={{width: 410, height: 410}}/>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{width: 200, height: 50}}>
                        <Button title="like" onPress={this.voteup}/>
                    </View>
                    <View style={{width: 200, height: 50, backgroundColor: 'skyblue'}}>
                        <Button title="dislike" onPress={this.votedown}/>
                    </View>
                </View>
                <View>
                    <CommentBar id={this.props.id}/>
                </View>
            </View>
        );
    }
}
