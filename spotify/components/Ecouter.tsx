import * as React from 'react';
import {Image, Platform, Pressable} from 'react-native';
import AudioRecorderPlayer, { RecordBackType } from 'react-native-audio-recorder-player';

const AudioRecorder = new AudioRecorderPlayer();

export function Ecouter(props: any): JSX.Element {
    const { setAudio, setAction, url } = props;
    // const options = {
    //     sampleRate: 16000,  // default 44100
    //     channels: 1,        // 1 or 2, default 1
    //     bitsPerSample: 16,  // 8 or 16, default 16
    //     audioSource: 6,     // android only (see below)
    //     wavFile: 'test.wav' // default 'audio.wav'
    //   };
    
    const [audioPath, setAudioPath] = React.useState(0);
    const [audioData, setAudioData] = React.useState("");
    const [inRecord, setInRecord] = React.useState(false);

    const LogoStyle = {
        height: 100,
        width: 100,
        backgroundColor: '#B4B2B2'
    };
    // const sendRecord = async () => {
    //     console.log("test")
    //     const requestOptions = {
    //         method: 'GET'
    //     };
    //     console.log("test");
    //     fetch(`${url}/get/a`, requestOptions)
    //     .then(response => {
    //       if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //       }
    //       return response;
    //     })
    //     .then(data => {
    //       console.log(data);
    //     })
    //     .catch(error => {
    //       console.error('There was an error!', error);
    //     });
    // }
    const startRecord = async () => {
        try {
            const audioPath = "/data/user/0/com.spotify/files/audio.mp3";
            const result = await AudioRecorder.startRecorder(audioPath);
            AudioRecorder.addRecordBackListener((e) => {
                setAudioPath(e.currentPosition);
            });
            console.log('record audio...');
            setInRecord(true);
        } catch (error) {
            console.error('Error recording audio:', error);
        }
    };

    const stopRecord = async () => {
        try {
            const result = await AudioRecorder.stopRecorder();
            AudioRecorder.removeRecordBackListener();
            setAudioData(result);
            setInRecord(false);
        } catch (error) {
            console.error('Error stopping recording:', error);
        }
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