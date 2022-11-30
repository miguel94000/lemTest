# lemTest

En utilisant Meteor.js avec Blaze comme framework front, afficher une liste d'export qui répond aux règles suivantes :
- Un bouton "Export" permet de démarrer de façon asynchrone un nouvel export
- La page affiche la liste des exports avec leur progression
- Une fois l'export terminé, la liste doit afficher l'URL du résultat

Un export se définit de la façon suivante :
- Un export est terminé lorsqu'il atteint 100%
- Il avance de 5% chaque seconde
- Arrivé à 100%, il sélectionne une url au hasard parmi les urls suivantes
https://www.lempire.com/
https://www.lemlist.com/
https://www.lemverse.com/
https://www.lemstash.com/
