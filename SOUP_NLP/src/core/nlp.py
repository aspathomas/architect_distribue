# NLP Class
#
# Authors: Lahcène Belhadi <lahcene.belhadi@alumni.univ-avignon.fr>
from typing import Optional, Tuple


class NLP:
    def __init__(self) -> None:
        pass

    @staticmethod
    def normalize(tokens: list[str]):
        for token in enumerate(tokens):
            i = token[0]
            word = token[1]

            if word.startswith('"') or word.endswith('"'):
                new = word.replace('"', "")
                tokens[i] = new

        return tokens

    @staticmethod
    def tokenize(text: str) -> list[str]:
        return NLP.normalize(text.split())

    @staticmethod
    def retrieve_command(text: str) -> Optional[Tuple[str, str]]:
        """Eventually returns a command tuple if found, otherwise returns None

        Arguments:
            text: str -- the text to retrieve commands from
        """
        tokens: list[str] = NLP.tokenize(text)
        print(tokens)

        known_commands: list[str] = [
            "joue",
            "joues",
            "jouer",
            "pause",
            "stop",
            "arrete",
            "ecouter",
            "écouter",
        ]

        command_word: Optional[str] = None
        music: Optional[str] = None
        command: Optional[Tuple[str, str]] = None
        for word in enumerate(tokens):
            index: int = word[0]
            current_word: str = word[1]

            if current_word in known_commands:
                # at this point we have a command
                # we now have to retrieve the music title
                command_word = current_word
                if index < len(tokens) - 1:
                    music = ""
                    for token in tokens[index + 1 :]:
                        music += token + " "

        if music is not None and command_word is not None:
            command = (command_word, music)

        return command
