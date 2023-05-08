import * as React from 'react';
import {Image, Platform, Pressable} from 'react-native';
import AudioRecorderPlayer, { RecordBackType } from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import axios from 'axios';

interface EcouterProps {
    setAudioData: (event: string) => void;
}

export function Ecouter(props: EcouterProps): JSX.Element {
    const { setAudioData } = props;

    // const options = {
    //     sampleRate: 16000,  // default 44100
    //     channels: 1,        // 1 or 2, default 1
    //     bitsPerSample: 16,  // 8 or 16, default 16
    //     audioSource: 6,     // android only (see below)
    //     wavFile: 'test.wav' // default 'audio.wav'
    //   };
    
    const [inRecord, setInRecord] = React.useState(false);
    const [audioPath, setAudioPath] = React.useState(0);
    const AudioRecorder = new AudioRecorderPlayer();

    const ASR_URL = "https://1d0e-77-131-70-55.ngrok-free.app";

    const LogoStyle = {
        height: 100,
        width: 100,
        backgroundColor: '#B4B2B2'
    };
    
    // retrieves audio file
    const recordedFilePath = `${RNFS.DocumentDirectoryPath}/audio.wav`;
    
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
            console.log(result);
            setInRecord(false);
        } catch (error) {
            console.error('Error stopping recording:', error);
        }

        await sendAudioToASR();
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
        RNFS.uploadFiles({
            toUrl: `${ASR_URL}/transcribe`,
            files: [{
                name: "audio_file",
                filepath: "/sdcard/audio_test.wav", // TODO: Envoyer l'audio enregistré par l'app
                filename: "audio_test.wav",
                filetype: "audio/wav",
            }],
            method: "POST",
        }).promise.then((resp) => {
            if (resp.statusCode == 200) {
                console.log("UPLOAD SUCCESS");
                console.log("Resp: ", resp.body);
            } else {
                console.error("UPLOAD FAILED");
            }
        })
        .catch((error) => {
            console.error("An error occured while uploading audio: ", error);
        });
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
