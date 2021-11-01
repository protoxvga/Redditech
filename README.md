# Redditech Documentation (FR)

## Contexte

Projet de 3e année à Epitech réalisé en 4 semaines.

Le but: réaliser un client Reddit en react native en utilisant leur Api.

Total découverte du mobile et du react-native.
Satisfait du résultat pour 4 semaines, possibles améliorations a venir.

Principales librairies utilisées :

- Snoowrap (Wrapper de l'api reddit)
- Ui / Ux : React-navigation | react-native-paper | react-native-vector-icons...
- Utilitaire : react-native-dotenv | youtube-iframe | dayjs...

## Installation

Clonage du repo + installation des libs :

```git clone git@github.com:EpitechPromo2024/B-DEV-501-NCY-5-1-redditech-pierre.perrin.git```<br>
```cd B-DEV-501-NCY-5-1-redditech-pierre.perrin```<br>
```npm install```

Build la partie Android :

Démarrer android studio -> Open -> #Repo_du_projet -> Build

Sur un terminal dans le root du projet : ```npm start```

L'application s'installe alors sur votre téléphone ou AVD

## Galerie

<img src="https://github.com/protoxvga/Redditech/tree/master/Demo/Login.gif" alt="Databay showcase gif" title="Databay showcase gif" width="400"/>
<img src="https://github.com/protoxvga/Redditech/tree/master/Demo/Home.gif" alt="Databay showcase gif" title="Databay showcase gif" width="400"/>
<img src="https://github.com/protoxvga/Redditech/tree/master/Demo/Profile.gif" alt="Databay showcase gif" title="Databay showcase gif" width="400"/>
<img src="https://github.com/protoxvga/Redditech/tree/master/Demo/Search.gif" alt="Databay showcase gif" title="Databay showcase gif" width="400"/>

## Politique de test

GitHub Action qui effectue un npm install et vérifie que l'application build sur Android
