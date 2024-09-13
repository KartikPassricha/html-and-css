from flask import Flask, request, jsonify
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

# MySQL connection function
def create_connection():
    try:
        connection = mysql.connector.connect(
            host="localhost",  # Update with your MySQL server host
            user="root",  # Update with your MySQL username
            password="#LOWSPECGAMER1234@",  # Update with your MySQL password
            database="USER_RECORD_DATA"  # Update with your MySQL database name
        )
        return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

# Signup route
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()  # Get JSON data from the request

    username = data['username']
    password = data['password']
    email = data['email']

    if not username or not password or not email:
        return jsonify({'success': False, 'message': 'All fields are required.'})

    try:
        connection = create_connection()
        if connection is None:
            return jsonify({'success': False, 'message': 'Database connection failed.'})

        cursor = connection.cursor()

        # Check if the username or email already exists
        cursor.execute("SELECT * FROM users WHERE username = %s OR email = %s", (username, email))
        existing_user = cursor.fetchone()

        if existing_user:
            return jsonify({'success': False, 'message': 'Username or email already taken.'})

        # Insert the new user into the database
        cursor.execute("INSERT INTO users (username, password, email) VALUES (%s, %s, %s)", (username, password, email))
        connection.commit()

        return jsonify({'success': True, 'message': 'User registered successfully.'})

    except Error as e:
        return jsonify({'success': False, 'message': str(e)})

    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()

if __name__ == '__main__':
    app.run(debug=True)
