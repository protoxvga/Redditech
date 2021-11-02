import React, { useState, useCallback, useRef } from "react";
import { View } from 'react-native';
import { Title, Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Login } from './../src/ApiCalls'

export default function LoginScreen({ navigation }) {
  return (
    <View style={{ alignItems: 'center', top: 100}}>
      <Title style={{fontSize: 30, top: 30}}>ReddiTech</Title>
      <Title style={{top: 150, fontSize: 25}}>Connection</Title>
      <Button mode="contained" onPress={() => {Login({ navigation });}} style={{backgroundColor: '#130f40', top: 180}}><Ionicons name="logo-reddit" size={20} /> Link my reddit account</Button>
    </View>
  );
}