import React, { useState, useCallback } from "react";

import { getHotPost, getNewPost, getBestPost } from './ApiCalls'

let actual_tab = "hot";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export async function refreshNewPosts(UpdateHomePosts) {
  let refreshedPosts = await getNewPost();
  actual_tab = "new";
  UpdateHomePosts(refreshedPosts);
}

export async function refreshHotPosts(UpdateHomePosts) {
  let refreshedPosts = await getHotPost();
  actual_tab = "hot";
  UpdateHomePosts(refreshedPosts);
}

export async function refreshBestPosts(UpdateHomePosts) {
  let refreshedPosts = await getBestPost();
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

  return (onRefresh);
}