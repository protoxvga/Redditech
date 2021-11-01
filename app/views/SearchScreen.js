import React, { useState } from "react";
import { TextInput, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { View } from "react-native";

import { getFirstHotsPubs, searchSubreddit, refreshSubbedList } from './LoginScreen'

let subscribedPosts, searchedSubreddit, firsthot, subredditName;

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#130f40',
    accent: '#130f40',
  },
};

async function SubmitSearch(text, { navigation }) {
  searchedSubreddit = await searchSubreddit(text);
  if (typeof searchedSubreddit != "undefined") {
    firsthot = await getFirstHotsPubs(text);
    subredditName = text;
    subscribedPosts = await refreshSubbedList();
    navigation.navigate('Subreddit');
  }
}

export default function Search({ navigation }) {
  const [text, setText] = React.useState('');

  return (
      <View style={{flex: 1, top: 210, margin: 20,}}>
        <PaperProvider theme={theme}>
            <TextInput mode="outlined" selectionColor='#130f40' underlineColor='#130f40' outlineColor='#130f40' label="Search Subreddit" value={text} onChangeText={text => setText(text)} onSubmitEditing={() => {SubmitSearch(text, { navigation });}}/>
        </PaperProvider>
      </View>
  );
}

export {searchedSubreddit};
export {firsthot};
export {subredditName};
export {subscribedPosts};