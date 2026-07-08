// Loading Screen - with guaranteed hide
function hideLoader() {
    const loader = document.querySelector('.loader');
    if (loader && !loader.classList.contains('hidden')) {
        loader.classList.add('hidden');
    }
}

// Hide loader when page loads
window.addEventListener('load', () => {
    setTimeout(hideLoader, 1500);
});

// Fallback: Force hide loader after 4 seconds maximum (in case CDN fails)
setTimeout(hideLoader, 4000);

// Also hide on DOMContentLoaded as backup
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(hideLoader, 2500);
});

// Optimized single scroll handler (debounced)
const navbar = document.querySelector('.navbar');
const heroLeftEl = document.querySelector('.hero-left');
const footerBannerImgEl = document.querySelector('.footer-banner-img');
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const scrollY = window.scrollY;

            // Navbar effect
            if (scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Scroll to top button
            if (scrollTopBtn) {
                if (scrollY > 500) {
                    scrollTopBtn.classList.add('visible');
                } else {
                    scrollTopBtn.classList.remove('visible');
                }
            }

            // Light parallax - profile photo (hero)
            if (heroLeftEl) {
                const heroOffset = Math.min(scrollY * 0.06, 30);
                heroLeftEl.style.transform = `translateY(${heroOffset}px)`;
            }

            // Light parallax - footer banner photo
            if (footerBannerImgEl) {
                const rect = footerBannerImgEl.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                    const bannerOffset = (progress - 0.5) * 30;
                    footerBannerImgEl.style.transform = `scale(1.08) translateY(${bannerOffset}px)`;
                }
            }

            ticking = false;
        });
        ticking = true;
    }
});

// Mobile Menu Toggle
const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !burger.contains(e.target)) {
        burger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Swiper Initialization with fallback
let swiper = null;
try {
    if (typeof Swiper !== 'undefined') {
        swiper = new Swiper('.projectsSwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            },
        });
    }
} catch (e) {
    console.warn('Swiper not loaded:', e);
}

