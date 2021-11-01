import React, { useState, useCallback } from "react";
import { Title, Text, Button, Avatar, Subheading, Divider, Provider as PaperProvider } from 'react-native-paper';
import { RefreshControl, View, Alert, Image, ScrollView } from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons';

import ImageCard from './../components/ImageCard';
import TextCard from './../components/TextCard';
import VideoCard from './../components/VideoCard';

import { refreshSubbedList, subscribeSubreddit, unsubscribeSubreddit } from './LoginScreen'
import { searchedSubreddit, firsthot, subredditName, subscribedPosts } from './SearchScreen';
import { refreshHandling, refreshNewPosts, refreshHotPosts, refreshBestPosts } from './../src/SubredditRefreshHandling';

function isSubbedTo(subbedList) {
  if (subbedList.search(searchedSubreddit.display_name) >= 0)
    return(true);
  else
    return(false);
}

async function fetchMore(UpdateHomePosts, HomePosts)
{
  let test = await HomePosts.fetchMore({amount: 5});
  UpdateHomePosts(test);
}

async function subToSubreddit(subredditName, UpdateSubbedList, UpdateIsSubbed, UpdateFollowers, followers) {
  let test = await subscribeSubreddit(subredditName);
  let newList = await refreshSubbedList();
  let stringifiedNewList = JSON.stringify(newList);
  UpdateIsSubbed(isSubbedTo(stringifiedNewList));
  UpdateFollowers(followers + 1);
}

async function unsubToSubreddit(subredditName, UpdateSubbedList, UpdateIsSubbed, UpdateFollowers, followers) {
  let test = await unsubscribeSubreddit(subredditName);
  let newList = await refreshSubbedList();
  let stringifiedNewList = JSON.stringify(newList);
  UpdateSubbedList(stringifiedNewList);
  UpdateIsSubbed(isSubbedTo(stringifiedNewList));
  UpdateFollowers(followers - 1);
}

export default function SubredditScreen({ navigation }) {
    const [subbedList, UpdateSubbedList] = useState(JSON.stringify(subscribedPosts));
    const [isSubbed, UpdateIsSubbed] = useState(isSubbedTo(subbedList));
    const [HomePosts, UpdateHomePosts] = useState(firsthot);
    const [playing, setPlaying] = useState(false);
    const [followers, UpdateFollowers] = useState(searchedSubreddit.subscribers);
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = refreshHandling(UpdateHomePosts, setRefreshing);

    const onStateChange = useCallback((state) => {
    if (state === "ended") {
        setPlaying(false);
        Alert.alert("video has finished playing!");
        }
    }, []);

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
    };

    return (
        <ScrollView onScroll={({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent)) {
                fetchMore(UpdateHomePosts, HomePosts);
            }
        }}
        scrollEventThrottle={400}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
          {(searchedSubreddit.banner_background_image == '')
              ? <View style={{flex: 1, top: -20, backgroundColor: '#130f40', width: 420, height: 150}}></View>
              : <Image style={{width: 420, height: 120}} source={{uri: searchedSubreddit.banner_background_image}}></Image>
          }
          <View style={{alignItems: 'center', flex: 1, top: -40}}>
              {(searchedSubreddit.community_icon == '')
                  ? <Avatar.Text style={{top: -10,}} size={85} label={subredditName.slice(0, 2)} />
                  : <Avatar.Image style={{top: -10,}} size={85} source={{uri: searchedSubreddit.community_icon}}/>
              }
              <Title style={{}}>{searchedSubreddit.title}</Title>
              <Subheading style={{margin: 10, alignItems: 'center'}}>{searchedSubreddit.public_description}</Subheading>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', top: 10}}>
                  {(isSubbed === true)
                      ? <Button mode="contained" onPress={() => {unsubToSubreddit(subredditName, UpdateSubbedList, UpdateIsSubbed, UpdateFollowers, followers);}} style={{backgroundColor: '#130f40', top: 10}}><Ionicons name="remove-circle-outline" size={20} /> UnSubscribe</Button>
                      : <Button mode="contained" onPress={() => {subToSubreddit(subredditName, UpdateSubbedList, UpdateIsSubbed, UpdateFollowers, followers);}} style={{backgroundColor: '#130f40', top: 10}}><Ionicons name="add-circle-outline" size={20} /> Subscribe</Button>
                  }
                  <Subheading style={{alignItems: 'center', top: 10, left: 20,}}>{followers} Subscribers</Subheading>
              </View>
          </View>
          <Divider style={{backgroundColor: '#130f40'}} />
          <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center', top: 20}}>
              <Button mode="contained" onPress={() => {refreshHotPosts(UpdateHomePosts, subredditName);}} style={{backgroundColor: '#130f40', right: 30}}>Hot</Button>
              <Button mode="contained" onPress={() => {refreshNewPosts(UpdateHomePosts, subredditName);}} style={{backgroundColor: '#130f40'}}>New</Button>
              <Button mode="contained" onPress={() => {refreshBestPosts(UpdateHomePosts, subredditName);}} style={{backgroundColor: '#130f40', left: 30}}>Best</Button>
          </View>
          {HomePosts.map((Post, key) =>
              <View key={key} style={{alignItems: 'center', top: 20}}>
              {(Post.url.slice(Post.url.length - 3, Post.url.length) == 'png' || Post.url.slice(Post.url.length - 3, Post.url.length) == 'jpg' || Post.url.slice(Post.url.length - 3, Post.url.length) == 'gif')
                ? <ImageCard time={Post.created} banner_img={Post.url} subreddit_name={Post.subreddit_name_prefixed} user_name={Post.author.name} title={Post.title} />
                : (Post.url.search('youtube') >= 0 || Post.url.search('youtu.be') >= 0)
                ? <VideoCard onStateChange={onStateChange} playing={playing} time={Post.created} video_id={Post.url} subreddit_name={Post.subreddit_name_prefixed} user_name={Post.author.name} title={Post.title} />
                : <TextCard url={Post.url} time={Post.created} text={Post.selftext} subreddit_name={Post.subreddit_name_prefixed} user_name={Post.author.name} title={Post.title} />
              }
              </View>
            )}
        </ScrollView>
    );
}