# Zombie Killer

Zombie Killer est un petit jeu web où un zombie se téléporte aléatoirement dans une zone de jeu, et où le joueur doit cliquer dessus le plus vite possible pendant un temps limité pour maximiser ses clics par seconde (CPS) et débloquer différents rangs.

## Technologies utilisées

- HTML5  
- CSS3  
- JavaScript (vanilla)  
- Git et GitHub  
- GitHub Pages (déploiement)

## Fonctionnalités principales

- Choix de la durée de la partie : 5s, 10s, 30s, 60s ou temps personnalisé saisi par le joueur.  
- 3 niveaux de difficulté : Easy, Medium, Hard, qui changent la fréquence de déplacement du zombie (plus la difficulté est élevée, plus il se déplace souvent).  
- Déplacement entièrement aléatoire du zombie à l’intérieur du playfield, sans qu’il ne sorte de la zone visible.  
- Compteur de tirs réussis, meilleur record et calcul automatique du CPS (clics par seconde).  
- Attribution d’un rang en fonction du CPS : Slow Zombie, Walker, Hunter, Exterminator, Demon Slayer.  
- Effets visuels (flottement, secousse, changement d’image quand le zombie est touché).  
- Effets sonores :
  - tir sur le zombie  
  - musique de fond avec bouton on/off  
  - son de clic sur chaque bouton  
- Interface responsive utilisable sur ordinateur, tablette et mobile.

## Lien GitHub Pages

Version jouable en ligne :  
https://haithemkhalflah-tech.github.io/test_github/

## Nouveautés explorées

Pendant ce projet, j’ai découvert et pratiqué :

- La manipulation du DOM (sélecteurs, événements, mise à jour dynamique du texte et des styles).  
- La gestion du temps avec `setInterval` / `clearInterval` pour le compte à rebours et la boucle de déplacement du zombie.  
- Le calcul de positions dans la zone de jeu en utilisant `getBoundingClientRect()` et `Math.random()`.  
- La gestion de sons avec les balises `<audio>` (play, pause, loop, volume, remise à zéro avec `currentTime = 0`).  
- La différence entre `click` et `mousedown` pour bien capter les tirs sur un élément qui bouge.  
- Le déploiement d’un site statique avec GitHub Pages à partir d’un dépôt GitHub.

## Difficultés rencontrées

- Certains clics sur le zombie n’étaient pas comptés lorsqu’il bougeait au moment du clic.  
- Gérer les déplacements aléatoires sans faire sortir le zombie de la zone de jeu.  
- Éviter que le zombie ne se déplace de seulement quelques pixels (mouvements trop petits ou peu visibles).  
- Faire fonctionner correctement les sons (chemins des fichiers, restrictions des navigateurs, volume).  
- Organiser le code JavaScript pour qu’il reste lisible et facile à maintenir.  
- Comprendre le flux Git (`status`, `add`, `commit`, `push`) et la configuration de GitHub Pages.

## Solutions apportées

- Passage de l’événement `click` à `mousedown` sur le zombie pour valider le tir dès que le bouton de la souris est pressé.  
- Utilisation de `getBoundingClientRect()` pour calculer la taille de la zone de jeu et limiter les positions du zombie à l’intérieur du playfield.  
- Simplification de la logique de déplacement : chaque saut choisit une nouvelle position aléatoire, et la difficulté ne modifie plus que l’intervalle entre deux déplacements.  
- Ajout et configuration de plusieurs balises `<audio>` (hit, musique, boutons) et réinitialisation de `currentTime` avant chaque `play()` pour que les sons repartent bien du début.  
- Séparation du code JS en fonctions claires (`startGame`, `tick`, `moveZombieRandom`, `updateUI`, etc.) et ajout de commentaires pour expliquer chaque partie.  
- Mise en place d’un workflow Git basique (modification → `git add` → `git commit` → `git push`) et configuration de GitHub Pages pour rendre le jeu accessible en ligne.
