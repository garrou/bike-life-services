CREATE TABLE members (
	member_id VARCHAR(255) NOT NULL PRIMARY KEY,
	email VARCHAR(255) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	active BOOLEAN NOT NULL
);

CREATE TABLE bike_types (
	name VARCHAR(50) NOT NULL PRIMARY KEY
);

INSERT INTO bike_types
VALUES ('VTT'),
	('Ville'),
	('Route');

CREATE TABLE bikes (
	bike_id VARCHAR(255) NOT NULL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	electric BOOLEAN NOT NULL,
	average_km_week NUMERIC NOT NULL,
	added_at DATE NOT NULL,
	bike_type VARCHAR NOT NULL REFERENCES bike_types(name),
	total_km NUMERIC NOT NULL,
	automatic_km BOOLEAN NOT NULL,
	price NUMERIC NOT NULL
);

CREATE TABLE members_bikes (
	fk_member VARCHAR NOT NULL REFERENCES members(member_id) ON DELETE CASCADE,
	fk_bike VARCHAR NOT NULL REFERENCES bikes(bike_id) ON DELETE CASCADE
);

CREATE TABLE components_type (
	name VARCHAR(50) NOT NULL PRIMARY KEY,
	average_duration NUMERIC NOT NULL
);

INSERT INTO components_type 
VALUES ('Chaîne', 5000),
	('Batterie', 9000),
	('Pneu avant', 7500),
	('Pneu arrière', 7500),
	('Frein avant', 4000),
	('Frein arrière', 4000),
	('Plaquette', 4000),
	('Cassette', 4000),
	('Dérailleur avant', 10000),
	('Dérailleur arrière', 10000);

CREATE TABLE components (
	component_id VARCHAR(255) NOT NULL PRIMARY KEY,
	duration NUMERIC NOT NULL,
	active BOOLEAN NOT NULL,
	total_km NUMERIC NOT NULL,
	fk_component_type VARCHAR NOT NULL REFERENCES components_type(name)
);

CREATE TABLE bikes_components (
	fk_bike VARCHAR NOT NULL REFERENCES bikes(bike_id) ON DELETE CASCADE,
	fk_component VARCHAR NOT NULL REFERENCES components(component_id) ON DELETE CASCADE
);

CREATE TABLE components_changed (
	fk_component VARCHAR NOT NULL REFERENCES components(component_id) ON DELETE CASCADE,
	changed_at DATE NOT NULL,
	km_realised NUMERIC NOT NULL,
	price NUMERIC NOT NULL,
	brand VARCHAR(50) NOT NULL
);

CREATE TABLE topics (
	name VARCHAR(50) NOT NULL PRIMARY KEY
);

INSERT INTO topics (name)
VALUES ('Chaîne'), 
	('Batterie'),
	('Pneus'),
	('Freins'),
	('Plaquettes'),
	('Dérailleurs'),
	('Cassette'),
	('Transmission'),
	('Roulements'),
	('Roues'),
	('Jantes'),
	('Selle');

CREATE TABLE tips (
	tip_id SERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	video_id CHAR(11),
	content TEXT NOT NULL,
	fk_topic VARCHAR REFERENCES topics(name) ON DELETE CASCADE
);

