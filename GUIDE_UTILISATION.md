# 📖 Guide d'Utilisation - Portfolio AGBALENYO Clement

## 🚀 Démarrage Rapide

### Option 1: Ouvrir Directement (Recommandé)
1. Double-cliquez sur le fichier `index.html`
2. Le portfolio s'ouvrira dans votre navigateur par défaut
3. Profitez de l'expérience interactive!

### Option 2: Serveur Local (Pour le développement)
```bash
# Avec Python
cd "C:\Users\Clement AGBALENYO\Documents\Professionnal\Portofolio"
python -m http.server 8000

# Puis ouvrez: http://localhost:8000
```

## 🎯 Navigation dans le Portfolio

### Menu Principal
Utilisez le menu de navigation en haut pour accéder rapidement aux sections:
- **Accueil** - Page d'accueil avec présentation
- **À Propos** - Votre parcours et passion
- **Formation** - Timeline de votre formation
- **Compétences** - Vos domaines d'expertise
- **Projets** - Carousel de vos projets majeurs
- **Galerie** - Photos de tous vos projets
- **Expérience** - Votre parcours professionnel
- **Contact** - Vos liens sociaux et email

### Navigation au Clavier
- **Espace / Flèche Bas / Flèche Droite**: Section suivante
- **Flèche Haut / Flèche Gauche**: Section précédente
- **Escape**: Fermer la lightbox

### Sur Mobile
- **Menu Burger** (☰): Ouvrir le menu de navigation
- **Swipe**: Naviguer dans le carousel de projets
- **Tap**: Ouvrir les images en plein écran

## 📸 Utilisation de la Galerie

### Voir une Photo en Grand
1. Allez dans la section **Galerie**
2. Cliquez sur n'importe quelle photo
3. La photo s'ouvre en plein écran (lightbox)
4. Cliquez sur le bouton ✕ ou appuyez sur Escape pour fermer

### Photos Disponibles
- **Projets techniques**: Bras robotique, Black Hole, NESSO
- **Événements**: Conférences, présentations, pitchs
- **Compétences**: Beatmaking, formation, instruction
- **Branding**: Logos Nova Luz, ESIG App, NESSO

## 🎠 Carousel de Projets

Le carousel défile automatiquement toutes les 5 secondes.

### Contrôles
- **← Flèche Gauche**: Projet précédent
- **→ Flèche Droite**: Projet suivant
- **Points**: Cliquez pour aller directement à un projet
- **Hover**: Pause automatique sur survol

### Projets Présentés
1. **Bras Robotique Intelligent** - Mécatronique & Automatisation
2. **Black Hole (Blender)** - 3D Modeling & VFX
3. **Nova Luz** - Label Musical
4. **Application ESIG** - Gestion d'Atelier
5. **NESSO** - Entreprise d'Innovation

## 🔗 Liens Sociaux

Vos liens sociaux sont accessibles dans la section **Contact**:

