import React, { Component } from 'react';
import { Title, Text, Button, Paragraph } from 'react-native-paper';
import { View, Image } from 'react-native';
import FastImage from 'react-native-fast-image'

// DayJS Library

var dayjs = require('dayjs');
var relativeTime = require('dayjs/plugin/relativeTime');
var utc = require('dayjs/plugin/utc');
dayjs.extend(relativeTime);
dayjs.extend(utc);

export default class ImageCard extends Component {
    render() {
        return (
            <View style={{borderRadius: 10, margin: 10, backgroundColor: '#fff', minheight: 150, width: 390}}>
                <FastImage style={{height: 200, width: 390}} source={{ uri: this.props.banner_img }} />
                <View style={{padding: 10}}>
                    <Text style={{fontSize: 15, fontWeight: 'bold',}}>{ this.props.subreddit_name } | u/{ this.props.user_name }</Text>
                    <Text style={{marginBottom: 10,}}>{ dayjs.unix(this.props.time).fromNow() }</Text>
                    <Text style={{fontSize: 18, fontWeight: 'bold',}}>{ this.props.title }</Text>
                </View>
            </View>
        );
    }
}