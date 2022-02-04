CREATE TABLE members (
	member_id VARCHAR NOT NULL PRIMARY KEY,
	email VARCHAR UNIQUE NOT NULL,
	password VARCHAR NOT NULL,
	active BOOLEAN NOT NULL
);

CREATE TABLE bike_types (
	name VARCHAR NOT NULL PRIMARY KEY
);

INSERT INTO bike_types
VALUES ('VTT'),
	('Ville'),
	('Route');

CREATE TABLE bikes (
	bike_id VARCHAR NOT NULL PRIMARY KEY,
	name VARCHAR NOT NULL,
	electric BOOLEAN NOT NULL,
	average_use_week INTEGER NOT NULL,
	average_km_week NUMERIC NOT NULL,
	added_at DATE NOT NULL,
	bike_type VARCHAR NOT NULL REFERENCES bike_types(name) ON DELETE CASCADE
);

CREATE TABLE members_bikes (
	fk_member VARCHAR NOT NULL REFERENCES members(member_id) ON DELETE CASCADE,
	fk_bike VARCHAR NOT NULL REFERENCES bikes(bike_id) ON DELETE CASCADE
);

CREATE TABLE components_type (
	name VARCHAR NOT NULL PRIMARY KEY,
	average_duration NUMERIC NOT NULL,
	unit VARCHAR NOT NULL
);

INSERT INTO components_type 
VALUES ('Chaîne', 5000, 'km'),
	('Batterie', 500, 'cycles'),
	('Pneu avant', 7500, 'km'),
	('Pneu arrière', 7500, 'km'),
	('Frein avant', 4000, 'km'),
	('Frein arrière', 4000, 'km'),
	('Plaquette', 4000, 'km'),
	('Cassette', 4000, 'km');

CREATE TABLE components (
	component_id VARCHAR NOT NULL PRIMARY KEY,
	duration NUMERIC NOT NULL,
	active BOOLEAN NOT NULL,
	fk_component_type VARCHAR NOT NULL REFERENCES components_type(name) ON DELETE CASCADE
);

CREATE TABLE bikes_components (
	fk_bike VARCHAR NOT NULL REFERENCES bikes(bike_id) ON DELETE CASCADE,
	fk_component VARCHAR NOT NULL REFERENCES components(component_id) ON DELETE CASCADE
);

CREATE TABLE revisions (
	revision_id SERIAL PRIMARY KEY,
	made_at DATE NOT NULL,
);

CREATE TABLE components_revisions (
	fk_component VARCHAR NOT NULL REFERENCES components(component_id) ON DELETE CASCADE,
	fk_revision INTEGER NOT NULL REFERENCES revisions(revision_id) ON DELETE CASCADE
);

CREATE TABLE topics (
	name VARCHAR NOT NULL PRIMARY KEY
);

INSERT INTO topics 
VALUES ('Chaîne'), 
	('Pneu'),
	('Frein'),
	('Plaquette'),
	('Dérailleur'),
	('Batterie'),
	('Cassette');

CREATE TABLE tips (
	tip_id SERIAL PRIMARY KEY,
	title VARCHAR NOT NULL,
	content TEXT NOT NULL,
	write_date DATE NOT NULL,
	fk_topic VARCHAR NOT NULL REFERENCES topics(name) ON DELETE CASCADE
);

