import React, { useState } from 'react';
import {Image, Pressable} from 'react-native';
import AudioRecord from 'react-native-audio-record';
  
export function Ecouter(): JSX.Element {

    const options = {
        sampleRate: 16000,  // default 44100
        channels: 1,        // 1 or 2, default 1
        bitsPerSample: 16,  // 8 or 16, default 16
        audioSource: 6,     // android only (see below)
        wavFile: 'test.wav' // default 'audio.wav'
      };
    
    const [inrecord, setInRecord] = useState(false);
    AudioRecord.init(options);
    
    const LogoStyle = {
        height: 100,
        width: 100,
        backgroundColor: '#B4B2B2'
    };

    const record = () => {
        if (!inrecord) {
            AudioRecord.start();
            setInRecord(true);
        } else {
            AudioRecord.stop();
            AudioRecord.on('data', data => {
                console.log(data);
            });
            setInRecord(false);
        }
    };


    return (
        <Pressable onPress={record}>
            <Image style={LogoStyle} source={require('../images/microphone.png')} />
        </Pressable>
    );
}