// Scroll To Top Button
const scrollTopBtn = document.getElementById('scrollTop');

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Particle Generation
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Animated Counter for Statistics
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Intersection Observer for Counter Animation
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.textContent === '0') {
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 3D Tilt Effect on Project Cards (lightweight, vanilla JS, no library)
function initProjectTilt() {
    const tiltEls = document.querySelectorAll('.projectsSwiper .swiper-slide');
    const maxTilt = 8;

    tiltEls.forEach(el => {
        function applyTilt(clientX, clientY) {
            const rect = el.getBoundingClientRect();
            const px = clientX - rect.left;
            const py = clientY - rect.top;
            const rotateY = ((px - rect.width / 2) / (rect.width / 2)) * maxTilt;
            const rotateX = -((py - rect.height / 2) / (rect.height / 2)) * maxTilt;
            el.style.transition = 'transform 0.05s linear';
            el.style.transform = `perspective(900px) translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            el.style.setProperty('--mx', (px / rect.width) * 100 + '%');
            el.style.setProperty('--my', (py / rect.height) * 100 + '%');
        }

        function resetTilt() {
            el.style.transition = 'transform 0.4s ease';
            el.style.transform = 'perspective(900px) translateY(0) rotateX(0) rotateY(0)';
        }

        el.addEventListener('mousemove', (e) => applyTilt(e.clientX, e.clientY));
        el.addEventListener('mouseleave', resetTilt);
        el.addEventListener('touchstart', (e) => {
            if (e.touches[0]) applyTilt(e.touches[0].clientX, e.touches[0].clientY);
        }, { passive: true });
        el.addEventListener('touchmove', (e) => {
            if (e.touches[0]) applyTilt(e.touches[0].clientX, e.touches[0].clientY);
        }, { passive: true });
        el.addEventListener('touchend', resetTilt);
    });
}
initProjectTilt();

// Cursor-tracked mirror sheen on skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width) * 100 + '%');
        card.style.setProperty('--my', ((e.clientY - rect.top) / rect.height) * 100 + '%');
    });
});

// ==========================================
// CINEMATIC 3D MOTION (GSAP + ScrollTrigger)
// Scroll-linked 3D reveals that reverse when scrolling back up,
// plus mouse-driven parallax and continuous icon rotation.
// ==========================================
let motionInitialized = false;
let iconLoopTweens = [];

function initScrollReveals() {
    document.querySelectorAll('[data-aos]').forEach(el => {
        const type = el.getAttribute('data-aos');
        const delayMs = parseInt(el.getAttribute('data-aos-delay') || '0', 10);
        let from = { opacity: 0, y: 70, rotateX: -18, transformPerspective: 800 };

        if (type === 'fade-right') from = { opacity: 0, x: -70, rotateY: -20, transformPerspective: 800 };
        else if (type === 'fade-left') from = { opacity: 0, x: 70, rotateY: 20, transformPerspective: 800 };
        else if (type === 'zoom-in') from = { opacity: 0, scale: 0.75, rotateZ: -3 };

        gsap.set(el, from);

        ScrollTrigger.create({
            trigger: el,
            start: 'top 88%',
            end: 'top 40%',
            onEnter: () => gsap.to(el, {
                opacity: 1, x: 0, y: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1,
                duration: 0.9, delay: delayMs / 1000, ease: 'back.out(1.5)',
                overwrite: true, clearProps: 'transform'
            }),
            onLeaveBack: () => gsap.to(el, {
                ...from, duration: 0.6, ease: 'power2.in', overwrite: true
            })
        });
    });
}

function initShapesParallax() {
    const shapes = document.querySelectorAll('.floating-shapes .shape');
    if (!shapes.length) return;
    const movers = Array.from(shapes).map((shape, i) => ({
        x: gsap.quickTo(shape, 'x', { duration: 0.9, ease: 'power3.out' }),
        y: gsap.quickTo(shape, 'y', { duration: 0.9, ease: 'power3.out' }),
        depth: ((i % 3) + 1) * 12
    }));

    window.addEventListener('mousemove', (e) => {
        const dx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
        const dy = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
        movers.forEach(({ x, y, depth }) => {
            x(dx * depth);
            y(dy * depth);
        });
    });
}

function initHeroTilt() {
    const wrap = document.querySelector('.hero-tilt-wrap');
    const heroSection = document.querySelector('.hero');
    if (!wrap || !heroSection) return;

    const rotX = gsap.quickTo(wrap, 'rotationX', { duration: 0.6, ease: 'power3.out' });
    const rotY = gsap.quickTo(wrap, 'rotationY', { duration: 0.6, ease: 'power3.out' });

    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        rotY(px * 22);
        rotX(-py * 22);
    });

    heroSection.addEventListener('mouseleave', () => {
        rotX(0);
        rotY(0);
    });
}

function initSkillIconLoop() {
    document.querySelectorAll('.skill-icon').forEach((icon, i) => {
        gsap.set(icon, { transformPerspective: 500 });
        const tween = gsap.to(icon, {
            rotateY: 360,
            duration: 9 + (i % 3) * 1.5,
            repeat: -1,
            ease: 'linear'
        });
        iconLoopTweens.push(tween);

        const card = icon.closest('.skill-card');
        if (card) {
            card.addEventListener('mouseenter', () => gsap.to(tween, { timeScale: 4, duration: 0.3 }));
            card.addEventListener('mouseleave', () => gsap.to(tween, { timeScale: 1, duration: 0.6 }));
        }
    });
}

function startCinematicMotion() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    if (!motionInitialized) {
        gsap.registerPlugin(ScrollTrigger);
        initScrollReveals();
        initShapesParallax();
        initHeroTilt();
        initSkillIconLoop();
        motionInitialized = true;
    } else {
        ScrollTrigger.getAll().forEach(st => st.enable());
        iconLoopTweens.forEach(t => t.resume());
    }
}

function stopCinematicMotion() {
    if (typeof gsap === 'undefined') return;
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(st => st.disable());
    }
    gsap.set('[data-aos]', { clearProps: 'transform,opacity' });
    iconLoopTweens.forEach(t => t.pause());
}

try {
    startCinematicMotion();
} catch (e) {
    console.warn('Cinematic motion not started:', e);
}

// Dynamic Year Update
const currentYear = new Date().getFullYear();
document.querySelector('.footer-text').innerHTML =
    `© ${currentYear} AGBALENYO Clement. Tous droits réservés. | Portfolio créé avec passion`;

// Lightbox Functions
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = imageSrc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// ==========================================
// GALLERY FILTER FUNCTIONALITY
// ==========================================
const filterBtns = document.querySelectorAll('.gallery-filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        galleryItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.classList.remove('hidden');
                item.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// Console Easter Egg
console.log('%c Portfolio AGBALENYO Clement', 'color: #d4af37; font-size: 24px; font-weight: bold;');

// ==========================================
// SETTINGS PANEL FUNCTIONALITY
// ==========================================
// Settings Panel Toggle
const settingsBtn = document.getElementById('settingsBtn');
const settingsBtnHeader = document.getElementById('settingsBtnHeader');
const settingsPanel = document.getElementById('settingsPanel');
const settingsClose = document.getElementById('settingsClose');

// Open settings panel from both buttons
if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
        settingsPanel.classList.toggle('active');
    });
}

if (settingsBtnHeader) {
    settingsBtnHeader.addEventListener('click', () => {
        settingsPanel.classList.toggle('active');
    });
}

settingsClose.addEventListener('click', () => {
    settingsPanel.classList.remove('active');
});

// Close settings panel when clicking outside
document.addEventListener('click', (e) => {
    if (!settingsPanel.contains(e.target) &&
        !settingsBtn?.contains(e.target) &&
        !settingsBtnHeader?.contains(e.target)) {
        settingsPanel.classList.remove('active');
    }
});

// Load saved preferences
function loadPreferences() {
    const lang = localStorage.getItem('language') || 'en';
    const animations = localStorage.getItem('animations') !== 'false';
    const smoothScroll = localStorage.getItem('smoothScroll') !== 'false';

    applyLanguage(lang);
    document.getElementById('animationsToggle').checked = animations;
    document.getElementById('smoothScrollToggle').checked = smoothScroll;

    if (!animations) {
        disableAnimations();
    }
    if (!smoothScroll) {
        disableSmoothScroll();
    }
}

// Language Switcher
const langBtns = document.querySelectorAll('.lang-btn');
langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        langBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyLanguage(lang);
        localStorage.setItem('language', lang);
    });
});

const translations = {
    fr: {
        // Navigation
        home: 'Accueil',
        about: 'À Propos',
        education: 'Formation',
        skills: 'Compétences',
        projects: 'Projets',
        gallery: 'Galerie',
        experience: 'Expérience',
        contact: 'Contact',

        // Hero Section
        heroSubtitle: 'Étudiant en Génie Mécanique | Robotique & Mécatronique',
        heroDescription: 'Je transforme les idées en systèmes mécaniques fonctionnels, efficaces et optimisés.',
        myProjects: 'Mes Projets',
        contactMe: 'Me Contacter',

        // About Section
        aboutTitle: 'À Propos de Moi',
        aboutSubtitle: 'Mon parcours et ma vision',
        aboutText1: 'Je suis AGBALENYO Kokou Clement, étudiant en génie mécanique et mécatronique à ESIG Global Success, actuellement en Licence 2. Je me spécialise en conception mécanique (CAO), simulation numérique (FEA) et intégration de systèmes robotiques.',
        aboutText2: 'Mon travail combine précision technique et résolution de problèmes concrets : de la modélisation 3D sous SolidWorks à la simulation structurelle sous ANSYS et Abaqus, en passant par la conception de systèmes mécatroniques et robotiques automatisés.',
        downloadCV: 'Télécharger mon CV',

        // Education Section
        educationTitle: 'Formation',
        educationSubtitle: 'Mon cursus académique',
        education2024: 'Licence 1 - Semestres 1 & 2',
        education2024School: 'ESIG Global Success',
        education2024Desc: 'Fondamentaux en conception mécanique, matériaux et thermodynamique',
        education2025: 'Licence 2 - Semestre 3',
        education2025School: 'ESIG Global Success',
        education2025Desc: 'Approfondissement en CAO, simulation et automatisation',
        education2026: 'Licence 2 - Semestre 4',
        education2026School: 'ESIG Global Success',
        education2026Desc: 'Application avancée des concepts d\'ingénierie et mécatronique',

        // Skills Section
        skillsTitle: 'Mes Compétences',
        skillsSubtitle: 'Domaines d\'expertise',
        skill1Title: 'CAO/CAD',
        skill1Desc: 'Conception avancée avec SolidWorks et Blender pour modélisation 3D et rendu réaliste',
        skill2Title: 'Simulation FEA',
        skill2Desc: 'Analyse structurelle et thermique avec ANSYS et Abaqus',
        skill3Title: 'Mécatronique',
        skill3Desc: 'Intégration robotique, automatisation et systèmes intelligents',
        skill4Title: 'Formation',
        skill4Desc: 'Instruction technique et transfert de connaissances en ingénierie',
        skill5Title: 'Gestion de Projet',
        skill5Desc: 'Leadership d\'équipe et gestion de projets complexes',

        // Projects Section
        projectsTitle: 'Mes Projets',
        projectsSubtitle: 'Réalisations marquantes',
        project1Title: 'Bras Robotique Intelligent',
        project1Desc: 'Chef de projet — conception complète d\'un bras robotique articulé (Semaine de Professionnalisation 2026) : CAO SolidWorks, calculs statiques et dynamiques, cinématique directe et inverse vérifiée numériquement (erreur < 0,001 mm), dimensionnement moteur NEMA 17 + réducteur.',
        project2Title: 'CNC & Atelier — Diagnostic et Outillage',
        project2Desc: 'Diagnostic et réparation de machines CNC (tourelle du tour, alarmes fraiseuse), pipeline de programmation Fusion 360 → contrôleur GSK, et développement d\'un validateur de G-code en Python (Tkinter, packagé en .exe) diffusé et utilisé par l\'équipe atelier — SAE 401.',
        project3Title: 'Black Hole (Blender)',
        project3Desc: 'Modélisation et rendu 3D sous Blender : shading procédural, éclairage volumétrique et simulation visuelle de la distorsion gravitationnelle pour un rendu cinématique réaliste.',
        project4Title: 'Essai de Traction — Analyse de Matériaux',
        project4Desc: 'Analyse de 442 points de données expérimentales sur éprouvette cylindrique : classeur Excel à 6 feuilles avec formules inter-feuilles, courbes contrainte-déformation, calcul du module d\'Young, Rm, Rp0.2, allongement et striction.',
        project5Title: 'Application Gestion Atelier ESIG',
        project5Desc: 'PWA de gestion d\'atelier avec intégration Google Sheets, authentification par rôle et mode visiteur — développée pour le suivi des TP, des outils et des machines de l\'atelier ESIG.',
        project6Title: 'Appui Mémoire — Plumeuse Rotative de Volaille',
        project6Desc: 'Appui technique à un mémoire de fin d\'études : nomenclature (BOM), calculs de vérification, séquence de modélisation SolidWorks et visualisation 3D interactive sous Three.js.',
        project7Title: 'Assemblage Mécanique Final',
        project7Desc: 'Vidéo documentant le processus complet d\'assemblage sous SolidWorks, de la mise en plan des pièces à la vérification des tolérances et l\'intégration finale de l\'ensemble.',
        project8Title: 'RelaxVest - Gilet de Massage Intelligent',
        project8Desc: 'Conception mécanique du boîtier et de la structure, développement de l\'application mobile de contrôle Bluetooth. Gestion de projet de bout en bout, du prototype fonctionnel à la livraison finale.',

        // Gallery Section
        galleryTitle: 'Galerie Photos',
        gallerySubtitle: 'Découvrez mes projets en images',

        // Experience Section
        experienceTitle: 'Expérience',
        experienceSubtitle: 'Mon parcours professionnel',
        exp1Year: '2025',
        exp1Title: 'Chef de Projet',
        exp1Company: 'Projets Académiques',
        exp1Desc: 'Direction de multiples projets d\'ingénierie scolaires, coordination d\'équipes, gestion des délais et livraison de solutions techniques. Conception et livraison d\'un gilet de massage personnalisé, du concept au prototype fonctionnel.',
        exp2Year: '2026',
        exp2Title: 'Technicien Atelier & Développeur d\'Outils',
        exp2Company: 'SAE 401 — Atelier ESIG',
        exp2Desc: 'Diagnostic et réparation de machines CNC, mise en place d\'un pipeline de programmation Fusion 360 → GSK, et développement d\'un validateur de G-code en Python diffusé à toute l\'équipe. Cahier des charges, entretiens et rapports d\'activité livrés.',

        // Contact Section
        contactTitle: 'Contactez-Moi',
        contactSubtitle: 'N\'hésitez pas à me contacter pour des collaborations, projets ou opportunités',

        // Footer
        footerText: 'Tous droits réservés. | Portfolio créé avec passion'
    },
    en: {
        // Navigation
        home: 'Home',
        about: 'About',
        education: 'Education',
        skills: 'Skills',
        projects: 'Projects',
        gallery: 'Gallery',
        experience: 'Experience',
        contact: 'Contact',

        // Hero Section
        heroSubtitle: 'Mechanical Engineering Student | Robotics & Mechatronics',
        heroDescription: 'I transform ideas into functional, efficient, and optimized mechanical systems.',
        myProjects: 'My Projects',
        contactMe: 'Contact Me',

        // About Section
        aboutTitle: 'About Me',
        aboutSubtitle: 'My journey and vision',
        aboutText1: 'I am AGBALENYO Kokou Clement, a mechanical and mechatronics engineering student at ESIG Global Success, currently in my second year. I specialize in mechanical design (CAD), numerical simulation (FEA), and robotic systems integration.',
        aboutText2: 'My work combines technical precision with real-world problem-solving: from 3D modeling in SolidWorks to structural simulation in ANSYS and Abaqus, through the design of automated mechatronic and robotic systems.',
        downloadCV: 'Download CV',

        // Education Section
        educationTitle: 'Education',
        educationSubtitle: 'My academic background',
        education2024: 'Bachelor\'s Year 1 - Semesters 1 & 2',
        education2024School: 'ESIG Global Success',
        education2024Desc: 'Fundamentals in mechanical design, materials and thermodynamics',
        education2025: 'Bachelor\'s Year 2 - Semester 3',
        education2025School: 'ESIG Global Success',
        education2025Desc: 'Advanced CAD, simulation and automation',
        education2026: 'Bachelor\'s Year 2 - Semester 4',
        education2026School: 'ESIG Global Success',
        education2026Desc: 'Advanced application of engineering concepts and mechatronics',

        // Skills Section
        skillsTitle: 'My Skills',
        skillsSubtitle: 'Areas of expertise',
        skill1Title: 'CAD/CAE',
        skill1Desc: 'Advanced design with SolidWorks and Blender for 3D modeling and realistic rendering',
        skill2Title: 'FEA Simulation',
        skill2Desc: 'Structural and thermal analysis with ANSYS and Abaqus',
        skill3Title: 'Mechatronics',
        skill3Desc: 'Robotic integration, automation and intelligent systems',
        skill4Title: 'Training',
        skill4Desc: 'Technical instruction and knowledge transfer in engineering',
        skill5Title: 'Project Management',
        skill5Desc: 'Team leadership and complex project management',

        // Projects Section
        projectsTitle: 'My Projects',
        projectsSubtitle: 'Notable achievements',
        project1Title: 'Intelligent Robotic Arm',
        project1Desc: 'Project lead — full design of an articulated robotic arm (Professionalization Week 2026): SolidWorks CAD, static and dynamic calculations, forward and inverse kinematics numerically verified (error < 0.001 mm), NEMA 17 motor + gearbox sizing.',
        project2Title: 'CNC & Workshop — Diagnostics and Tooling',
        project2Desc: 'Diagnosis and repair of CNC machines (lathe turret, mill alarms), Fusion 360 to GSK controller programming pipeline, and development of a G-code validator in Python (Tkinter, packaged as .exe) shared with and used by the workshop team — SAE 401.',
        project3Title: 'Black Hole (Blender)',
        project3Desc: '3D modeling and rendering in Blender: procedural shading, volumetric lighting and visual simulation of gravitational distortion for a realistic cinematic render.',
        project4Title: 'Tensile Test — Materials Analysis',
        project4Desc: 'Analysis of 442 experimental data points on a cylindrical specimen: 6-sheet Excel workbook with cross-sheet formulas, stress-strain curves, calculation of Young\'s modulus, Rm, Rp0.2, elongation and necking.',
        project5Title: 'ESIG Workshop Management App',
        project5Desc: 'Workshop management PWA with Google Sheets integration, role-based authentication and visitor mode — built to track labs, tools and machines in the ESIG workshop.',
        project6Title: 'Thesis Support — Rotary Poultry Plucker',
        project6Desc: 'Technical support for a graduation thesis: bill of materials (BOM), verification calculations, SolidWorks modeling sequence and interactive 3D visualization in Three.js.',
        project7Title: 'Final Mechanical Assembly',
        project7Desc: 'Video documenting the complete assembly process in SolidWorks, from part drawings to tolerance verification and final integration of the assembly.',
        project8Title: 'RelaxVest - Smart Massage Vest',
        project8Desc: 'Mechanical design of the housing and structure, development of the Bluetooth mobile control app. End-to-end project management, from functional prototype to final delivery.',

        // Gallery Section
        galleryTitle: 'Photo Gallery',
        gallerySubtitle: 'Discover my projects in pictures',

        // Experience Section
        experienceTitle: 'Experience',
        experienceSubtitle: 'My professional journey',
        exp1Year: '2025',
        exp1Title: 'Project Manager',
        exp1Company: 'Academic Projects',
        exp1Desc: 'Direction of multiple school engineering projects, team coordination, deadline management and delivery of technical solutions. Design and delivery of a custom massage vest, from concept to functional prototype.',
        exp2Year: '2026',
        exp2Title: 'Workshop Technician & Tool Developer',
        exp2Company: 'SAE 401 — ESIG Workshop',
        exp2Desc: 'Diagnosis and repair of CNC machines, set-up of a Fusion 360 to GSK programming pipeline, and development of a Python G-code validator shared with the whole team. Delivered specifications, interviews and activity reports.',

        // Contact Section
        contactTitle: 'Contact Me',
        contactSubtitle: 'Feel free to contact me for collaborations, projects or opportunities',

        // Footer
        footerText: 'All rights reserved. | Portfolio created with passion'
    }
};

function applyLanguage(lang) {
    const t = translations[lang];
    if (!t) return;

    // Helper to safely update text
    function setText(selector, text) {
        const el = document.querySelector(selector);
        if (el) el.textContent = text;
    }

    function setHTML(selector, html) {
        const el = document.querySelector(selector);
        if (el) el.innerHTML = html;
    }

    // Update navigation
    const navSelectors = ['#home', '#about', '#education', '#skills', '#projects', '#gallery', '#experience', '#contact'];
    const navTexts = [t.home, t.about, t.education, t.skills, t.projects, t.gallery, t.experience, t.contact];
    navSelectors.forEach((sel, i) => {
        // Only update nav links (not section anchors)
        const links = document.querySelectorAll(`a[href="${sel}"]`);
        links.forEach(link => {
            if (link.closest('.nav-menu')) link.textContent = navTexts[i];
        });
    });

    // Hero Section
    setText('.hero-content .hero-subtitle', t.heroSubtitle);
    setText('.hero-content .hero-description', t.heroDescription);

    // Hero CTA button
    const heroCta = document.querySelector('.hero-cta span');
    if (heroCta) heroCta.textContent = lang === 'fr' ? 'Découvrir mes projets' : 'Discover my projects';

    // Hero Label
    const heroLabel = document.querySelector('.hero-label');
    if (heroLabel) heroLabel.textContent = lang === 'fr' ? 'Bienvenue sur mon Portfolio' : 'Welcome to my Portfolio';

    // About Section
    setText('#about .section-title', t.aboutTitle);
    setText('#about .section-subtitle', t.aboutSubtitle);

    const aboutTexts = document.querySelectorAll('#about .about-text p');
    if (aboutTexts[0]) aboutTexts[0].textContent = t.aboutText1;
    if (aboutTexts[1]) aboutTexts[1].textContent = t.aboutText2;

    // CV & PPP download buttons
    const cvBtn = document.getElementById('downloadCV');
    if (cvBtn) cvBtn.innerHTML = `<i class="fas fa-download"></i><span>${t.downloadCV}</span>`;

    const pppBtn = document.getElementById('downloadPPP');
    if (pppBtn) pppBtn.innerHTML = `<i class="fas fa-file-alt"></i><span>${lang === 'fr' ? 'Voir mon PPP' : 'View my PPP'}</span>`;

    // Education Section
    setText('#education .section-title', t.educationTitle);
    setText('#education .section-subtitle', t.educationSubtitle);

    // Note: Education timeline uses .timeline-title for school name
    // and .timeline-description contains <p> + <ul>, so we only update the <p> title inside
    const timelineItems = document.querySelectorAll('.timeline-item');
    const eduData = [
        { title: t.education2024School, badge: t.education2024, desc: lang === 'fr' ? 'Introduction aux principes fondamentaux du génie mécanique:' : 'Introduction to fundamental principles of mechanical engineering:' },
        { title: t.education2025School, badge: t.education2025, desc: lang === 'fr' ? 'Développement de compétences en ingénierie appliquée:' : 'Development of applied engineering skills:' },
        { title: t.education2026School, badge: t.education2026, desc: lang === 'fr' ? 'Application avancée des concepts d\'ingénierie:' : 'Advanced application of engineering concepts:' }
    ];

    timelineItems.forEach((item, i) => {
        if (eduData[i]) {
            const title = item.querySelector('.timeline-title');
            if (title) title.textContent = eduData[i].title;
            const badge = item.querySelector('.timeline-badge');
            if (badge) badge.textContent = eduData[i].badge;
            const descP = item.querySelector('.timeline-description p');
            if (descP) descP.textContent = eduData[i].desc;
        }
    });

    // Skills Section
    setText('#skills .section-title', t.skillsTitle);
    setText('#skills .section-subtitle', t.skillsSubtitle);

    const skillCards = document.querySelectorAll('.skill-card');
    const skillData = [
        { title: t.skill1Title, desc: t.skill1Desc },
        { title: t.skill2Title, desc: t.skill2Desc },
        { title: t.skill3Title, desc: t.skill3Desc },
        { title: t.skill4Title, desc: t.skill4Desc },
        { title: t.skill5Title, desc: t.skill5Desc }
    ];
    skillCards.forEach((card, i) => {
        if (skillData[i]) {
            const titleEl = card.querySelector('.skill-title');
            const descEl = card.querySelector('.skill-description');
            if (titleEl) titleEl.textContent = skillData[i].title;
            if (descEl) descEl.textContent = skillData[i].desc;
        }
    });

    // Projects Section
    setText('#projects .section-title', t.projectsTitle);
    setText('#projects .section-subtitle', t.projectsSubtitle);

    const projectSlides = document.querySelectorAll('.swiper-slide');
    const projData = [
        { title: t.project1Title, desc: t.project1Desc },
        { title: t.project2Title, desc: t.project2Desc },
        { title: t.project3Title, desc: t.project3Desc },
        { title: t.project4Title, desc: t.project4Desc },
        { title: t.project5Title, desc: t.project5Desc },
        { title: t.project6Title, desc: t.project6Desc },
        { title: t.project7Title, desc: t.project7Desc },
        { title: t.project8Title, desc: t.project8Desc }
    ];
    projectSlides.forEach((slide, i) => {
        if (projData[i]) {
            const titleEl = slide.querySelector('.project-title');
            const descEl = slide.querySelector('.project-description');
            if (titleEl) titleEl.textContent = projData[i].title;
            if (descEl) descEl.textContent = projData[i].desc;
        }
    });

    // Gallery Section
    setText('#gallery .section-title', t.galleryTitle);
    setText('#gallery .section-subtitle', t.gallerySubtitle);

    // Gallery captions (order matches new gallery HTML)
    const galleryCaptions = document.querySelectorAll('.gallery-caption');
    const captionsFr = [
        'Bras Robotique - Pitch Interuniversitaire', 'Projet Bras Robotique - Partenaires',
        'Black Hole - Modélisation 3D Blender', 'Design d\'une ville futuriste',
        'Simulation d\'un fluide sur Blender', 'Simulation moteur sur SolidWorks',
        'Design d\'un vélo sur SolidWorks', 'Projet Mécanique - Vidéo',
        'ANSYS Certification', 'AGBALENYO Clement - Ansys Certification',
        'Application Gestion Atelier ESIG', 'Formation & Instruction',
        'RelaxVest - Application Mobile', 'RelaxVest - Interface de Contrôle',
        'RelaxVest - Prototype Électronique', 'RelaxVest - Équipe & Produit Final'
    ];
    const captionsEn = [
        'Robotic Arm - Inter-University Pitch', 'Robotic Arm Project - Partners',
        'Black Hole - 3D Modeling Blender', 'Futuristic City Design',
        'Fluid Simulation on Blender', 'Motor Simulation on SolidWorks',
        'Bicycle Design on SolidWorks', 'Mechanical Project - Video',
        'ANSYS Certification', 'AGBALENYO Clement - Ansys Certification',
        'ESIG Workshop Management App', 'Training & Instruction',
        'RelaxVest - Mobile App', 'RelaxVest - Control Interface',
        'RelaxVest - Electronic Prototype', 'RelaxVest - Team & Final Product'
    ];
    const captions = lang === 'fr' ? captionsFr : captionsEn;
    galleryCaptions.forEach((cap, i) => {
        if (captions[i]) cap.textContent = captions[i];
    });

    // Experience Section
    setText('#experience .section-title', t.experienceTitle);
    setText('#experience .section-subtitle', t.experienceSubtitle);

    const expCards = document.querySelectorAll('.experience-card');
    const expData = [
        { year: t.exp1Year, title: t.exp1Title, company: t.exp1Company, desc: t.exp1Desc },
        { year: t.exp2Year, title: t.exp2Title, company: t.exp2Company, desc: t.exp2Desc }
    ];
    expCards.forEach((card, i) => {
        if (expData[i]) {
            const yearEl = card.querySelector('.experience-year');
            const titleEl = card.querySelector('.experience-title');
            const compEl = card.querySelector('.experience-company');
            const descEl = card.querySelector('.experience-description');
            if (yearEl) yearEl.textContent = expData[i].year;
            if (titleEl) titleEl.textContent = expData[i].title;
            if (compEl) compEl.textContent = expData[i].company;
            if (descEl) descEl.textContent = expData[i].desc;
        }
    });

    // Contact Section
    setText('#contact .section-title', t.contactTitle);
    setText('#contact .section-subtitle', t.contactSubtitle);

    // Contact cards info
    const contactCards = document.querySelectorAll('.contact-card');
    const contactInfos = lang === 'fr'
        ? ['Discutons directement', 'agbalenyoclementkokou@gmail.com', 'Mon profil professionnel', '@monarch_ashborn1', 'Mon profil Facebook', 'AshbornArise']
        : ['Let\'s chat directly', 'agbalenyoclementkokou@gmail.com', 'My professional profile', '@monarch_ashborn1', 'My Facebook profile', 'AshbornArise'];
    contactCards.forEach((card, i) => {
        const info = card.querySelector('.contact-card-info');
        if (info && contactInfos[i]) info.textContent = contactInfos[i];
    });

    // Footer text
    const footerText = document.querySelector('.footer-text');
    if (footerText) {
        const yr = new Date().getFullYear();
        footerText.innerHTML = `&copy; ${yr} AGBALENYO Clement. ${t.footerText}`;
    }

    // Update setting labels
    document.querySelectorAll('[data-fr][data-en]').forEach(el => {
        el.textContent = el.dataset[lang];
    });
}

// Animations Toggle
document.getElementById('animationsToggle').addEventListener('change', function () {
    if (this.checked) {
        enableAnimations();
    } else {
        disableAnimations();
    }
    localStorage.setItem('animations', this.checked);
});

function disableAnimations() {
    document.body.style.setProperty('--animation-duration', '0s');
    stopCinematicMotion();
}

function enableAnimations() {
    document.body.style.removeProperty('--animation-duration');
    startCinematicMotion();
}

// Smooth Scroll Toggle
document.getElementById('smoothScrollToggle').addEventListener('change', function () {
    localStorage.setItem('smoothScroll', this.checked);
    if (!this.checked) {
        disableSmoothScroll();
    } else {
        enableSmoothScroll();
    }
});

function disableSmoothScroll() {
    document.documentElement.style.scrollBehavior = 'auto';
}

function enableSmoothScroll() {
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Load preferences on page load
loadPreferences();

// About Video: Click-to-play
const aboutVideoWrapper = document.getElementById('aboutVideoWrapper');
const aboutVideo = document.getElementById('aboutVideo');
const aboutPlayBtn = document.getElementById('aboutPlayBtn');

if (aboutVideoWrapper && aboutVideo && aboutPlayBtn) {
    aboutVideoWrapper.addEventListener('click', () => {
        if (aboutVideo.paused) {
            aboutVideo.play();
            aboutPlayBtn.style.opacity = '0';
            aboutPlayBtn.style.pointerEvents = 'none';
        } else {
            aboutVideo.pause();
            aboutPlayBtn.style.opacity = '1';
            aboutPlayBtn.style.pointerEvents = 'auto';
        }
    });

    aboutVideo.addEventListener('ended', () => {
        aboutPlayBtn.style.opacity = '1';
        aboutPlayBtn.style.pointerEvents = 'auto';
    });
}

console.log('%c⚙️ Settings Panel Ready!', 'color: #d4af37; font-size: 14px; font-weight: bold;');
