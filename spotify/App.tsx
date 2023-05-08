import * as React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet
} from 'react-native';
import { Ecouter } from './components/Ecouter';
import { Jouer } from './components/Jouer';
import { ListMusic } from './components/ListMusic';

export default function App(): JSX.Element {
  const styles = StyleSheet.create({
    background: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    titleContainer: {
      backgroundColor: '#B4B2B2',
      alignItems: 'center',
      height: 150,
      justifyContent: 'center',
    },
    titleText: {
      fontSize: 50,
      color: '#fff',
    },
  });
  
  const url =  "https://4048-2001-861-5683-2a60-4cdf-6d33-14a9-44da.ngrok-free.app";
  const [audio, setAudio] = React.useState("");

  const setAudioData = (data: string) => {

  }

  return (
    <SafeAreaView>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}> Spotify </Text>
      </View>
      <View style={styles.background}>
        <Ecouter setAudioData={setAudioData} url={url}/>
        <Jouer url={url}/>
        <ListMusic url={url}/>
      </View>
    </SafeAreaView>
  );
}