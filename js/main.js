// Initialize AOS with fallback
try {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }
} catch (e) {
    console.warn('AOS not loaded:', e);
}

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

// Add hover effect to cards
const cards = document.querySelectorAll('.skill-card, .experience-card, .project-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax removed for performance optimization

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
console.log('%c Qui ne tente rien n\'a rien', 'color: #f5e6d3; font-size: 16px; font-style: italic;');

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
    const theme = localStorage.getItem('theme') || 'dark';
    const lang = localStorage.getItem('language') || 'fr';
    const animations = localStorage.getItem('animations') !== 'false';
    const smoothScroll = localStorage.getItem('smoothScroll') !== 'false';

    applyTheme(theme);
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

// Theme Switcher
const themeBtns = document.querySelectorAll('.theme-btn');
themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.dataset.theme;
        themeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyTheme(theme);
        localStorage.setItem('theme', theme);
    });
});

function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-theme');
        document.querySelector('.theme-btn[data-theme="light"]').classList.add('active');
        document.querySelector('.theme-btn[data-theme="dark"]').classList.remove('active');
    } else {
        document.body.classList.remove('light-theme');
        document.querySelector('.theme-btn[data-theme="dark"]').classList.add('active');
        document.querySelector('.theme-btn[data-theme="light"]').classList.remove('active');
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
        heroSubtitle: 'Ingénieur en Génie Mécanique | Innovateur | CEO',
        heroDescription: 'Je transforme les idées en systèmes mécaniques fonctionnels, efficaces et optimisés.',
        myProjects: 'Mes Projets',
        contactMe: 'Me Contacter',

        // Quote
        quote: '« Qui ne tente rien n\'a rien »',

        // About Section
        aboutTitle: 'À Propos de Moi',
        aboutSubtitle: 'Mon parcours et ma vision',
        aboutText1: 'Je suis étudiant en génie mécanique à ESIG Global Success, spécialisé en génie mécanique et technologies appliquées.',
        aboutText2: 'Je suis passionné par la transformation d\'idées en systèmes mécaniques fonctionnels, efficaces et optimisés. Mon travail combine précision technique, créativité et résolution de problèmes, avec un accent constant sur les applications du monde réel.',
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
        skill4Title: 'Beatmaking',
        skill4Desc: 'Production musicale et direction artistique avec Nova Luz',
        skill5Title: 'Formation',
        skill5Desc: 'Instruction technique et transfert de connaissances en ingénierie',
        skill6Title: 'Gestion de Projet',
        skill6Desc: 'Leadership d\'équipe et gestion de projets complexes',

        // Projects Section
        projectsTitle: 'Mes Projets',
        projectsSubtitle: 'Réalisations marquantes',
        project1Title: 'Bras Robotique Intelligent',
        project1Desc: 'Développement d\'un système de bras robotique multi-axes avec contrôle intelligent, intégrant des capteurs et une automatisation avancée.',
        project2Title: 'Black Hole (Blender)',
        project2Desc: 'Projet de modélisation 3D et rendu explorant l\'éclairage réaliste, la distorsion et les effets spatiaux cinématiques.',
        project3Title: 'Nova Luz (Label Musical)',
        project3Desc: 'Fondateur et directeur créatif de Nova Luz, produisant de la musique et gérant des projets artistiques.',
        project4Title: 'Application Gestion Atelier ESIG',
        project4Desc: 'Création d\'une application pour rationaliser la gestion de projets et d\'outils dans l\'atelier de l\'école ESIG.',
        project5Title: 'NESSO - Entreprise d\'Innovation',
        project5Desc: 'Fondateur et CEO de NESSO, entreprise axée sur le développement de solutions technologiques avancées en génie mécanique.',

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
        exp2Year: '2025',
        exp2Title: 'Fondateur',
        exp2Company: 'Nova Luz (Label Musical)',
        exp2Desc: 'Fondation et gestion d\'un label musical indépendant, supervision de projets créatifs et coordination d\'équipe.',
        exp3Year: '2026',
        exp3Title: 'CEO',
        exp3Company: 'NESSO',
        exp3Desc: 'Direction d\'une entreprise axée sur l\'innovation et le développement de solutions d\'ingénierie, incluant le développement d\'un projet de bras robotique intelligent.',

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
        heroSubtitle: 'Mechanical Engineer | Innovator | CEO',
        heroDescription: 'I transform ideas into functional, efficient, and optimized mechanical systems.',
        myProjects: 'My Projects',
        contactMe: 'Contact Me',

        // Quote
        quote: '"Nothing ventured, nothing gained"',

        // About Section
        aboutTitle: 'About Me',
        aboutSubtitle: 'My journey and vision',
        aboutText1: 'I am a mechanical engineering student at ESIG Global Success, specializing in mechanical engineering and applied technologies.',
        aboutText2: 'I am passionate about transforming ideas into functional, efficient, and optimized mechanical systems. My work combines technical precision, creativity, and problem-solving, with a constant focus on real-world applications.',
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
        skill4Title: 'Beatmaking',
        skill4Desc: 'Music production and artistic direction with Nova Luz',
        skill5Title: 'Training',
        skill5Desc: 'Technical instruction and knowledge transfer in engineering',
        skill6Title: 'Project Management',
        skill6Desc: 'Team leadership and complex project management',

        // Projects Section
        projectsTitle: 'My Projects',
        projectsSubtitle: 'Notable achievements',
        project1Title: 'Intelligent Robotic Arm',
        project1Desc: 'Development of a multi-axis robotic arm system with intelligent control, integrating sensors and advanced automation.',
        project2Title: 'Black Hole (Blender)',
        project2Desc: '3D modeling and rendering project exploring realistic lighting, distortion and cinematic spatial effects.',
        project3Title: 'Nova Luz (Music Label)',
        project3Desc: 'Founder and creative director of Nova Luz, producing music and managing artistic projects.',
        project4Title: 'ESIG Workshop Management App',
        project4Desc: 'Creating an application to streamline project and tool management in the ESIG school workshop.',
        project5Title: 'NESSO - Innovation Company',
        project5Desc: 'Founder and CEO of NESSO, a company focused on developing advanced technological solutions in mechanical engineering.',

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
        exp2Year: '2025',
        exp2Title: 'Founder',
        exp2Company: 'Nova Luz (Music Label)',
        exp2Desc: 'Foundation and management of an independent music label, supervision of creative projects and team coordination.',
        exp3Year: '2026',
        exp3Title: 'CEO',
        exp3Company: 'NESSO',
        exp3Desc: 'Leading a company focused on innovation and development of engineering solutions, including the development of an intelligent robotic arm project.',

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

    // Quote Section
    setText('.quote-text', t.quote);
    const quoteAuthor = document.querySelector('.quote-author');
    if (quoteAuthor) quoteAuthor.textContent = lang === 'fr' ? '— Ma citation préférée' : '— My favorite quote';

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
        { title: t.skill5Title, desc: t.skill5Desc },
        { title: t.skill6Title, desc: t.skill6Desc }
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
        { title: t.project5Title, desc: t.project5Desc }
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
        'Nova Luz - Label Musical', 'Application Gestion Atelier ESIG',
        'NESSO - Business Presentation', 'Formation & Instruction'
    ];
    const captionsEn = [
        'Robotic Arm - Inter-University Pitch', 'Robotic Arm Project - Partners',
        'Black Hole - 3D Modeling Blender', 'Futuristic City Design',
        'Fluid Simulation on Blender', 'Motor Simulation on SolidWorks',
        'Bicycle Design on SolidWorks', 'Mechanical Project - Video',
        'ANSYS Certification', 'AGBALENYO Clement - Ansys Certification',
        'Nova Luz - Music Label', 'ESIG Workshop Management App',
        'NESSO - Business Presentation', 'Training & Instruction'
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
        { year: t.exp2Year, title: t.exp2Title, company: t.exp2Company, desc: t.exp2Desc },
        { year: t.exp3Year, title: t.exp3Title, company: t.exp3Company, desc: t.exp3Desc }
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

    // Footer Banner
    const bannerQuote = document.querySelector('.footer-banner-quote');
    if (bannerQuote) {
        bannerQuote.innerHTML = lang === 'fr'
            ? 'Qui ne tente rien <span>n\'a rien</span>'
            : 'Nothing ventured, <span>nothing gained</span>';
    }

    // Contact cards info
    const contactCards = document.querySelectorAll('.contact-card');
    const contactInfos = lang === 'fr'
        ? ['Discutons directement', 'agbalenyoclementkokou@gmail.com', 'Mon profil professionnel', '@monarch_ashborn1']
        : ['Let\'s chat directly', 'agbalenyoclementkokou@gmail.com', 'My professional profile', '@monarch_ashborn1'];
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
    AOS.init({ duration: 0, once: false });
}

function enableAnimations() {
    document.body.style.removeProperty('--animation-duration');
    AOS.init({ duration: 1000, once: true, offset: 100 });
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

console.log('%c⚙️ Settings Panel Ready!', 'color: #d4af37; font-size: 14px; font-weight: bold;');
