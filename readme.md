# Installation

## Back

```sh
cd back && npm i && npm run dev
```

Il faudra créer un fichier `.env` à la racine du dossier back avec les variables envoyées par mail.

## Front

```sh
cd front && npm i && npm run dev
```
[Front](http://localhost:5173)

Pour avoir accès au côté tatoueur, il suffit de se connecter avec un compte google,
ce qui créera un compte tatoueur.
Chaque compte google créera un compte tatoueur unique, _il n'y a pas de vérification_

## Fonctionnalités

### Coté client

- On peut rechercher et filtrer sur la ville, le style et le nom du tatoueur. (c'est un **ou** logique)
- On peut réserver un flash, si le flash est déjà réservé, on ne peut pas le réserver.
- On peut voir les derniers flashs sur la page d'accueil.
- En cliquant sur un tatoueur, on peut voir ses flashs et réserver un créneau (on peut gérer qq erreurs dans le
  formulaire).
- Les flashs reservés sont grisés.

### Côté tatoueur

- Pour se connecter, il faut cliquer sur "Vous êtes tatoueur" et se connecter avec google.
- Il y a un système de redirection côté front qui nous permet de rediriger les utilisateurs
  non connecté vers la page de connexion si on essaie d'accéder à une page protégée.
- La page de connexion redirige vers la page qu'on essayait de viser après connexion.
- On peut ajouter un flash et le supprimer. ⚠️ les images sont publiées sur un S3 sur un compte gratuit.
- On a la confirmation visuelle de la réservation d'un créneau et d'un flash.
- On peut bloquer des créneaux (en ajoutant des réservations vides).
- On peut modifier nos informations de profil
- On peut se déconnecter 