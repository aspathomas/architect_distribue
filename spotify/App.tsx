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
  
  const url =  "https://b682-2001-861-5683-2a60-1445-d9dc-5c63-9917.ngrok-free.app";
  const [audio, setAudio] = React.useState("Thunderstruck - ACDC");
  const [spinner, setSpinner] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isInit, setIsInit] = React.useState(true);

  return (
    <SafeAreaView>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}> Spotify </Text>
      </View>
      
      {!spinner ? (
        <View style={styles.background}>
          <Ecouter setAudio={setAudio} url={url}/>
          <Jouer
            setSpinner={setSpinner}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            isInit= {isInit}
            setIsInit= {setIsInit}
            url={url}
            audio={audio}/>
          <Text> {audio} </Text>
        </View>
      ) : (
        <Text> Chargement ... </Text>
      )}
    </SafeAreaView>
  );
}