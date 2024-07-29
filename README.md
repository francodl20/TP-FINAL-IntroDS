# TP-FINAL-IntroDS

# Set up database on docker
docker volume create postgres-volume

docker run --name postgresDB --env POSTGRES_PASSWORD=francodl POSTGRES_USER=francodl POSTGRES_DB=dragon-gacha --volume postgres-volume:/var/lib/postgresql/data --publish 777:5432 --detach postgres

# Install dependencies in a python environment
pip install -r requirements.txt

# Run Main API
/Backend
python main.py

# Run Images API
/Backend/ImageServer
python main.py

# Run html
/Frontend
python -m http.server 779