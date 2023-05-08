import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Pressable, Image, StyleSheet } from 'react-native';

export function Jouer({ url }: { url: string }): JSX.Element {

  const [isPlaying, setIsPlaying] = useState(false);
  const [isInit, setIsInit] = useState(true);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);

    const requestOptions = {
      method: 'GET'
    };
    if (isInit) {
      fetch(`${url}/play/Thunderstruck - ACDC`, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          setIsInit(false);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    } else {
      if (!isPlaying) {
        fetch(`${url}/play`, requestOptions)
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
  }

  const stop = () => {
    const requestOptions = {
      method: 'GET'
    };
    fetch(`${url}/stop"`, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      setIsInit(true);
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
  }

  const styles = StyleSheet.create({
    logo: {
      height: 100,
      width: 100,
      backgroundColor: '#fff'
    },
  });

  return (
    <View>
      {isPlaying ? (
        <Pressable onPress={togglePlay}>
          <Image style={styles.logo} source={require('../images/pause.png')} />
        </Pressable>
      ) : (
        <Pressable onPress={togglePlay}>
          <Image style={styles.logo} source={require('../images/play.png')} />
        </Pressable>
      )}
      <Pressable onPress={stop}>
        <Image style={styles.logo} source={require('../images/stop.png')} />
      </Pressable>
    </View>
  );
};