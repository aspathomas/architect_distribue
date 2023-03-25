import React, { useState } from 'react';
import {Image, Platform, Pressable} from 'react-native';
import { AudioRecorderPlayer } from 'react-native-audio-recorder-player';
export function Ecouter(): JSX.Element {

    // const options = {
    //     sampleRate: 16000,  // default 44100
    //     channels: 1,        // 1 or 2, default 1
    //     bitsPerSample: 16,  // 8 or 16, default 16
    //     audioSource: 6,     // android only (see below)
    //     wavFile: 'test.wav' // default 'audio.wav'
    //   };
    
    const [inRecord, setInRecord] = useState(false);
    const AudioRecorder = new AudioRecorderPlayer();
    
    const LogoStyle = {
        height: 100,
        width: 100,
        backgroundColor: '#B4B2B2'
    };
    
    const startRecord = async () => {
        const audioPath = '~/Bureau/Alternance/architect_distribue/spotify/record/hello.mp3';
        const result = await AudioRecorder.startRecording();
        AudioRecorder.onFinished = (data : any) => {
            console.log('Finished recording: ', data);
        };
        setInRecord(true);
        return { audioPath, result };
    };

    const stopRecord = async () => {
        const result = await AudioRecorder.stopRecording();
        setInRecord(false);
        return result;
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