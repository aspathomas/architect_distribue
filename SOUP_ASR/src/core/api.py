# API
#
# Enables users to interact with the service through HTTP requests
#
# Authors: Lahcène Belhadi <lahcene.belhadi@alumni.univ-avignon.fr>

import os

from flask import Flask, request

from .asr import ASR

api = Flask(__name__)


@api.get("/")
def root() -> str:
    """Displays an \"Hello world!\" """
    return "Hello world!"


@api.post("/transcribe")
def transcribe() -> str:
    """Enables user to pass an audio file and get the text from their speech"""
    audio_file = request.files.get("audio_file")

    if audio_file is None:
        return "No file provided!"

    # save to tmp
    tmp_path = os.path.join("./res/tmp", "tmpaudio.wav")
    audio_file.save(tmp_path)

    asr = ASR()
    text = asr.transcribe(tmp_path)

    # delete tmp file
    os.remove(tmp_path)

    return text
