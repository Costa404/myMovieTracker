import io
import psycopg2
import pandas as pd
import matplotlib
matplotlib.use('Agg')  
import matplotlib.pyplot as plt
from flask import Flask, request, send_file
from src.db.db_connector import get_db_connection

app = Flask(__name__)

# Função para criar o gráfico e retornar a imagem
def generate_movie_graph(movie_id: int, title: str):
   
    conn = get_db_connection()
    print("title", title)

    # Consultar postgree pelo movie_id 
    query = f"""
    SELECT 'Initial' AS source, m.date, m.vote_average, m.vote_count
    FROM movies m
    WHERE m.movie_id = {movie_id}

    UNION ALL

    SELECT 'History' AS source, mh.date, mh.vote_average, mh.vote_count
    FROM movie_history mh
    WHERE mh.movie_id = {movie_id}

    ORDER BY date NULLS FIRST;
    """

  
    df = pd.read_sql(query, conn)

 
    conn.close()

    df['date'] = pd.to_datetime(df['date'], errors='coerce')

    # Tratar valores nulos (se houver)
    df = df.dropna(subset=['date', 'vote_average', 'vote_count'])

    # Garantir que não há valores negativos
    df = df[df['vote_average'] >= 0]
    df = df[df['vote_count'] >= 0]


    fig, ax1 = plt.subplots(figsize=(10, 5))

    # Eixo 1: Vote Average
    ax1.plot(df["date"], df["vote_average"], marker="o", linestyle="-", color="g", label="Vote Average")
    ax1.set_xlabel("Date")
    ax1.set_ylabel("Vote Average", color="g")
    ax1.tick_params(axis='y', labelcolor="g")

    ax1.set_ylim(df['vote_average'].min() - 0.1, df['vote_average'].max() + 0.1)

    # Criar o eixo secundário para o 'vote_count'
    ax2 = ax1.twinx()
    ax2.plot(df["date"], df["vote_count"], marker="o", linestyle="-", color="r", label="Vote Count")
    ax2.set_ylabel("Vote Count", color="r")
    ax2.tick_params(axis='y', labelcolor="r")

    # Ajustar limites do eixo Y
    ax2.set_ylim(df['vote_count'].min() - 10, df['vote_count'].max() + 10)

    # Adicionar título 
    plt.title(f"Vote Average and Vote Count Over Time for movie {title}")
    fig.tight_layout()

    # Ajustar rotação das datas
    plt.xticks(rotation=45)

    #
    img_bytes = io.BytesIO()
    fig.savefig(img_bytes, format='png')
    img_bytes.seek(0)
    plt.close(fig)  

    return img_bytes

# Endpoint para o frontend
@app.route('/generate_movie_graph', methods=['GET'])
def generate_graph():
    movie_id = request.args.get('movie_id', type=int)
    title = request.args.get('title', type=str)

    if not movie_id:
        return {"error": "movie_id is required"}, 400


    img_bytes = generate_movie_graph(movie_id, title)

    return send_file(img_bytes, mimetype='image/png', as_attachment=True, download_name=f"{title}_graph.png")


if __name__ == '__main__':
    app.run(debug=True)
