import React, { useState } from 'react';
import {Image, Platform, Pressable} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
  
export function Ecouter(): JSX.Element {

    // const options = {
    //     sampleRate: 16000,  // default 44100
    //     channels: 1,        // 1 or 2, default 1
    //     bitsPerSample: 16,  // 8 or 16, default 16
    //     audioSource: 6,     // android only (see below)
    //     wavFile: 'test.wav' // default 'audio.wav'
    //   };
    
    const [inRecord, setInRecord] = useState(false);
    const [recordSecs, setRecordSecs] = useState(0);
    const [recordTime, setRecordTime] = useState("");
    const audioRecorderPlayer = new AudioRecorderPlayer();

    const path = Platform.select({
        android: `~/Bureau/Alternance/architect_distribue/spotify/record/hello.mp3`,
    });
    
    const LogoStyle = {
        height: 100,
        width: 100,
        backgroundColor: '#B4B2B2'
    };

    const startRecord = async () => {
        const result = await audioRecorderPlayer.startRecorder(path);
        console.log('onStartPlay');
        audioRecorderPlayer.addRecordBackListener((e) => {
            setRecordSecs(e.currentPosition);
            setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
            return;
        });
        console.log(result);
        setInRecord(true);
    };

    const stopRecord = async () => {
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        setRecordSecs(0);
        console.log(result);
        setInRecord(false);
    }


    return (
        <>
            {inRecord ? (
                <Pressable onPress={stopRecord}>
                    <Image style={LogoStyle} source={require('../images/microphone_off.png')} />
                </Pressable>
            ) : (
                <Pressable onPress={startRecord}>
                    <Image style={LogoStyle} source={require('../images/microphone_on.png')} />
                </Pressable>
            )}
        </>
    );
}