// src/database/db.ts
import { Pool } from "pg";
// Configuração do Pool para o PostgreSQL
const pool = new Pool({
    user: "nunoboreal", // Substitua pelo seu usuário do PostgreSQL
    host: "postgresql://nunoboreal:hSb7HYY36FS6YANsHnExxKGJDYhrz3kq@dpg-cu753e0gph6c73b84jpg-a.frankfurt-postgres.render.com/mymoviedb_8ha3", // Endereço do seu servidor PostgreSQL
    database: "mymoviedb_8ha3", // Nome do seu banco de dados
    password: "hSb7HYY36FS6YANsHnExxKGJDYhrz3kq", // Substitua pela sua senha
    port: 5432, // Porta do PostgreSQL
});
export default pool;
