from flask import Blueprint, request, jsonify
import requests

thought_bp = Blueprint('thoughts', __name__)

DEEPSEEK_API_KEY = "sk-11ef1496649844d8b5caaddb4210c670"

@thought_bp.route('/process', methods=['POST'])
def process_thought():
    data = request.json
    thought_text = data.get('thought')

    if not thought_text:
        return jsonify({"error": "No thought provided"}), 400

    response = requests.post(
        "https://api.deepseek.com/v1/chat/completions",
        headers={"Authorization": f"Bearer {DEEPSEEK_API_KEY}"},
        json={
            "model": "deepseek-chat",
            "messages": [{"role": "user", "content": thought_text}]
        }
    )

    return jsonify(response.json())
