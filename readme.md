# Minecraft Experience
Par Pierre Grardel
Minecraft Experience est une experience en 3D WebGL avec Three.js reprenant le concept du jeux vidéo sandbox [Minecraft](https://minecraft.net)


---
## Getting started
* Faire un petit `npm i` pour importer Gulp et ses plugins nécessaires pour la compilation
* Complier a la racine avec `gulp build` ou `npm run build`
* Lancer un serveur en local pour éviter des erreurs cross origin
* Se rendre dans le dist pour lancer Minecraft Experience


---
## Technos/api utilisées
* HTML
* CSS
* JS
* Minecraft font
* Three.js
* TweenJS
* OBJLoader
* FirstPerson (fortement modifié et adapté au projet)
* BloomBlendPass (Shader)


---
## Features
* On peut cuir un steak mais il faut avant mettre un charbon dans le four
    * Il faut attendre quelques minutes pour la cuisson
    * Lorsque ce steak est cuit on peut le manger
* On peut manger une pomme
* On peut prendre dans notre main tous les objets (par terre, au mur, dans les cadres, dans les coffres) et les reposer un peu où on veut
* On peut allumer/éteindre des torches
* Particules (customs) et sons aléatoires de feux pour les fours et les torches
* On peut changer la musique principale du jeu en changeant le disque du Juxebox
* Création du background avec une projection sphérique d'une image à la "Streetview"
* Déplacement de la camera avec ZQSD ou WASD ou les flèches
* Mouvement de la caméra par la souris
* Utilisation de FirstPerson pour le controle de la caméra
* FirstPerson modifié pour ajouter un système de collision
* Activation/desactivation du son avec M (état sauvegardé en localstorage)
* Utilisation du gestionnaire de son avec spatialisation de Three.js
    * Cependant Three.js gère mal l'audio et de nombreux problèmes sonores peuvent arriver. Cela est prinipallement du à la volonté de Three d'optimisé la lecture du son par un buffer avec une mise en cache (cependant très instable) qui surcharge la mémoire alloué à cette page.
    * Je n'ai malheuresement pas eu le temps de partir sur une solution alternative (autre bibliothèque avec spatialisation à recodé)
* Accès aux commandes en appuyant sur Échap
* Possibilité de dormir pour passer en mode nuit/jour
* Utilisation du raycasting pour récupérer les objets visés et lancer des interactions
* Globalement le projet à été coder en objet pour permetre facilemment l'ajout de nouveaux blocks, items et autres interactions mais aussi pour créer d'autres pièces avec un agencement différent
* Utilisation de Font custom Minecraft
* Ajout d'un shader bloom pour adoucir le rendu


---
## Remarques
* Je pense par la suite ajouter un loader pour charger les textures, sons, obj, etc.
* Mais aussi ajouter beaucoup d'autres interactions très fun
* Je m'excuse vraiment pour le rendu sonore suite aux nombreux bugs de Three.js