function pgadmin
    # Verificación de argumentos
    if test (count $argv) -ne 3
        echo "Uso: pgadmin <usuario> <contraseña> <red_docker>"
        return 1
    end

    set -l user $argv[1]
    set -l pass $argv[2]
    set -l network $argv[3]

    echo "Lanzando pgAdmin en la red '$network'..."

    docker run -d \
        --name pgadmin_container \
        --network $network \
        -e "PGADMIN_DEFAULT_EMAIL=$user" \
        -e "PGADMIN_DEFAULT_PASSWORD=$pass" \
        -p 9000:80 \
        dpage/pgadmin4

    echo "¡Listo! Accede a http://localhost:9000"
end
