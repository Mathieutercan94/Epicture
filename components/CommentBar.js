import React from 'react';
import {SearchBar} from 'react-native-elements';
import {AsyncStorage, Button, View} from 'react-native';


export default class CommentBar extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        search: '',
    };

    send = async () => {
        if (this.state.search) {
            let access_token = await AsyncStorage.getItem('token')
            const myHeaders = new Headers();
            var formdata = new FormData();
            let url = "https://api.imgur.com/3/comment";

            myHeaders.append('Authorization', 'Bearer ' + access_token);
            formdata.append("image_id", this.props.id);
            formdata.append("comment", this.state.search);
            const t = await fetch(url
                , {
                    method: 'POST',
                    headers: myHeaders,
                    body: formdata,
                    redirect: 'follow',
                });
        }
    }
    updateSearch = (search) => {
        this.setState({
            search: search
        });
    };

    render() {
        const {search} = this.state;
        return (<View>
                <SearchBar
                    placeholder="Comment here"
                    onChangeText={this.updateSearch}
                    value={search}/>
                <Button title={"send"} onPress={this.send}/>
            </View>
        );
    }
}
