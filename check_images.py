import os

def check_images():
    """Check if all required images exist"""

    required_images = [
        'page1_img4.png',  # Hero image
        'page5_img1.jpeg',  # About image
        'page9_img1.jpeg',  # Project 1 - Robotic Arm
        'page10_img1.png',  # Project 2 - Black Hole
        'page11_img1.png',  # Project 3 - Nova Luz
        'page12_img4.jpeg',  # Project 4 - ESIG App
        'page13_img4.png',  # Project 5 - NESSO
        # Gallery images
        'page9_img2.png',
        'page3_img1.jpeg',
        'page6_img1.jpeg',
        'page6_img2.jpeg',
        'page7_img1.jpeg',
        'page8_img1.jpeg',
        'page14_img3.jpeg',
        'page15_img4.png',
    ]

    images_folder = 'images'
    missing_images = []
    found_images = []

    print("🔍 Vérification des images requises...\n")

    for img in required_images:
        img_path = os.path.join(images_folder, img)
        if os.path.exists(img_path):
            found_images.append(img)
            print(f"✅ {img} - Trouvée")
        else:
            missing_images.append(img)
            print(f"❌ {img} - MANQUANTE")

    print(f"\n📊 Résumé:")
    print(f"   Images trouvées: {len(found_images)}/{len(required_images)}")
    print(f"   Images manquantes: {len(missing_images)}")

    if missing_images:
        print(f"\n⚠️  Images manquantes:")
        for img in missing_images:
            print(f"   - {img}")
    else:
        print(f"\n✨ Toutes les images sont présentes!")

    # List all images in folder
    print(f"\n📁 Toutes les images disponibles dans le dossier:")
    if os.path.exists(images_folder):
        all_images = sorted([f for f in os.listdir(images_folder) if f.endswith(('.png', '.jpeg', '.jpg'))])
        print(f"   Total: {len(all_images)} images")
        for img in all_images[:20]:  # Show first 20
            print(f"   - {img}")
        if len(all_images) > 20:
            print(f"   ... et {len(all_images) - 20} autres images")

if __name__ == "__main__":
    check_images()
