import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './app/App';
import 'react-native-gesture-handler';

import {decode, encode} from 'base-64'

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}

AppRegistry.registerComponent(appName, () => App);
