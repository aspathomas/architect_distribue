import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Pressable, Image, StyleSheet } from 'react-native';

export function Jouer(): JSX.Element {

  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);

    const requestOptions = {
      method: 'GET'
    };
    fetch('http://127.0.0.1:5000/get', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }

  const styles = StyleSheet.create({
    logo: {
      height: 100,
      width: 100,
      backgroundColor: '#B4B2B2'
    },
  });

  return (
    <View style={{ flex: 1 }}>
      {isPlaying ? (
        <Pressable onPress={togglePlay}>
          <Image style={styles.logo} source={require('../images/stop.png')} />
        </Pressable>
      ) : (
        <Pressable onPress={togglePlay}>
          <Image style={styles.logo} source={require('../images/play.png')} />
        </Pressable>
      )}
    </View>
  );
};