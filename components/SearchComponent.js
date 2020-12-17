import {Image, ScrollView} from 'react-native';
import React from 'react';
import LikeComponents from './LikeComponents';

export default class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        images: null,
        array: null,
    };

    async componentDidUpdate(prevProps) {
        if (this.props.search && this.props.search !== prevProps.search) {
            const myHeaders = new Headers();
            let url = '';
            let res = [];
            let i = 0;

            myHeaders.append('Authorization', 'Client-ID 00d22fd0ab51572');
            const result = await fetch(url.concat('https://api.imgur.com/3/gallery/search/%7B%7Bsort%7D%7D/%7B%7Bwindow%7D%7D/%7B%7Bpage%7D%7D?q=', this.props.search)
                , {
                    method: 'GET',
                    headers: myHeaders,
                });
            const json = await result.json();
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
    }

    render() {
        if (this.props.search) {
            if (!!(this.state.images) && this.state.array) {
                const imagesDiv = this.state.array.map((img, k) => <LikeComponents k={k} img={img.link} id={img.id}
                                                                                   image={img}/>);
                return (
                    <ScrollView>
                        {imagesDiv}
                    </ScrollView>
                );
            } else {
                return (<Image
                    source={{uri: 'https://cdn.discordapp.com/attachments/628569352412594205/769328275687735316/image1.jpg'}}
                    style={{width: 420, height: 800}}/>);
            }
        } else {
            return (<Image
                source={{uri: 'https://cdn.discordapp.com/attachments/628569352412594205/769328275687735316/image1.jpg'}}
                style={{width: 420, height: 800}}/>);
        }
    }
}
