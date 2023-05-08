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

@app.route('/get/<name>')
@ice_required
def searchMusic(twoway, name):
    return twoway.searchMusic(name)

@app.route('/play/<name>')
@ice_required
def play(twoway, name):
    result = twoway.playMusic(name)
    if result == True:
        lecteur.play()
        return True
    else:
        print("Fichier introuvable")
        return False
        
@app.route('/pause')
@ice_required
def pause(twoway):
    lecteur.pause()
    return True

@app.route('/play')
@ice_required
def play(twoway):
    lecteur.play()
    return True
        
@app.route('/stop')
@ice_required
def stop(twoway):
    result = twoway.stopMusic()
    if result == True:
        lecteur.stop()
        return True
    else:
        print("Fichier introuvable")
        return False