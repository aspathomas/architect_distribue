#!/usr/bin/env python
#
# Copyright (c) ZeroC, Inc. All rights reserved.
#

import signal
import sys
import time
import Ice
import vlc
import os
import glob

Ice.loadSlice('Music.ice')
import Demo


class MusicI(Demo.Music):
    
    def playMusic(self, musicName, current):
        file = "music_server/" + musicName + ".mp3"

        if not os.path.exists(file):
            return False
        
        media = self.vlc.media_new(file)
        media.add_option("sout=#rtp{mux=ts,ttl=10,port=8080,sdp=rtsp://127.0.0.1:8080/music}")
        media.add_option("--no-sout-all")
        media.add_option("--sout-keep")
        media.get_mrl()
        self.player = self.vlc.media_player_new()
        self.player.set_media(media)
        self.player.play()

        return True

    def stopMusic(self, current):
        self.player.stop()
        return True
    
    def searchMusic(self, musicName, current):
        source = os.getcwd()
        os.chdir('music_server')
        musicList = []

        for fileName in glob.glob(f'*{musicName}*'):

            if fileName.endswith('.mp3'):
                musicList.append(fileName)
        os.chdir(source)
        return musicList


#
# Ice.initialize returns an initialized Ice communicator,
# the communicator is destroyed once it goes out of scope.
#
with Ice.initialize(sys.argv, "config.server") as communicator:

    #
    # Install a signal handler to shutdown the communicator on Ctrl-C
    #
    signal.signal(signal.SIGINT, lambda signum, frame: communicator.shutdown())

    #
    # The communicator initialization removes all Ice-related arguments from argv
    #
    print(sys.argv[0])
    if len(sys.argv) > 1:
        print(sys.argv[0] + ": too many arguments")
        sys.exit(1)

    adapter = communicator.createObjectAdapter("Music")
    adapter.add(MusicI(), Ice.stringToIdentity("music"))
    adapter.activate()
    communicator.waitForShutdown()
