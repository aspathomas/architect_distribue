# SOUP's NLP entry point
#
# This is the entry of SOUP's NLP service
#
# Authors: Lahcène Belhadi <lahcene.belhadi@alumni.univ-avignon.fr>
from core.api import api


def main() -> None:
    """SOUP's NLP entry point"""
    api.run(port=5001)


if __name__ == "__main__":
    main()
