import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    StatusBar,
} from 'react-native';
import TextComponent from './components/TextComponent';
import IncrementComponent from './components/IncrementComponent';

class App extends React.Component {
    state = {
        count: 0
    }

    handleIncrementButton = () => {
        this.setState({
            count: this.state.count + 2
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content"/>
                <SafeAreaView style={styles.container}>

                    <View style={[styles.top, styles.centerComponents]}>
                        <TextComponent bite={"salut mek"}/>

                        <IncrementComponent tozProps="toz"
                                            caAppuie={this.handleIncrementButton}
                        />
                    </View>
                    <View style={[styles.middle, styles.centerComponents]}>
                        <TextComponent bite={this.state.count}/>
                    </View>
                    <View style={styles.bottom}>
                        <TextComponent bite={"salut mek"}/>
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}



const styles = StyleSheet.create({

    text: {

    },
    centerComponents:{
        justifyContent: "center",
        alignItems: "center"
    },
    top: {
        flex: 3,
        margin: 20,
        backgroundColor: 'green',

    },
    middle: {
        flex: 3,
        margin: 20,
        backgroundColor: 'red',
    },
    bottom: {
        flex: 3,
        margin: 20,
        backgroundColor: 'blue',

    },
    bgRed: {
        backgroundColor: 'red',
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        marginTop: 20,
    },
    welcome: {
        flex: 1,
        margin: 20,
        backgroundColor: 'orange',
        textAlign: 'center',
        fontSize: 20,
        paddingTop: 70,
    },
});
export default App;
