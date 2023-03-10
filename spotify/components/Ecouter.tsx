import React, { useState } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import {Image, PermissionsAndroid, Pressable} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
  
const audioRecord = new AudioRecorderPlayer();

export function Ecouter(): JSX.Element {

    const options = {
        sampleRate: 16000,  // default 44100
        channels: 1,        // 1 or 2, default 1
        bitsPerSample: 16,  // 8 or 16, default 16
        audioSource: 6,     // android only (see below)
        wavFile: 'test.wav' // default 'audio.wav'
      };

    const [inRecord, setInRecord] = useState(false);
    
    const LogoStyle = {
        height: 100,
        width: 100,
        backgroundColor: '#B4B2B2'
    };

    const startRecord = async () => {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
        await audioRecord.startRecorder();
        setInRecord(true);
    };

    const stopRecord = async () => {
        const audio = await audioRecord.stopRecorder();
        audioRecord.removeRecordBackListener();
        console.log(audio);
        setInRecord(false);
    };


    return (
        <>
            {inRecord ?
                <Pressable onPress={stopRecord}>
                    <Image style={LogoStyle} source={require('../images/microphone_on.png')} />
                </Pressable> :
                <Pressable onPress={startRecord}>
                    <Image style={LogoStyle} source={require('../images/microphone_off.png')} /> 
                </Pressable>
            }
        </>
        
    );
}