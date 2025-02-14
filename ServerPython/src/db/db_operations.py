            
from sqlalchemy import create_engine
import pandas as pd
import os
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

def get_movies_from_db():
    try:
        engine = create_engine(DATABASE_URL)
        query = "SELECT * FROM movies;"
        movies = pd.read_sql(query, engine)
      
        return movies
    except Exception as e:
        print("Error conecting db", e)
        return pd.DataFrame([])

def get_reviews_from_db():
    try:
        engine = create_engine(DATABASE_URL)
        query = "SELECT * FROM reviews_from_TMDB"

        reviewsFromTMDB = pd.read_sql(query, engine)

        return reviewsFromTMDB 
    except Exception as e:
        print("Error conecting db", e)
        return pd.DataFrame([])
    

def get_id_from_movies():
    movies = get_movies_from_db()
    return movies["movie_id"].tolist()
