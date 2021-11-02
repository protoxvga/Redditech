import React, { useState, useCallback, useRef } from "react";
import Auth from './Auth'
import { CLIENT_ID } from '@env';

const snoowrap = require('snoowrap');

let result_json, reddit, userInfo, hotPosts, firstPosts, subscriptionList, fetMoreValueHot, userSettings;

//Initialise the APP requirements

export function getFirstHotsPubs(text)
{
  let result = reddit.getSubreddit(text).getHot({limit: 15});
  return (result);
}

export function searchSubreddit(text)
{
  let result = reddit.getSubreddit(text).fetch().catch((error) => {Alert.alert("Can't find this subreddit","Please try again",[{ text: "OK",}]);});
  return (result);
}

// Subreddit subscribe and unsubscribe methods

export function subscribeSubreddit(text)
{
  return (reddit.getSubreddit(text).subscribe());
}

export function unsubscribeSubreddit(text)
{
  return (reddit.getSubreddit(text).unsubscribe());
}

// refresh post from subreddits

export function getSubredditHotPost(text)
{
  let result = reddit.getSubreddit(text).getHot({limit: 15});
  return (result);
}

export function getSubredditNewPost(text)
{
  let result = reddit.getSubreddit(text).getNew({limit: 15});
  return (result);
}

export function getSubredditBestPost(text)
{
  let result = reddit.getSubreddit(text).getTop({limit: 15});
  return (result);
}

//General Posts Filters

export function getHotPost()
{
  let notmapped = reddit.getHot({limit: 25});
  return (notmapped);
}

export function getNewPost()
{
  let notmapped = reddit.getNew({limit: 25});
  return (notmapped);
}

export function getBestPost()
{
  let notmapped = reddit.getBest({limit: 25});
  return (notmapped);
}

export function refreshSubbedList()
{
  let newList = reddit.getSubscriptions().map(post => post.display_name);
  return(newList);
}

//Login part

export async function Login({ navigation }) {
  result_json = await Auth();

  reddit = await new snoowrap({
      userAgent: '',
      clientId: CLIENT_ID,
      clientSecret: '',
      refreshToken: result_json.refreshToken
  });

  reddit._nextRequestTimestamp = -1;
  userInfo = await reddit.getMe();
  hotPosts = await getHotPost();
  userSettings = await reddit.getPreferences();
  navigation.navigate('Home');
}

export {result_json};
export {userInfo};
export {hotPosts};
export {firstPosts};
export {userSettings};