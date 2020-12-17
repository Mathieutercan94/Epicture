import React from 'react';
import {ScrollView, Animated, Image, Easing, View, StyleSheet, Text} from 'react-native';
import LikeComponents from './LikeComponents';

export default class GetImage extends React.Component {
    constructor(props) {
        super(props);
        this.spinValue = new Animated.Value(0);
    }

    state = {
        images: null,
        array: null,
    };
    spin() {
        this.spinValue.setValue(0);
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 4000,
                easing: Easing.linear,
            },
        ).start(() => this.spin());
    }

    async componentDidMount() {
        this.spin();
        const myHeaders = new Headers();
        let i = 0;
        let res = [];
        //
        myHeaders.append('Authorization', 'Client-ID 00d22fd0ab51572');
        const result = await fetch('https://api.imgur.com/3/gallery/hot/viral/day/1', {
            method: 'GET',
            headers: myHeaders,
        })
        const json =  await result.json();
        this.setState({
            images: json.data,
        });
        while (i !== this.state.images.length) {
            if (this.state.images[i].images && this.state.images[i].images[0].link &&
                this.state.images[i].images[0].link.endsWith('.jpg')) {
                res.push({link: this.state.images[i].images[0].link, id: this.state.images[i].id});
            }
            i++;
        }
        this.setState({
            array: res,
        });
    }

    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
        });
        if (!!(this.state.images) && this.state.array) {
            const imagesDiv = this.state.array.map((img, k) => <LikeComponents k={k} img={img.link} id={img.id} image={img}/>);

            return (
                <ScrollView>
                    <Image
                        source={{uri: 'https://media.discordapp.net/attachments/628569352412594205/769276082582847498/image0.jpg?width=238&height=489'}}
                        style={{width: 420, height: 800}}/>
                    {imagesDiv}
                </ScrollView>
            );

        } else {
            return (
                <View style={styles.container}>
                    <Animated.Image
                        style={{
                            width: 227,
                            height: 200,
                            transform: [{rotate: spin}],
                        }}
                        source={{uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png'}}/>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
