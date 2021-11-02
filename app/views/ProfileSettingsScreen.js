import React, { useState } from "react";
import { Title, Subheading, Divider } from 'react-native-paper';
import { View } from "react-native";
import { userSettings } from './../src/ApiCalls'

export default function ProfileSettingsScreen({ navigation }) {
    const [userSettingsList, UpdateUserSettingsList] = React.useState(userSettings);

    return (
        <View style={{margin: 20}}>
            <View style={{marginBottom: 20}}>
                <Title>Your country code</Title>
                <Subheading>{userSettingsList.country_code}</Subheading>
            </View>
            <Divider style={{backgroundColor: '#130f40'}}/>
            <View style={{marginBottom: 20}}>
                <Title>Reddit language</Title>
                <Subheading>{userSettingsList.lang}</Subheading>
            </View>
            <Divider style={{backgroundColor: '#130f40'}}/>
            <View style={{marginBottom: 20}}>
                <Title>+ 18 yo content</Title>
                {(userSettingsList.over_18 === true)
                    ? <Subheading>True</Subheading>
                    : <Subheading>False</Subheading>
                }
            </View>
            <Divider style={{backgroundColor: '#130f40'}}/>
            <View style={{marginBottom: 20}}>
                <Title>Label nsfw ?</Title>
                {(userSettingsList.label_nsfw === true)
                    ? <Subheading>True</Subheading>
                    : <Subheading>False</Subheading>
                }
            </View>
            <Divider style={{backgroundColor: '#130f40'}}/>
            <View style={{marginBottom: 20}}>
                <Title>Bad comments autocollapse</Title>
                {(userSettingsList.bad_comment_autocollapse === true)
                    ? <Subheading>True</Subheading>
                    : <Subheading>False</Subheading>
                }
            </View>
            <Divider style={{backgroundColor: '#130f40'}}/>
            <View style={{marginBottom: 20}}>
                <Title>Beta mode</Title>
                {(userSettingsList.beta === true)
                    ? <Subheading>True</Subheading>
                    : <Subheading>False</Subheading>
                }
            </View>
        </View>
    );
}