import {ScrollView, Text, View} from 'react-native';
import React from 'react';
import {SearchBar} from 'react-native-elements';
import SearchComponent from './SearchComponent';

class SearchScreen extends React.Component {
    state = {
        search: "",
    };

    updateSearch = (search) => {
        this.setState({
            search: search
        });
    };

    render() {
        const {search} = this.state;
        return (
            <View>
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={search}/>
                <SearchComponent search={search}/>
            </View>
        );
    }
}

export default SearchScreen;
