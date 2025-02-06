import os

from urllib.parse import urlparse  


DATABASE_URL = os.getenv("DATABASE_URL")

db_info = urlparse(DATABASE_URL)
DB_CONFIG = {
    "dbname": db_info.path[1:],  
    "user": db_info.username,
    "password": db_info.password,
    "host": db_info.hostname,
    "port": db_info.port,
}
import os
import psycopg2
from urllib.parse import urlparse
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

db_info = urlparse(DATABASE_URL)
DB_CONFIG = {
    "dbname": db_info.path[1:],  
    "user": db_info.username,
    "password": db_info.password,
    "host": db_info.hostname,
    "port": db_info.port,
}

def get_db_connection():
   
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        return conn
    except Exception as e:
        print(f"Erro ao conectar ao banco de dados: {e}")
        return None
