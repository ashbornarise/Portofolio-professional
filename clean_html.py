# Script pour nettoyer index.html et créer la version modulaire
import re

# Lire le fichier original
with open(r'c:\Users\Clement AGBALENYO\Documents\GitHub\Portofolio-professional\index_old.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Supprimer tout le CSS entre <style> et </style>
content = re.sub(r'<style>.*?</style>', '', content, flags=re.DOTALL)

# Supprimer tout le JS entre <script> et </script> (sauf les liens externes)
content = re.sub(r'<script>\s*//.*?</script>', '', content, flags=re.DOTALL)

# Ajouter le lien vers styles.css avant </head>
content = content.replace('</head>', '    <!-- Styles CSS -->\n    <link rel="stylesheet" href="css/styles.css">\n</head>')

# Ajouter le lien vers main.js avant </body>
content = content.replace('</body>', '    <!-- Main JavaScript -->\n    <script src="js/main.js"></script>\n</body>')

# Écrire le nouveau fichier
with open(r'c:\Users\Clement AGBALENYO\Documents\GitHub\Portofolio-professional\index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Fichier index.html nettoyé avec succès!")
print("📁 Structure modulaire créée:")
print("   - index.html (HTML pur)")
print("   - css/styles.css (Tous les styles)")
print("   - js/main.js (Tout le JavaScript)")
