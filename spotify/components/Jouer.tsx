import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Pressable, Image, StyleSheet } from 'react-native';

export function Jouer({ url }: { url: string }, { name }: { name: string }): JSX.Element {

  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);

    const requestOptions = {
      method: 'GET'
    };
    if (isPlaying) {
      fetch(`${url}/play/${name}`, requestOptions)
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
    } else {
      fetch(`${url}/pause`, requestOptions)
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