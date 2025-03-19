from flask import Blueprint, request, jsonify
from supabase import create_client, Client
import config

auth_bp = Blueprint('auth', __name__)
supabase: Client = create_client(config.SUPABASE_URL, config.SUPABASE_KEY)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400

    response = supabase.auth.sign_up({"email": email, "password": password})
    return jsonify(response)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    response = supabase.auth.sign_in_with_password({"email": email, "password": password})
    return jsonify(response)
