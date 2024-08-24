import os
from supabase import create_client, Client
# senha: educaminasnechefe
url = 'https://winzjpooprwrjphlljdm.supabase.co'
key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpbnpqcG9vcHJ3cmpwaGxsamRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE0MjQ1MTksImV4cCI6MjAzNzAwMDUxOX0.q1T8J5w1k_B35a1bCX1FV1a-15povIZHGrcotqMR_1o'

supabase: Client = create_client(url, key)

response = supabase.table("Municipio").select("*").execute()

query = """
    SELECT 
        f.id AS id_filtro,
        f.municipio_id,
        f.etapa_de_ensino,
        f.ano,
        mr.id AS matricula_id,
        mr.raca,
        mr.quantidade
    FROM 
        Filtro f
    JOIN 
        MatriculaRaca mr ON f.id = mr.id_filtro
    WHERE 
        f.ano > 2022;
    """


response2 = supabase.rpc()
print(response2.data)
