# Comment j'ai créé PyVault 🔐

**PyVault** est un gestionnaire de mots de passe local écrit en Python. L'objectif était simple : construire un outil *réel* qui chiffre des secrets sur ta machine, et pas juste un script de démonstration. Voici comment il est né.

## L'idée

Je voulais un projet qui touche à plusieurs domaines à la fois : la cryptographie, les bases de données, l'architecture d'une application et même le web. Plutôt que de suivre des tutoriels calqués, j'ai décidé de me confronter aux vrais problèmes : chiffrer, stocker, retrouver, exporter, et documenter le tout.

Le principe : un utilitaire en ligne de commande (`python main.py`) capable d'ajouter, lister, déchiffrer, chercher et supprimer des mots de passe — sans jamais les stocker en clair.

## La crypto : Fernet et DPAPI

Pour le chiffrement, j'utilise **Fernet** de la bibliothèque `cryptography`. Fernet est déclaratif : vous générez une clé, vous chiffrez, vous déchiffrez. Une clé se génère comme ça :

```python
from cryptography.fernet import Fernet

key = Fernet.generate_key()
cipher = Fernet(key.encode())

encrypted = cipher.encrypt(b"mon_mot_de_passe")
plain = cipher.decrypt(encrypted)
```

Le vrai problème, c'est où stocker la clé. La stocker en clair dans un fichier revient à laisser la porte ouverte. Sur Windows, j'utilise donc les fonctions **DPAPI** du module `dpapi_utils.py` : la clé brute est protégée par le compte utilisateur Windows avant d'être écrite sur le disque.

```python
from dpapi_utils import protect, unprotect

protected = protect(key)     # chiffré par le compte Windows
write_key_file(protected)    # jamais la clé en clair

key = unprotect(read_key_file())
```

## Le stockage : SQLite

Fini les fichiers textes empilés : les mots de passe chiffrés sont maintenant insérés dans une base **SQLite** (`secret/passwords.db`). Chaque commande (`add`, `list`, `decrypt`, `search`, `delete`) interroge la base. Gérer les doublons (plusieurs mots de passe pour le même site) a été un petit casse-tête très instructif.

## Le portage JavaScript : ferret.js

La partie la plus intéressante techniquement : j'ai ré-implémenté le format de token **Fernet en JavaScript** (`docs/static/js/fernet.js`) avec la **Web Crypto API** (AES-CBC + HMAC-SHA256). Résultat : un token créé dans le navigateur peut être déchiffré par la CLI Python, et inversement. Le site déployé sur GitHub Pages contient un terminal interactif qui reproduit le comportement de la CLI, avec une interface français / japonais.

## Ce que ça m'a appris

- La cryptographie ne se limite pas à appeler `encrypt()` : la gestion des clés est 90 % du travail.
- Une base de données vaut mieux qu'une pile de fichiers dès que les données grossissent.
- Un même format (Fernet) peut vivre dans deux langages s'il est bien spécifié.
- Documenter (README, benchmark, tests unitaires) rend un projet open-source crédible.

> ⚠️ **PyVault** est un projet d'apprentissage, pas un produit de production. Sans mot de passe maître, aucune solution ne protège réellement les données d'un attaquant avec accès à la session. C'est justement l'objet de la phase suivante du projet.

Le code complet est ici : [github.com/KirobotDev/PyVault](https://github.com/KirobotDev/PyVault). N'hésitez pas à ouvrir une issue pour proposer des améliorations.

## Mots-clés

`python` · `cryptography` · `fernet` · `sqlite` · `cli` · `cybersecurity` · `password-manager` · `dpapi` · `javascript`

<p class="post-meta"><time datetime="2026-09-05">5 septembre 2026</time></p>
