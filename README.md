# TP-FINAL-IntroDS

# Set up database on docker
docker volume create postgres-volume

docker run --name postgresDB --env POSTGRES_PASSWORD=francodl POSTGRES_USER=francodl POSTGRES_DB=dragon-gacha --volume postgres-volume:/var/lib/postgresql/data --publish 777:5432 --detach postgres

# Install dependencies in a python environment
pip install -r requirements.txt

# Fill data into de database for the first time

//This will create a banner with the needed info 
(change name or chances)
(match acha_chances.gacha with gacha_info.id)

INSERT INTO gacha_info (id, name)
VALUES (1, 'cosmicDragonBanner');

INSERT INTO gacha_chances (id, gacha, six_star_percent, five_star_percent, four_star_percent, three_star_percent)
VALUES (1, 1, 6.25, 17.86, 31.89, 44);

//Insert a type of dragon and customize the stats
INSERT INTO dragon_stats (id, name, category, hp, attack, defense, max_lvl, max_asc)
VALUES (1, 'cosmicDragon', 'space', 10, 40, 5, 100, 3);

//Adjust the pool to your needs, it's recommended to add 3, 4, 5 and 6 star reigistries per dragon
(match gacha_pool.gacha_id with gacha_info.id)
(match gacha_pool.dragon_id with dragon_stats.id)

INSERT INTO gacha_pool (id, gacha_id, dragon_id, stars)
VALUES (1, 1, 1, 6)


# Run Main API
/Backend
python main.py

# Run Images API
/Backend/ImageServer
python main.py

# Run html
/Frontend
python -m http.server 779