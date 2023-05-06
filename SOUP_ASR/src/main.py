# SOUP's ASR entry point
#
# SOUP's ASR is a small service made to transcribe audio speech file into
# text to retrieve the commands passed by the user using their voice.
#
# Authors: Lahcène Belhadi <lahcene.belhadi@alumni.univ-avignon.fr>

from core.api import api


def main() -> None:
    """SOUP's ASR entry point"""
    api.run()


if __name__ == "__main__":
    main()
