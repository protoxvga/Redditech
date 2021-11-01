import React, { Component } from 'react';
import { Title, Text, Button, Paragraph } from 'react-native-paper';
import { View, Image } from 'react-native';

import YoutubePlayer from "react-native-youtube-iframe";

// DayJS Library

var dayjs = require('dayjs');
var relativeTime = require('dayjs/plugin/relativeTime');
var utc = require('dayjs/plugin/utc');
dayjs.extend(relativeTime);
dayjs.extend(utc);

function YouTubeGetID(url){
  var ID = '';
  url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  } else {
    ID = url;
  }
  return ID;
}

export default class VideoCard extends Component {
    render() {
        return (
            <View style={{borderRadius: 10, margin: 10, backgroundColor: '#fff', minheight: 150, width: 390}}>
                <YoutubePlayer height={211} play={this.props.playing} webViewStyle={ {opacity:0.99} } videoId={YouTubeGetID(this.props.video_id)} onChangeState={this.props.onStateChange}/>
                <View style={{padding: 10}}><Text style={{fontSize: 15, fontWeight: 'bold',}}>{ this.props.subreddit_name } | u/{ this.props.user_name }</Text>
                    <Text style={{marginBottom: 10,}}>{ dayjs.unix(this.props.time).fromNow() }</Text>
                    <Text style={{fontSize: 18, fontWeight: 'bold',}}>{ this.props.title }</Text>
                </View>
            </View>
        );
    }
}