INSERT INTO tips
VALUES 
('Comment limiter l’usure de la chaine ?', 'La chaine d’un vélo est prévue pour tenir entre 5000 et 8000 kms. Cependant, il est facile d’augmenter sa durée de vie en utilisant quelques astuces : 
- Lorsque vous n’utilisez pas votre vélo, évitez de mettre votre chaine sur un braquet trop élevé ou évitez simplement de la « croiser ». Il est donc important de ne pas la placer sur une configuration « grand plateau, grand pignon » ou « grand plateau, petit pignon ». L’objectif est qu’elle ne soit pas trop tendue. Cela a tendance à l’étirer et à réduire sa durée de vie. 
- Lorsque vous arrivez à 4000kms, démontez votre chaine, étalez-là à côté d’une chaine neuve. Si la différence entre les deux est de plus d’un moyeu, changez de chaine.
- Lorsque vous roulez, si vous entendez un bruit de frottement entre la chaine et le dérailleur avant ; c’est que votre chaine est peut-être usée.', NOW(), 'Chaîne'), 

('Gonflage des pneumatiques', 'Dans un cas général, pour un vélo de route, le gonflage des pneumatiques correspond à 10% du poids du corps du cycliste. Pour une personne de 70kgs, le gonflage sera de 7bars. Il est cependant déconseillé de dépasser les 8,5 ou 9 bars en fonction du vélo ou de la carrure du cycliste. Si vous souhaitez avoir un plus gros confort sur votre vélo et une meilleure adhérence, diminuez la pression des pneumatiques. A l’inverse, si vous êtes à la recherche de performances, augmentez la pression. La stabilité sera cependant impactée. 
Pour les VTC, le gonflage est plus classique et se situe généralement entre 2 et 3 bars par pneu. 
Pour les VTT, cela dépend de la pratique. La pression reste cependant très basse avec une valeur généralement inférieure à bars.', NOW(), 'Pneu'),

('Changer un pneu sur le vélo', '1/ DÉMONTER UN PNEU DE VÉLO : ÉTAPE 1
Pour retirer la roue du vélo, commencez par desserrer les boulons de chaque côté de l’axe. Enlevez ensuite le bouchon de valve, c’est-à-dire l’endroit par lequel vous pouvez gonfler votre roue.
Il ne vous reste plus qu’à appuyer sur le petit picot situé au milieu de la valve, de manière à dégonfler le pneu. Inutile d’attendre que le pneu soit entièrement dégonflé : une fois que le pneu est très mou, cela suffit.
ÉTAPE 2 : DÉGAGER LE PNEU DE VÉLO DE LA JANTE
Les choses sérieuses commencent ! Pour pouvoir enlever votre pneu, vous devez tout d’abord appuyer sur les flancs du pneu, vers l’intérieur. Le pneu doit en principe se détacher des parois de la jante et pouvoir bouger à l’intérieur de celle-ci.

C’est à ce moment qu’interviennent les démonte-pneus. Utilisez-les comme leviers pour prendre l’intérieur du pneu et le ramener en dehors de la jante. Vous pouvez généralement accrocher votre démonte-pneu à un rayon, pour maintenir le pneu hors de la jante. Répétez l’opération jusqu’à ce qu’un côté entier du pneu sorte de la jante.

Attention : veillez à ne pas pincer la chambre à air.

ÉTAPE 3 : ENLEVER LA CHAMBRE À AIR
Une fois qu’une première moitié du pneu est sortie des rails de la jante, vous pouvez enlever la chambre à air. La chambre à air retirée, il vous suffit de tirer avec les mains pour enlever complètement le pneu.

Si vous voulez également enlever le « fond de jante », vous pouvez prendre un tournevis afin de pouvoir le retirer par le trou de la valve. Le fond de jante est en général élastique et s’enlève facilement.

2/ REMONTER UN PNEU DE VÉLO
ÉTAPE 1
Si vous avez un fond de jante (sorte d’élastique recouvrant l’intérieur de la jante), vous pouvez directement passer au point suivant. Sinon, restez ici ! S’il n’y a pas de fond de jante, il va falloir en mettre un. Le fond de jante sert à limiter les crevaisons : la chambre à air risquerait de crever si elle était gonflée directement sur la jante.

Astuce : pour placer le fond de jante plus facilement, positionnez le trou du fond de jante au niveau du trou de valve de la jante. Insérez ensuite votre tournevis. Vous pourrez alors mettre le reste du fond de jante facilement, sans qu’il ne bouge.

ÉTAPE 2 : MONTER LE PNEU DANS LA JANTE
Pour monter le pneu de vélo dans la jante, mieux vaut commencer par insérer l’un des côtés. Cette étape peut se faire à la main. Si cela se révèle trop difficile, vous pouvez vous servir des démonte-pneus comme leviers. Prenez garde de ne pas pincer la chambre à air !

Attention au sens du pneu : la plupart des pneus ont un sens. Il est en général noté directement sur le pneu par une petite flèche ou par la mention front/rear (avant et arrière).

ÉTAPE 3 : METTRE LA CHAMBRE À AIR
Il ne vous reste plus qu’à mettre la chambre à air, légèrement gonflée. Faites passer la valve par le trou de la jante, avant de placer la chambre à air entièrement dans le pneu.

Vérifiez que le pneu est bien installé sur la jante et regonflez-le. Une fois le petit bouchon de valve revissé, vous avez terminé !', NOW(), 'Pneu');