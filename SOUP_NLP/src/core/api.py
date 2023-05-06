# SOUP's NLP api
#
# Authors: Lahcène Belhadi <lahcene.belhadi@alumni.univ-avignon.fr>
import json

from flask import Flask, Response, jsonify, make_response, request
from werkzeug.wrappers import response

from core.nlp import NLP

api = Flask(__name__)


@api.get("/")
def root() -> str:
    return "Hello world!"


@api.post("/retrieve-command")
def retrieve_command_route() -> Response:
    data = request.get_json()
    tokens = data["asr_tokens"]
    tokens_str = json.dumps(tokens)
    print(tokens_str)

    command = NLP.retrieve_command(tokens_str)
    print(command)

    if command is None:
        response = make_response(
            jsonify({"action": "No action found", "music": "No music found"})
        )
        return response

    return make_response(jsonify({"action": command[0], "music": command[1]}))
