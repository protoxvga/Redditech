
import React from "react";
import { Title, Button, Avatar, Subheading } from 'react-native-paper';

import { View, Alert, Image } from "react-native";

import ProfileSettingsScreen from './ProfileSettingsScreen'

import { result_json, userInfo, public_description, userSettings } from './../src/ApiCalls'

export default function Profile({ navigation }) {
    return (
        <View>
            {(userInfo.banner_img == '')
                ? <View style={{ flex: 1, top: -20, backgroundColor: '#130f40', width: 420, height: 150 }}></View>
                : <Image style={{ width: 420, height: 120 }} source={{ uri: userInfo.subreddit.display_name.banner_img }}></Image>
            }
            <View style={{alignItems: 'center'}}>
                <Avatar.Image size={80} style={{top: -50,}} source={{uri: userInfo.icon_img}} />
                <Title style={{top: -40,}}>{userInfo.name}</Title>
                <Subheading style={{top: -40,}}>{userInfo.subreddit.display_name.public_description}</Subheading>
                <Subheading style={{top: -45,}}>{userInfo.subreddit.display_name.subscribers} Followers</Subheading>
                <Button mode="contained" style={{backgroundColor: '#130f40', top: 300}} onPress={() => {navigation.navigate('Profile Settings')}}>Settings</Button>
            </View>
        </View>
    );
}