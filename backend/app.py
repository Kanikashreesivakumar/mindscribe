from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Supabase Credentials (Replace with actual keys)
SUPABASE_URL = "https://fpurdutomtddmknzzfkj.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwdXJkdXRvbXRkZG1rbnp6ZmtqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MTg1ODgwOSwiZXhwIjoyMDU3NDM0ODA5fQ.DC7D2Umz8yDsNp8LjEER572Yfhge4XODL9pJwpgPNMk"
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.route('/')
def home():
    return jsonify({"message": "Mindscribe Backend is Running!"})

# User Authentication - Signup
@app.route('/auth/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400

    response = supabase.auth.sign_up({"email": email, "password": password})
    return jsonify(response)

# User Authentication - Login
@app.route('/auth/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    response = supabase.auth.sign_in_with_password({"email": email, "password": password})
    return jsonify(response)

# Thought Processing - Save Thought
@app.route('/thoughts/process', methods=['POST'])
def process_thought():
    data = request.json
    user_id = data.get('user_id')
    thought_text = data.get('thought')

    if not user_id or not thought_text:
        return jsonify({"error": "Missing user_id or thought_text"}), 400

    response = supabase.table("thoughts").insert({
        "user_id": user_id,
        "thought_text": thought_text
    }).execute()
    
    return jsonify({"success": True, "data": response.data})

# Retrieve Thoughts
@app.route('/thoughts/get/<user_id>', methods=['GET'])
def get_thoughts(user_id):
    response = supabase.table("thoughts").select("*").eq("user_id", user_id).execute()
    return jsonify({"success": True, "data": response.data})

# Run Flask App
if __name__ == '__main__':
    app.run(debug=True)
