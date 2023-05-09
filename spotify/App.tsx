import * as React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet
} from 'react-native';
import { Ecouter } from './components/Ecouter';
import { Jouer } from './components/Jouer';

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
    text: {
      fontSize: 20,
      marginBottom: 70,
      color: '#000',
    },
  });
  
  const url =  "https://1d13-2001-861-5683-2a60-94c4-305a-74a9-c987.ngrok-free.app";
  const [audio, setAudio] = React.useState("Thunderstruck - ACDC");
  const [action, setActionVariable] = React.useState("play");
  const [spinner, setSpinner] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isInit, setIsInit] = React.useState(true);
  const [newRecord, setNewRecord] = React.useState(false);

  const setAction = (value: any) => {
    setActionVariable(value);
    setNewRecord(true);
  }

  return (
    <SafeAreaView>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}> Spotify </Text>
      </View>
      
      {!spinner ? (
        <View style={styles.background}>
          <Jouer
            setSpinner={setSpinner}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            isInit= {isInit}
            setIsInit= {setIsInit}
            url={url}
            audio={audio}
            action={action}
            setNewRecord={setNewRecord}
            newRecord={newRecord}/>
          <Text style={styles.text}> {audio} </Text>
          <Ecouter setAudio={setAudio} setAction={setAction} url={url}/>
        </View>
      ) : (
        <Text> Chargement ... </Text>
      )}
    </SafeAreaView>
  );
}