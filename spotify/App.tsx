/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import {
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { Ecouter } from './components/Ecouter';
import { Jouer } from './components/Jouer';

export default function App(): JSX.Element {
  const BackgroundStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  };

  const TitreStyle = {
    backgroundColor: '#B4B2B2',
    alignItems: 'center',
    height: 150,
    justifyContent: 'center'
  };
  
  const PoliceStyle = {
    backgroundColor: '#B4B2B2',
    fontSize: 50,
    fontColor: '#fff'
  };
  

  const [audio, setAudio] = React.useState("");

  const setAudioData = (data: string) => {

  }

  return (
    <SafeAreaView>
      <View style={TitreStyle}>
        <Text style={PoliceStyle}> Spotify </Text>
      </View>
      <View style={BackgroundStyle}>
        <Ecouter setAudioData={setAudioData}/>
        <Jouer/>
      </View>
    </SafeAreaView>
  );
}
