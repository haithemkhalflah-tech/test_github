# Zombie Killer

Zombie Killer est un petit jeu web où un zombie se déplace aléatoirement dans une zone. Le joueur doit cliquer dessus le plus vite possible pendant un temps limité pour maximiser ses clics par seconde (CPS) et débloquer différents rangs.

## Technologies utilisées

- HTML5
- CSS3
- JavaScript
- 
- Git et GitHub
- GitHub Pages (déploiement)

## Fonctionnalités principales

- Choix de la durée de la partie : 5s, 10s, 30s, 60s ou temps personnalisé
- 3 niveaux de difficulté : Easy, Medium, Hard (vitesse et distance de déplacement du zombie)
- Déplacement aléatoire du zombie avec distance minimale selon la difficulté
- Compteur de tirs réussis, meilleur record
- Calcul du CPS (clics par seconde) et attribution d’un rang :
  - Slow Zombie, Walker, Hunter, Exterminator, Demon Slayer
- Effets visuels (flottement, secousse, changement d’image quand le zombie est touché)
- Effets sonores :
  - tir sur le zombie
  - musique de fond (bouton on/off)
  - son sur chaque bouton
- Interface responsive

## Lien GitHub Pages

Version jouable en ligne :  
https://haithemkhalflah-tech.github.io/test_github/

## Nouveautés explorées

Pendant ce projet, j’ai découvert et pratiqué :

- La manipulation du DOM (sélecteurs, événements, mise à jour dynamique du texte)
- La gestion du temps avec `setInterval` / `clearInterval`
- Le calcul de positions et de distances en utilisant `getBoundingClientRect()` et le théorème de Pythagore
- La gestion de sons avec les balises `<audio>` (play, pause, loop, volume)
- La différence entre `click` et `mousedown` pour capter les clics sur un élément qui bouge
- Le déploiement d’un site avec GitHub Pages

## Difficultés rencontrées

- Certains clics sur le zombie n’étaient pas comptés lorsqu’il bougeait au moment du clic
- Gérer les déplacements aléatoires sans faire sortir le zombie de la zone de jeu
- Éviter que le zombie ne se déplace de seulement quelques pixels (mouvements trop petits)
- Faire fonctionner correctement les sons (chemins des fichiers, restrictions des navigateurs, volume)
- Organiser le code JS pour qu’il reste lisible et facile à maintenir
- Comprendre le flux Git (status, add, commit, push) et la configuration de GitHub Pages

## Solutions apportées

- Passage de l’événement `click` à `mousedown` sur le zombie pour valider le tir dès que le bouton de la souris est pressé
- Utilisation de `getBoundingClientRect()` pour calculer `maxX` et `maxY` et limiter les positions du zombie à l’intérieur du playfield
- Calcul d’une distance minimale entre l’ancienne et la nouvelle position, dépendante de la difficulté (easy/medium/hard)
- Ajout et configuration de plusieurs balises `<audio>` (hit, musique, boutons) et réinitialisation du temps avec `currentTime = 0` avant chaque `play()`
- Séparation du code JS en fonctions claires (`startGame`, `tick`, `moveZombieRandom`, `updateUI`, etc.) et ajout de commentaires
- Recherche de documentation (MDN, articles, tutos) et tests progressifs pour comprendre Git, GitHub et GitHub Pages

