from flask import Flask
import Ice
import vlc
import sys
from functools import wraps

Ice.loadSlice('Music.ice')
import Demo

app = Flask(__name__)
# Initialize the Ice communicator at the module level
communicator = Ice.initialize(sys.argv, "config.client")
twoway = Demo.MusicPrx.checkedCast(communicator.propertyToProxy('Music.Proxy').ice_twoway().ice_secure(True))
if not twoway:
    print("invalid proxy")
    sys.exit(1)

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

lecteur = Lecteur()
isPlay = False

# Decorator to ensure Ice is initialized before the decorated function is called
def ice_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not twoway:
            print("invalid proxy")
            sys.exit(1)
        return f(twoway, *args, **kwargs)
    return decorated_function

@app.route('/get/<name>', methods=['GET'])
@ice_required
def searchMusic(twoway, name):
    return twoway.searchMusic(name)

@app.route('/play/<name>', methods=['GET'] )
@ice_required
def playMusic(twoway, name):
    print(name)
    result = twoway.playMusic(name)
    if result == True:
        lecteur.play()
        return name
    else:
        print("Fichier introuvable")
        return False
        
@app.route('/pause', methods=['GET'])
@ice_required
def pause(twoway):
    lecteur.pause()
    return "la musique est en pause"

@app.route('/play', methods=['GET'])
@ice_required
def play(twoway):
    lecteur.play()
    return "la musique est en lecture"
        
@app.route('/stop', methods=['GET'])
@ice_required
def stop(twoway):
    result = twoway.stopMusic()
    if result == True:
        lecteur.stop()
        return "La chanson est stopper"
    else:
        print("Fichier introuvable")
        return False
    
@app.route('/exit', methods=['GET'])
@ice_required
def exit(twoway):
    communicator.destroy()
    return True