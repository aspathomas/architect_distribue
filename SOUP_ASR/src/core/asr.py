# SOUP's ASR module using Speechbrain
#
# This module implements the SOUP's ASR powered by speechbrain
#
# Authors: Lahcène Belhadi <lahcene.belhadi@alumni.univ-avignon.fr>

from speechbrain.pretrained import EncoderDecoderASR
from unidecode import unidecode


class ASR:
    """SOUP's ASR"""

    def __init__(self) -> None:
        """Initiliazes Speechbrain's ASR"""
        self.asr = EncoderDecoderASR.from_hparams(
            "speechbrain/asr-crdnn-commonvoice-fr"
        )

    def transcribe(self, audio) -> str:
        """Transcribes an audio to text

        Returns the transcribed audio as text

        Arguments:
            audio -- the audio file to transcribe
        """
        transcription = self.asr.transcribe_file(audio)
        return unidecode(transcription.lower())
