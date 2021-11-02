import React, { useState, useCallback } from "react";

import { Title, Text, Button } from 'react-native-paper';

import { RefreshControl, SafeAreaView, View, Image, Alert, ScrollView } from 'react-native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import ImageCard from './../components/ImageCard';
import TextCard from './../components/TextCard';
import VideoCard from './../components/VideoCard';

import Profile from './ProfileScreen'
import Search from './SearchScreen'

import { refreshHandling, refreshNewPosts, refreshHotPosts, refreshBestPosts } from './../src/HomeRefreshHandling';

import { hotPosts } from './../src/ApiCalls'

const Tab = createMaterialBottomTabNavigator();

async function fetchMore(UpdateHomePosts, HomePosts)
{
  let test = await HomePosts.fetchMore({amount: 5});
  UpdateHomePosts(test);
}

function HomeScreen({ navigation }) {
  const [HomePosts, UpdateHomePosts] = useState(hotPosts);            // Post of the home page -> Default is the first getHotPost()
  const [refreshing, setRefreshing] = React.useState(false);          // Up page refresh handling
  const onRefresh = refreshHandling(UpdateHomePosts, setRefreshing);  // Top Refresh handling (src/HomeRefreshHandling.js)
  
  const [playing, setPlaying] = useState(false);                      // UseState for The youtube video playing

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView onScroll={({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent)) {
          fetchMore(UpdateHomePosts, HomePosts);
        }
      }}
      scrollEventThrottle={400}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={{flexDirection: 'row', justifyContent: 'center', top: 5}}>
        <Button mode="contained" onPress={() => {refreshHotPosts(UpdateHomePosts);}} style={{backgroundColor: '#130f40', right: 30}}>Hot</Button>
        <Button mode="contained" onPress={() => {refreshNewPosts(UpdateHomePosts);}} style={{backgroundColor: '#130f40'}}>New</Button>
        <Button mode="contained" onPress={() => {refreshBestPosts(UpdateHomePosts);}} style={{backgroundColor: '#130f40', left: 30}}>Best</Button>
      </View>
      {HomePosts.map((Post, key) =>
        <View key={key} style={{alignItems: 'center', top: 10}}>
          {(Post.url.slice(Post.url.length - 3, Post.url.length) == 'png' || Post.url.slice(Post.url.length - 3, Post.url.length) == 'jpg' || Post.url.slice(Post.url.length - 3, Post.url.length) == 'gif')
            ? <ImageCard time={Post.created} banner_img={Post.url} subreddit_name={Post.subreddit_name_prefixed} user_name={Post.author.name} title={Post.title} />
            : (Post.url.search('youtube') >= 0 || Post.url.search('youtu.be') >= 0)
            ? <VideoCard onStateChange={onStateChange} playing={playing} time={Post.created} video_id={Post.url} subreddit_name={Post.subreddit_name_prefixed} user_name={Post.author.name} title={Post.title} />
            : <TextCard time={Post.created} text={Post.selftext} subreddit_name={Post.subreddit_name_prefixed} url={Post.url} user_name={Post.author.name} title={Post.title} />
          }
        </View>
      )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default function HomeScreenNav({ navigation }) {
  return (
    <Tab.Navigator barStyle={{backgroundColor: '#130f40'}} >
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{tabBarLabel: 'Home', tabBarIcon: () => (<Ionicons name="home-outline" color="#FFF" size={25} />),}} />
      <Tab.Screen name="Profile" component={Profile} options={{tabBarLabel: 'Profile', tabBarIcon: () => (<Ionicons name="person-outline" color="#FFF" size={25} />),}} />
      <Tab.Screen name="Search" component={Search} options={{tabBarLabel: 'Search', tabBarIcon: () => (<Ionicons name="search-outline" color="#FFF" size={25} />),}} />
    </Tab.Navigator>
  );
}