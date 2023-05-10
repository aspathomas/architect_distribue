import * as React from 'react';
import {Image, Platform, Pressable} from 'react-native';
import AudioRecorderPlayer, { RecordBackType } from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import axios from 'axios';

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

    // URLs
    const ASR_URL = "https://5690-77-131-70-55.ngrok-free.app";  // :5000
    const NLP_URL = "https://5754-77-131-70-55.ngrok-free.app";  // :5001

    const LogoStyle = {
        height: 100,
        width: 100,
        backgroundColor: '#B4B2B2'
    };
    
    // retrieves audio file
    const recordedFilePath = `${RNFS.DocumentDirectoryPath}/audio.wav`;
    
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
            const result = await AudioRecorder.startRecorder(recordedFilePath);
            AudioRecorder.addRecordBackListener((e) => {
                setAudioPath(e.currentPosition);
            });
            console.log('record audio...');
            console.log("audiopath: ", result);
            setInRecord(true);
        } catch (error) {
            console.error('Error recording audio:', error);
        }
    };

    const stopRecord = async () => {
        try {
            const result = await AudioRecorder.stopRecorder();
            AudioRecorder.removeRecordBackListener();
            console.log("setting audio data");
            setAudioData(result);
            setInRecord(false);
        } catch (error) {
            console.error('Error stopping recording:', error);
        }

        const tokens = await sendAudioToASR();
        const action = await sendASRTokensToNLP(tokens);
        console.log("Action demandée : ", action.action);
        console.log("Musique demandée : ", action.music);
    }

    /**
     * Retrieves the audio file the user just recorded and returns it if it's found
     * otherwise displays an error message.
     */
    const retrieveRecordedAudio = async () => {
        try {
            const file = await RNFS.readFile(recordedFilePath, "base64");
            return file;
        } catch (error) {
            console.error(`Error retrieving recorded audio file: ${error}`);
        }

        return;
    }

    /**
     * Sends the recorded audio file to the ASR service and returns the answer
     * returned by the ASR
     */
    const sendAudioToASR = async () => {
        console.log("Sending audio .....");
        const response = await RNFS.uploadFiles({
            toUrl: `${ASR_URL}/transcribe`,
            files: [{
                name: "audio_file",
                filepath: "/sdcard/audio_test.wav", // TODO: Envoyer l'audio enregistré par l'app
                filename: "audio_test.wav",
                filetype: "audio/wav",
            }],
            method: "POST",
        }).promise;

        return response.body;
    }

    const sendASRTokensToNLP = async (tokens: string) => {
        console.log("Sending tokens .....");
        const resp = await axios.post(
            `${NLP_URL}/retrieve-command`, 
            { asr_tokens: tokens }, 
            { 
              headers: {
                "Content-Type": "application/json",
              }
            }
        );

        return resp.data;
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
