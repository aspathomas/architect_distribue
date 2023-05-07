import Ice
import glob
import vlc
import os
import sys

Ice.loadSlice('Music.ice')
import Demo

class Lecteur:

    def __init__(self):
        self.vlcInstance = vlc.Instance()
        self.player = self.vlcInstance.media_player_new()
        self.player.set_mrl("rtsp://127.0.0.1:8080/music")

    def pause(self):
        self.player.pause()

    def play(self):
        self.player.play()

    def stop(self):
        self.player.stop()

#
# Ice.initialize returns an initialized Ice communicator,
# the communicator is destroyed once it goes out of scope.
#
with Ice.initialize(sys.argv, "config.client") as communicator:

    #
    # The communicator initialization removes all Ice-related arguments from argv
    #
    if len(sys.argv) > 2:
        print(sys.argv[0] + ": too many arguments")
        sys.exit(1)

    twoway = Demo.MusicPrx.checkedCast(
        communicator.propertyToProxy('Music.Proxy').ice_twoway().ice_secure(True))
    if not twoway:
        print("invalid proxy")
        sys.exit(1)

    oneway = Demo.MusicPrx.uncheckedCast(twoway.ice_oneway())

    # lecteur = Lecteur()
    isPlay = False
    
def EntrerMusic(filenameMp3: str):

    filenameMp3 = filenameMp3 + ".mp3"

    # File found
    file = open(filenameMp3, "rb")
    fileSize = os.stat(filenameMp3).st_size
    quotient, remainder = divmod(fileSize, 102400)  # 100kB max = 102400 Bytes

    id = twoway.getNewIndex()

    for i in range(quotient):
        part = file.read(102400)
        twoway.sendMusicPart(id, part)

    part = file.read(remainder)
    twoway.sendMusicPart(id, part)

    file.close()

    twoway.uploadMusic(id, filenameMp3)
    print("La musique a bien été envoyé")

def getMusic(music: str):
    list = twoway.searchMusic(music)
    print(list)
    return list
            #     music = input("Entrer le nom du musique:\n")
            #     isDelete = twoway.delete(music)
            #     if isDelete is True:
            #         print("La chanson a été supprimé")
            #     else:
            #         print("échec")
            # elif c == 'j':
            #     music = input("Entrer le nom du musique:\n")
            #     result = twoway.playMusic(music)
            #     if result == True:
            #         lecteur.play()
            #         isPlay = True
            #     else:
            #         print("Fichier introuvable")
            # elif c == 'p':
            #     if isPlay is True:
            #         lecteur.pause()
            #         isPlay = False
            #     else:
            #         lecteur.play()
            #         isPlay = True
            # elif c == 't':
            #     result = twoway.stopMusic()
            #     if result == True:
            #         lecteur.stop()
            #     else:
            #         print("Fichier introuvable")
            # elif c == 'q':
            #     twoway.shutdown()
            # elif c == 'x':
            #     pass  # Nothing to do
            # else:
            #     print("unknown command `" + c + "\'")
            #     menu()