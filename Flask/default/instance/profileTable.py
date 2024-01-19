import sqlite3

# Connect to the SQLite database
conn = sqlite3.connect('db.sqllite')

# Create a cursor object
cursor = conn.cursor()

# SQL command to create a user_info table with the specified columns
create_table_command = """
CREATE TABLE IF NOT EXISTS user_info (
    id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone_number TEXT,
    email TEXT,
    joining_date DATE,
    city TEXT,
    country TEXT,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);
"""

# Execute the SQL command
cursor.execute(create_table_command)

# Commit the changes
conn.commit()

# Close the connection
cursor.close()
conn.close()
