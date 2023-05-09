import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Pressable, Image, StyleSheet } from 'react-native';

export function Jouer(props: any): JSX.Element {
  const { url, setSpinner, isPlaying, setIsPlaying, isInit, setIsInit, audio} = props;


  const togglePlay = () => {
    setSpinner(true);

    const requestOptions = {
      method: 'GET'
    };
    if (isInit) {
      fetch(`${url}/play/${audio}`, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response;
        })
        .then(data => {
          console.log(data);
          setIsInit(false);
          setSpinner(false);
          setIsPlaying(true);
        })
        .catch(error => {
          console.error('There was an error!', error);
          setSpinner(false);
        });
    } else {
      if (!isPlaying) {
        fetch(`${url}/play`, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response;
        })
        .then(data => {
          console.log(data);
          setSpinner(false);
          setIsPlaying(true);
        })
        .catch(error => {
          console.error('There was an error!', error);
          setSpinner(false);
        });
      } else {
        fetch(`${url}/pause`, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response;
        })
        .then(data => {
          console.log(data);
          setSpinner(false);
          setIsPlaying(false);
        })
        .catch(error => {
          console.error('There was an error!', error);
          setSpinner(false);
        });
      }
    }
  }

  const stop = () => {
    setSpinner(true);
    const requestOptions = {
      method: 'GET'
    };
    fetch(`${url}/stop`, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    })
    .then(data => {
      console.log(data);
      setIsInit(true);
      setSpinner(false);
      setIsPlaying(false);
    })
    .catch(error => {
      console.error('There was an error!', error);
      setSpinner(false);
    });
  }

  const styles = StyleSheet.create({
    logo: {
      height: 100,
      width: 100,
      backgroundColor: '#fff',
      justifyContent:'space-evenly',
      flexDirection:'row'
    },
    stop: {
      height: 100,
      width: 100,
      backgroundColor: '#fff',
      justifyContent:'space-evenly',
      marginVertical:10,
      marginHorizontal:10
    },
    container: {
      flexDirection:'row',
      alignItems:'center'
    }
  });

  return (
    <View style={styles.container}>
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
        <Image style={styles.stop} source={require('../images/stop.png')} />
      </Pressable>
    </View>
  );
};