### LinkedIn
[https://www.linkedin.com/in/clément-kokou-agbalenyo-123304342](https://www.linkedin.com/in/clément-kokou-agbalenyo-123304342)

### Facebook
[https://www.facebook.com/share/17woH4XVWQ/](https://www.facebook.com/share/17woH4XVWQ/)

### Instagram
[@monarch_ashborn1](https://www.instagram.com/monarch_ashborn1?igsh=MTFoZzBqaXFteWJ6ZQ==)

### Email
[agbalenyoclementkokou@gmail.com](mailto:agbalenyoclementkokou@gmail.com)

## 🎨 Personnalisation

### Modifier les Images
Pour remplacer une image:
1. Placez votre nouvelle image dans le dossier `images/`
2. Ouvrez `index.html` dans un éditeur de texte
3. Cherchez le nom de l'ancienne image (ex: `page1_img4.png`)
4. Remplacez-le par le nom de votre nouvelle image
5. Sauvegardez et rechargez la page

### Modifier le Contenu
1. Ouvrez `index.html` dans un éditeur de texte (VS Code, Notepad++, etc.)
2. Cherchez la section à modifier (ex: "À Propos", "Projets")
3. Modifiez le texte entre les balises HTML
4. Sauvegardez et rechargez la page

### Modifier les Liens Sociaux
Les liens sont dans la section "Contact":
```html
<a href="VOTRE_LIEN_LINKEDIN" target="_blank">
    <i class="fab fa-linkedin-in"></i>
</a>
```

## 📱 Responsive Design

Le portfolio s'adapte automatiquement à tous les écrans:

### Desktop (> 1024px)
- Menu complet en haut
- Layout en colonnes multiples
- Hover effects complets

### Tablette (768px - 1024px)
- Menu adapté
- Colonnes réduites
- Navigation tactile

### Mobile (< 768px)
- Menu burger
- Layout en une colonne
- Navigation optimisée pour le tactile

## 🎬 Animations

Le portfolio utilise plusieurs types d'animations:

### Au Chargement
- **Écran de chargement** avec logo animé
- **Barre de progression** qui se remplit

### Au Scroll
- **Fade Up**: Les éléments apparaissent de bas en haut
- **Fade Right**: Apparition de droite à gauche
- **Fade Left**: Apparition de gauche à droite

### Au Hover
- **Scale**: Les cartes grossissent légèrement
- **Border Color**: Changement de couleur de bordure
- **Shadow**: Ombres lumineuses dorées

### Badges Flottants
- Animation de "float" perpétuelle
- Effet de lévitation

## 🌐 Déploiement en Ligne

### GitHub Pages (Gratuit)
1. Créez un compte GitHub
2. Créez un nouveau repository "portfolio"
3. Uploadez tous les fichiers
4. Activez GitHub Pages dans les settings
5. Votre site sera en ligne à: `username.github.io/portfolio`

### Netlify (Gratuit)
1. Créez un compte sur netlify.com
2. Drag & drop le dossier complet
3. Votre site est en ligne en quelques secondes!

### Vercel (Gratuit)
1. Créez un compte sur vercel.com
2. Importez votre projet
3. Déploiement automatique

## 🔧 Dépannage

### Les images ne s'affichent pas
- Vérifiez que le dossier `images/` est au même niveau que `index.html`
- Vérifiez les noms de fichiers (sensibles à la casse)
- Essayez d'ouvrir avec un serveur local

### Le carousel ne fonctionne pas
- Vérifiez votre connexion internet (Swiper.js est chargé depuis un CDN)
- Rechargez la page (Ctrl + F5)
- Essayez un autre navigateur

### Le menu mobile ne s'ouvre pas
- Vérifiez que JavaScript est activé dans votre navigateur
- Essayez de recharger la page
- Testez sur un autre appareil

### Les animations ne fonctionnent pas
- Vérifiez votre connexion internet (AOS est chargé depuis un CDN)
- Désactivez les économies de données
- Rechargez la page complètement

## 📞 Support

Pour toute question ou problème:
- **Email**: agbalenyoclementkokou@gmail.com
- **LinkedIn**: Message direct sur mon profil

## 🎓 Conseils d'Utilisation

### Pour Montrer à des Recruteurs
1. Envoyez le lien de votre portfolio en ligne
2. Ou envoyez le dossier complet en ZIP
3. Mentionnez que c'est consultable hors ligne

### Pour une Présentation
1. Ouvrez le portfolio avant la présentation
2. Utilisez le mode plein écran (F11)
3. Naviguez avec les touches du clavier
4. Préparez vos transitions entre sections

### Pour des Impressions
1. Ouvrez dans Chrome ou Firefox
2. Allez dans Fichier > Imprimer
3. Sélectionnez "Enregistrer en PDF"
4. Vous obtenez une version PDF du portfolio

## ✨ Fonctionnalités Premium

### Citation Dynamique
Votre citation "Qui ne tente rien n'a rien" est mise en valeur avec:
- Typo grande et stylée
- Animations au scroll
- Icône de citation dorée

### Badges Flottants
Dans la section héro:
- "CEO @ NESSO"
- "Innovateur"
- Animation de flottement

### Lightbox Interactive
Cliquez sur n'importe quelle image pour:
- Vue en plein écran
- Zoom conservé
- Navigation au clavier

## 🎯 Prochaines Étapes

### Ajouts Recommandés
1. **Blog**: Ajoutez une section blog pour partager vos articles
2. **Témoignages**: Ajoutez des témoignages de clients/collègues
3. **Vidéos**: Intégrez des vidéos de vos projets
4. **Analytics**: Ajoutez Google Analytics pour suivre les visites

### Optimisations
1. **SEO**: Ajoutez des meta descriptions et mots-clés
2. **Performance**: Compressez les images
3. **Accessibilité**: Ajoutez des attributs ARIA
4. **Multilingue**: Ajoutez une version anglaise

---

**© 2026 AGBALENYO Clement**

💡 **Astuce Finale**: Mettez à jour régulièrement votre portfolio avec vos nouveaux projets et réalisations!
