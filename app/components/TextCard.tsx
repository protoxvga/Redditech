import React, { Component } from 'react';
import { Title, Text, Button, Paragraph } from 'react-native-paper';
import { View, Image, Linking } from 'react-native';

// DayJS Library

var dayjs = require('dayjs');
var relativeTime = require('dayjs/plugin/relativeTime');
var utc = require('dayjs/plugin/utc');
dayjs.extend(relativeTime);
dayjs.extend(utc);

export default class TextCard extends Component {
    render() {
        return (
            <View style={{borderRadius: 10, margin: 10, padding: 10, backgroundColor: '#fff', minheight: 150, width: 390}}>
                <Text style={{fontSize: 15, fontWeight: 'bold',}}>{ this.props.subreddit_name } | u/{ this.props.user_name }</Text>
                <Text style={{marginBottom: 10,}}>{ dayjs.unix(this.props.time).fromNow() }</Text>
                <Text style={{fontSize: 18, fontWeight: 'bold',}}>{ this.props.title }</Text>
                {(this.props.text != "")
                    ? <Text style={{marginTop: 10, fontSize: 15}}>{this.props.text.substr(0, 200)}... </Text>
                    : <Text style={{color: 'blue', fontSize: 15, marginTop: 10}} onPress={() => Linking.openURL(this.props.url)}>{this.props.url.substr(0, 100)}...</Text>
                }
            </View>
        );
    }
}