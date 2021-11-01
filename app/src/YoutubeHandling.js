import React, { useState, useCallback } from "react";

export const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
}, []);

export const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
}, []);