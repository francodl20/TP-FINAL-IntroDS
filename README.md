# TP-FINAL-IntroDS

# Set up database on docker
docker volume create postgres-volume

docker run --name postgresDB --env POSTGRES_PASSWORD=francodl POSTGRES_USER=francodl POSTGRES_DB=dragon-gacha --volume postgres-volume:/var/lib/postgresql/data --publish 777:5432 --detach postgres

# Run API
python main.py

# Run html
python -m http.server 779