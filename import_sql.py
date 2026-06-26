import os
import mysql.connector

DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "Thiru@2007",   # Change this
    "database": "user_allocation"        # Change if your DB name is different
}

SQL_FOLDER = "sql_files"

conn = mysql.connector.connect(**DB_CONFIG)
cursor = conn.cursor()

for filename in os.listdir(SQL_FOLDER):
    if filename.endswith(".sql"):
        path = os.path.join(SQL_FOLDER, filename)

        print(f"Importing {filename}...")

        with open(path, "r", encoding="utf-8") as file:
            sql = file.read()

        for statement in sql.split(";"):
            statement = statement.strip()
            if statement:
                try:
                    cursor.execute(statement)
                except Exception as e:
                    print(f"Error: {e}")

        conn.commit()
        print(f"{filename} imported successfully.\n")

cursor.close()
conn.close()

print("All SQL files imported.")