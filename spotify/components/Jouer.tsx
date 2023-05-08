import * as React from 'react';
import {Image, Platform, Pressable} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';

export function Jouer(): JSX.Element {

    const [inPlay, setInPlay] = React.useState(false);
    const AudioRecorder = new AudioRecorderPlayer();

    const LogoStyle = {
        height: 100,
        width: 100,
        backgroundColor: '#B4B2B2'
    };
    
    const startPlay = async () => {
        try {
            const audioPath = "/data/user/0/com.spotify/files/audio.mp3"; // replace with the actual path to your audio file
            await AudioRecorder.startPlayer(audioPath);
            console.log('Playing audio...');
            setInPlay(true);
        } catch (error) {
            console.error('Error playing audio:', error);
        }
    };

    const stopPlay = async () => {
        try {
            await AudioRecorder.stopPlayer();
            console.log('Audio stopped.');
            setInPlay(false);
        } catch (error) {
            console.error('Error stopping audio:', error);
        }
    }


    return (
        <>
            {inPlay ? (
                <Pressable onPress={stopPlay}>
                    <Image style={LogoStyle} source={require('../images/play_off.png')} />
                </Pressable>
            ) : (
                <Pressable onPress={startPlay}>
                    <Image style={LogoStyle} source={require('../images/play_on.png')} />
                </Pressable>
            )}
        </>
    );
}
