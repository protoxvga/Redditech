import React, { useState, useCallback } from "react";

import { getSubredditHotPost, getSubredditNewPost, getSubredditBestPost } from './../views/LoginScreen'

let actual_tab = "hot";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export async function refreshHotPosts(UpdateHomePosts, subredditName) {
  let refreshedPosts = await getSubredditHotPost(subredditName);
  actual_tab = "hot";
  UpdateHomePosts(refreshedPosts);
}

export async function refreshNewPosts(UpdateHomePosts, subredditName) {
  let refreshedPosts = await getSubredditNewPost(subredditName);
  actual_tab = "new";
  UpdateHomePosts(refreshedPosts);
}

export async function refreshBestPosts(UpdateHomePosts, subredditName) {
  let refreshedPosts = await getSubredditBestPost(subredditName);
  actual_tab = "best";
  UpdateHomePosts(refreshedPosts);
}

export function refreshHandling(UpdateHomePosts, setRefreshing) {
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (actual_tab == "hot")
      refreshHotPosts(UpdateHomePosts);
    else if (actual_tab == "new")
      refreshNewPosts(UpdateHomePosts);
    else
      refreshBestPosts(UpdateHomePosts);
    wait(2000).then(() => setRefreshing(false));
  }, []);
}