INSERT INTO tips (title, video_id, content, fk_topic)
VALUES 
('Comment limiter l’usure de la chaine ?', 'jN8MeTo8taw', 'La chaine d’un vélo est prévue pour tenir entre 5000 et 8000 kms. Cependant, il est facile d’augmenter sa durée de vie en utilisant quelques astuces : 
- Lorsque vous n’utilisez pas votre vélo, évitez de mettre votre chaine sur un braquet trop élevé ou évitez simplement de la « croiser ». Il est donc important de ne pas la placer sur une configuration « grand plateau, grand pignon » ou « grand plateau, petit pignon ». L’objectif est qu’elle ne soit pas trop tendue. Cela a tendance à l’étirer et à réduire sa durée de vie. 
- Lorsque vous arrivez à 4000kms, démontez votre chaine, étalez-là à côté d’une chaine neuve. Si la différence entre les deux est de plus d’un moyeu, changez de chaine.
- Lorsque vous roulez, si vous entendez un bruit de frottement entre la chaine et le dérailleur avant ; c’est que votre chaine est peut-être usée.', 'Chaîne'), 

('Gonflage des pneumatiques', NULL, 'Dans un cas général, pour un vélo de route, le gonflage des pneumatiques correspond à 10% du poids du corps du cycliste. 
Pour une personne de 70kgs, le gonflage sera de 7bars. 
Il est cependant déconseillé de dépasser les 8,5 ou 9 bars en fonction du vélo ou de la carrure du cycliste. 
Si vous souhaitez avoir un plus gros confort sur votre vélo et une meilleure adhérence, diminuez la pression des pneumatiques. 
A l’inverse, si vous êtes à la recherche de performances, augmentez la pression. La stabilité sera cependant impactée. 
Pour les VTC, le gonflage est plus classique et se situe généralement entre 2 et 3 bars par pneu. 
Pour les VTT, cela dépend de la pratique. La pression reste cependant très basse avec une valeur généralement inférieure à bars.', 'Pneus'),

('Changer un pneu sur le vélo', 'IGp0_MMp6Xk', '1/ DÉMONTER UN PNEU DE VÉLO : ÉTAPE 1
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

Vérifiez que le pneu est bien installé sur la jante et regonflez-le. Une fois le petit bouchon de valve revissé, vous avez terminé !', 'Pneus'),

('Nettoyer son vélo correctement', '7iul7qzb9bw', 'Etape 1 : Nettoyer le cadre 

Pour nettoyer le cadre, mouillez-le avec un jet d’eau et une pression peu élevée. Cela évite la rouille des câbles (cf voir conseil 8). 
Il est vivement conseillé de commencer par les parties grasses comme la chaine ou la transmission. Cela vous évitera de revenir plusieurs fois sur les parties étant en contact avec la chaine.  
Nettoyer ensuite votre cadre avec du savon ainsi que la transmission, la chaine et les jantes.  
Vous pouvez utiliser différents types de brosses afin d’atteindre les zones exiguës du cadre.  

Etape 2 : Rincer et sécher  

Une fois le vélo bien nettoyé, vous pouvez le rincer en faisant attention de ne pas utiliser un jet trop fort. Vous pouvez ensuite sécher votre vélo à l’aide d’un chiffon. Cela éviter l’infiltration de l’eau dans le cadre.  

Etape 3 : Polish et protection 

Lorsque votre vélo est sec, vous avez la possibilité d’appliquer une solution polish afin de protéger la peinture de votre cadre. Cela lui donnera également un effet brillant. Ce type de produit est à appliquer avec un chiffon doux sec. Faites très attention à ne pas en appliquer sur vos jantes ou vos disques de frein. Il s’agit généralement de produit très gras et par conséquent glissant.', NULL),

('Nettoyer et rengraisser sa chaîne', 'I2P9VGdjC2I', '1ere étape : Dégraisser la chaine 
Dans un premier temps, l’objectif est de dégraisser votre chaine. Pour cela vous pouvez utilisez des produits adaptés vendu en magasin. Mettez du produit sur la chaine, passez un chiffon sur la chaine, jusqu’à que celle-ci soit propre. Vous pouvez également mettre du dégraissant dans le chiffon plutôt que sur la chaine.  

2eme étape Nettoyer au savon (facultative)  

Il est également parfois nécessaire de nettoyer votre vélo avec du savon. Cela s’avère parfois nécessaire lorsque votre chaine est très sale. Vous pouvez également réaliser cette étape avant la première. Cela vous permettra d’économiser du dégraissant.  

3eme étape : Regraisser  

Lorsque votre chaine est propre, vous devez régresser votre chaine. Pour cela deux options s’offrent à vous : 
Utilisation de graisse dite « classique ». L’avantage de celle-ci est qu’elle sera durable dans le temps. Vous n’aurez besoin de regraisser qu’une fois par mois environ (en fonction de votre utilisation du vélo). Celle-ci a cependant tendance à être moins efficace que le lubrifiant. 
Le lubrifiant est plus « gras » que la graisse, il est donc plus efficace et salit moins les doigts dans le cas où vous déraillez. Cependant, il sera nécessaire de nettoyer et re lubrifier plus régulièrement (environ toutes les semaines ou toutes les deux semaines).', 'Chaîne'),

('Les choses à ne pas faire', NULL,
'- Pour nettoyer votre vélo, il est fortement déconseillé d’utiliser du white Spirit. C’est un produit beaucoup trop agressif pour votre cadre comme pour votre chaine ou dérailleur. 
- Lors du nettoyage de votre vélo, évitez d’utiliser un jet trop fort. L’eau peut venir s’infiltrer dans les câbles de freins ou de dérailleur et rouiller avec le temps.', NULL),

('Vérifier la hauteur de selle', 'N4U9ajY8jrQ', 'Pour vérifier si la hauteur de selle est bonne il y a deux façons de procéder : 
Asseyez-vous sur la selle, posez un pied à terre. Vous devez toucher le sol avec la pointe du pied. Si ce n’est pas le cas, montez ou descendez la selle en fonction de votre besoin. 
Montez sur la selle, mettez les deux pieds sur les pédales en vous tenant à un objet fixe. 
Mettez le pédalier à l’horizontale. Vous devez avoir les jambes qui forment un angle droit. 
Si ce n’est pas le cas, montez ou descendez la selle en fonction de votre besoin.', 'Selle'),

('Déterminer l’usure des disques de frein', NULL, 'Pour connaitre l’usure de vos disques, il vous suffit de mesurer l’épaisseur de vos disques.
En fonction de la pratique (VTT, route, gravel…), celle-ci peut varier entre 1.5mm à 2mm. 
Ainsi, si vous avez une épaisseur inférieure à 1.5mm, il sera nécessaire de changer votre disque. 
Il est important de noter que l’usure du disque est rare. 
Il n’est donc pas nécessaire de vérifier en permanence son épaisseur.  
Une autre façon de vérifier l’état de vos disques (et même de vos freins) réside en la qualité du freinage. 
Si vous sentez une baisse de la puissance de freinage, faites un check up de vos freins et de vos disques.', 'Freins'),

('Quand purger les freins à disques', NULL, 'En purgeant le circuit hydraulique de vos freins chaque année, vous vous assurez qu’ils fonctionnent correctement, qu’ils offrent la meilleure sensation possible et qu’ils ne perdent pas de puissance. 
Le rinçage consiste à retirer le liquide de frein usé (généralement de l’huile minérale, bien que des marques comme SRAM utilisent du synthétique qui retarde la surchauffe) et à le remplacer par du neuf. 
Cette action annuelle peut être considérée comme une référence générale. Toutefois, si vous utilisez vos freins de manière intensive, que vous descendiez fréquemment des cols de montagne sur la route ou que vous pratiquiez l’enduro ou la descente en VTT, nous vous recommandons de les purger tous les six mois environ. 
Toutefois, si vous constatez une perte de puissance ou de sensation de freinage, vous devez procéder à un remplacement d’urgence des freins.', 'Freins'),

('Vérifier l’état d’usure la cassette', NULL,
 'Il faut vérifier l’état d’usure des dents de votre cassette.
Celles-ci doivent avoir une forme plate sur leur dessus. Si les dents ont une forme pointues comme une dent, c’est que la cassette doit être changée.
En général, une cassette se change vers les 10000kms.', 'Cassette'),

(' Changer les plaquettes des freins à disque sur un vélo à disque', NULL,
'Retirez la vis ou la goupille qui maintient les plaquettes en place dans l’étrier avec l’outil adapté, selon le modèle de freins.
Sortez les plaquettes (selon les modèles, par le haut ou par le bas).
Nettoyez l’intérieur de l’étrier avec une bombe de nettoyant.
Nettoyez les plaquettes au papier de verre, ou changez-les.
Replacez les plaquettes en n’oubliant pas leur ressort de rappel sous forme de lamelle.
Refixez la vis ou la goupille qui assure leur maintien et freinez plusieurs fois pour ôter le jeu.
Dégraissez le disque et contrôlez son serrage sur le moyeu.
Remontez la roue et faites-la tourner après avoir actionné le levier.
Si le disque frotte en continu, réglez le centrage de l’étrier de frein.
S’il frotte par intermittence, essayez de le dévoiler avec une clé dégraissée, par petite torsion.', 'Plaquettes'),

('Déglacer ses plaquettes de freins', NULL,
'Etape 1 : Démonter les plaquettes

Commencez par démonter vos plaquettes comme décrits dans le conseil « Changer ses plaquettes de frein ».

Etape 2 : Comment savoir si vos plaquettes sont « gelées »

Le gèle des plaquettes se fait lorsque celles-ci surchauffent due à un freinage trop appuyé.
Il y a deux façons de savoir si vos plaquettes sont gelées :
- Lorsque vous freinez, vos plaquettes font un grincement très aigues
- Lorsque vous les démontez, elles ont une apparence très brillante.
Pour les « déglacer », prenez du papier de verre et frottez-les jusqu’à ce que l’apparence brillant disparaisse. Une fois cette étape effectuée, vous pouvez remonter vos plaquettes.
', 'Plaquettes'),

('Nettoyer vos plaquettes de freins', NULL,
'Etape 1 : Démonter les plaquettes

 Commencez par démonter vos plaquettes comme décrits dans le conseil « Changer ses plaquettes de frein ».

 Etape 2 : nettoyer les plaquettes :

 Prenez de l’acétone ou un dégraissant. Mettez vos plaquettes à tremper dans l’acétone (environ 1 minute) ? sortez-les et nettoyez-les à l’aide d’un chiffon. Répétez cette opération 2 à 3 fois jusqu’à qu’il n’y ai plus de traces sur votre chiffon.
 Une fois propre, remontez vos plaquettes.
', 'Plaquettes'),

('Régler son dérailleur arrière', NULL,
'Etape 1 : Régler les butées

 Les butées sont les premiers éléments à régler sur votre dérailleur arrière. Petit rappel : les butées définissent la course du dérailleur du petit au grand pignon et évitent que la chaîne ne saute. Elles sont bien réglées lorsque le dérailleur se déplace de haut en bas sans dérailler et lorsqu’on n’entend pas de cliquetis sur le plus petit et le plus grand pignon.
 – Réglage de la butée côté petit pignon (butée High, ou butée basse) : alignement de la chaine et du galet-guide avec le petit pignon
 – Réglage de la butée côté grand pignon (butée Low, ou butée haute) : alignement de la chaine et du galet-guide avec le grand pignon

 Etape 2 : Régler la tension du câble de dérailleur

 Avant de régler la tension du câble, nous vous conseillons de desserrer le câble, puis de positionner la molette de réglage à la moitié de sa course. Ce petit détail est très utile pour ajouter ou enlever de la tension par la suite.
 1. positionnez votre chaine sur le petit pignon et le deuxième plateau

 2. tirez à la main le câble de dérailleur et tendez-le, puis ajustez la vis de serrage

 3. testez le passage de vitesses

 4. affinez le réglage de tension avec la molette pour trouver le bon réglage

 Si les vitesses peinent à monter : ajoutez de la tension à l’aide de la molette.
 Si les vitesses peinent à descendre : enlevez de la tension à l’aide de la molette.
 Le réglage se fait petit à petit, en testant le passage de vitesses et ajoutant/enlevant de la tension de câble !', 'Dérailleurs'),

('Régler son dérailleur avant', NULL,
'La plupart du temps, votre dérailleur avant est livré avec une cale en plastique placée dans le mécanisme afin de le maintenir dans la position pour le réglage, veillez donc à ne pas la retirer pour le moment. Le réglage se fait avec le câble de dérailleur libéré.
 - Pour un dérailleur à collier, dans un premier temps alignez la fourchette de votre dérailleur de sorte à ce quelle soit parallèle à vos plateaux.

 - Réglez ensuite la hauteur du dérailleur ; la partie extérieure de la fourchette doit être entre 1 et 3 mm au-dessus de la dent la plus haute du grand plateau.

 - À présent bien positionné, serrez la vis de maintien du dérailleur au couple indiqué par le fabricant puis sortez la cale de montage s’il y en avait une.

 - Placez la chaîne sur le plus grand pignon à l’arrière et sur le plus petit plateau à l’avant puis réglez la butée basse du dérailleur avant (vis "L", pour Low) de sorte à positionner la partie interne de la fourchette à 2 mm de la chaîne.

 - Vissez complètement la molette de tension au niveau de la commande de vitesses puis dévissez-la de 2 tours.

 - Bloquez à présent le câble de commande sur le dérailleur en le tendant légèrement à la main.

 - Placez la chaîne sur le plus petit pignon à l’arrière et sur le plus grand plateau à l’avant puis réglez la butée haute du dérailleur avant (vis "H", pour High) de sorte à positionner la partie externe de la fourchette à 2 mm de la chaîne.
  Un réglage parfait des butées évite que la chaîne ne frotte contre la fourchette mais empêche aussi que celle-ci ne déraille.

 - Réglez la tension du câble à l’aide de la molette sur la commande de vitesse. Si la vitesse ne monte pas, cela veut dire qu’il manque de tension. Si elle ne descend pas, cela vous indique qu’il y a trop de tension.
  Pour faciliter le réglage final, lubrifiez votre transmission.', 'Dérailleurs'),

('Entretenir sa batterie', NULL,
'- Evitez les cycles de charge/décharge trop importants. Si votre batterie se trouve en dessous de 20% d’autonomie, rechargez-là, n’attendez pas de tomber à moins de 5%. De même lors d’une recharge, n’allez pas jusqu’à 100%, arrêtez-vous entre 90 et 95%. Votre batterie gagnera ainsi en durée de vie.

 - Il est également recommandé d’acheter les batteries de la marque de votre vélo. Celles-ci sont parfaitement adaptées à votre vélo et auront une meilleure durée de vie qu’une batterie d’un constructeur externe.

 - Evitez de l’utiliser dans des températures trop hautes ou trop basses. Elle doit être stockée entre 5°C et 25°C.

 - Lorsque votre batterie est en fin de vie, pensez à la ramener chez votre constructeur pour que celle-ci soit recyclée.', 'Batterie'),

('Nettoyer les roulements du vélo', NULL,
'- Commencer par démonter les roulements. Cela se fait simplement à l’aide d’une clé Allen.
 - Comme pour les plaquettes de frein, mettez-les à tremper quelques secondes dans de l’acétone ou nettoyez-les à l’aide d’un dégraissant. Frottez à l’aide d’un chiffon. Répétez cette opération jusqu’à qu’il n’y est plus de traces sur votre chiffon.
 Remontez vos roulements', 'Roulements'),

 ('Entretenir ses jantes', NULL,
 'Pour entretenir ses jantes, vous devez

 - Nettoyer vos jantes
 - Inspecter leurs états', 'Jantes'),

 ('Entretenir ses roues', NULL,
 'Pour entretenir vos roues de vélos, vous devez

 - Nettoyer vos jantes
 - Inspecter leurs états
 - Faire une révision des moyeus
 - Faire une révision des roulements
 - Vérifier la tension des rayons
 - Vérifier que les roues ne sont pas voilés', 'Roues'),

 ('Entretenir votre transmission', 'I2P9VGdjC2I',
 'Avant de commencer il faut protéger le disque avec un chiffon propre.

 Ensuite vous devez :

 - Dégraisser la transmission (cassette, chaîne, roulettes de dérailleurs)
 - Laisser agir le produit
 - Rincer le transmission puis laisser sécher
 - Lubrifier la chaîne', 'Transmission');

CREATE OR REPLACE FUNCTION get_last_changed_date(compo_id VARCHAR)
RETURNS DATE AS $$
DECLARE change_date DATE;
BEGIN
	SELECT INTO change_date 
		CASE WHEN MAX(changed_at) IS NULL 
			THEN (SELECT added_at
				FROM bikes, bikes_components
				WHERE bikes.bike_id = bikes_components.fk_bike
				AND bikes_components.fk_component = compo_id)
			ELSE MAX(changed_at)
		END
	FROM components_changed
	WHERE components_changed.fk_component = compo_id;
	RETURN change_date;
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE PROCEDURE delete_bike(b_id VARCHAR)
AS $$
DECLARE 
compo_id components.component_id%TYPE;
compo_curs CURSOR FOR 
	SELECT DISTINCT components.component_id
	FROM bikes_components, components
	WHERE bikes_components.fk_bike = b_id
	AND bikes_components.fk_component = components.component_id;
BEGIN 
	OPEN compo_curs;
	LOOP 
		FETCH compo_curs INTO compo_id;
		DELETE FROM components WHERE component_id = compo_id;
		EXIT WHEN NOT FOUND compo_curs;
	END LOOP;
    CLOSE compo_curs;
	
	DELETE FROM bikes WHERE bikes.bike_id = b_id;
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION get_km_since_changed_date(compo_id VARCHAR, changed_at DATE)
RETURNS NUMERIC AS $$
DECLARE km bikes.average_km_week%TYPE;
BEGIN
	SELECT average_km_week INTO km
	FROM bikes, bikes_components
	WHERE bikes.bike_id = bikes_components.fk_bike
	AND bikes_components.fk_component = compo_id;
	
	RETURN DATE_PART('day', NOW() - changed_at::TIMESTAMP) * (km / 7);
END;
$$ LANGUAGE PLPGSQL;

CREATE TABLE diagnostic (
	id SERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	bike_type VARCHAR(50),
	component VARCHAR(50) NOT NULL,
	content TEXT NOT NULL
);

INSERT INTO diagnostic (title, bike_type, component, content)
VALUES 
('Vérification de la pression des pneus', 'Ville', 'Pneus', 'La pression des pneus de votre vélo doit être entre 3.5 et 6 bars'),
('Vérification de la pression des pneus', 'VTT', 'Pneus', 'La pression des pneus de votre vélo doit être entre 3 et 4 bars'),
('Vérification de la pression des pneus', 'Route', 'Pneus', 'La pression des pneus de votre vélo doit être entre 6 et 8 bars'),
('Vérification de l’usure des pneus', NULL, 'Pneus', 'Vérifier que le pneu n’est pas craqué, déchiré ou que des fissures soit apparentes'),
('Vérification des roues', NULL, 'Roues', 'Vérifier l’état des rayons de votre vélo, ceux-ci doivent être bien droits'),
('Vérification des jantes', NULL, 'Jantes', 'Vérifier qu’il n’y a pas d’impact ou de fissure au niveau de la jante'),
('Vérification de la transmission', NULL, 'Transmission', 'Vérifier le bon état des dents des plateaux, pignons. Celles-ci ne doivent pas être arrondies ou déformées'),
('Vérification de la transmission', NULL, 'Transmission', 'Vérifier le passage des vitesses, celui-ci doit-être rapide et sans bruit. Les tester une à une'),
('Vérification de la chaîne', NULL, 'Chaîne', 'Vérifier que la chaîne est bien tendue'),
('Vérification des freins', NULL, 'Freins', 'Vérifier que les câbles soient ni effilochés, ni déformés, ni abimés');

CREATE TABLE repairs (
    id SERIAL PRIMARY KEY,
    repair_at DATE NOT NULL,
    reason VARCHAR(1000),
    price NUMERIC NOT NULL,
    fk_component VARCHAR NOT NULL REFERENCES components(component_id) ON DELETE CASCADE
);