// Efeito de Digitação no Hero
const typingElement = document.getElementById('typing-text');
const words = ['Projeto.', 'Ambiente.', 'Lar.', 'Negócio.'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();

// Atualizar ano dinamicamente no footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Menu Mobile
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const mobileMenuIcon = document.querySelector('.mobile-menu-btn i');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    if (navLinks.classList.contains('active')) {
        mobileMenuIcon.classList.replace('ph-list', 'ph-x');
    } else {
        mobileMenuIcon.classList.replace('ph-x', 'ph-list');
    }
});

const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuIcon.classList.replace('ph-x', 'ph-list');
        }
    });
});

// Active Link highlighting during scroll
const sections = document.querySelectorAll('section[id]');

function highlightActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        const link = document.querySelector(`.nav-links a[href*=${sectionId}]`);
        if (link && !link.classList.contains('btn')) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightActiveLink);

// Form handling e redirecionamento WhatsApp personalizado
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const servico = document.getElementById('servico').options[document.getElementById('servico').selectedIndex].text;
        const mensagem = document.getElementById('mensagem').value;

        let textoWa = `Olá, Tec Glass! Meu nome é *${nome}*.\n\n`;
        textoWa += `Gostaria de um orçamento para: *${servico}*.\n`;

        if (mensagem) {
            textoWa += `\nDetalhes do projeto: ${mensagem}`;
        }

        const numeroWhatsApp = '5511940737331';
        const urlWa = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoWa)}`;

        window.open(urlWa, '_blank');
    });
}

// ==========================================
// Custom Cursor
// ==========================================
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
    let hasMoved = false;

    const moveCursor = (e) => {
        if (!hasMoved) {
            cursorDot.style.opacity = 1;
            cursorOutline.style.opacity = 1;
            hasMoved = true;
        }

        let posX, posY;

        if (e.type === 'touchmove') {
            posX = e.touches[0].clientX;
            posY = e.touches[0].clientY;
        } else {
            posX = e.clientX;
            posY = e.clientY;
        }

        cursorDot.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
        cursorOutline.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('touchmove', moveCursor, { passive: true });
}

// ==========================================
// Scroll Reveal Animations
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const revealElements = document.querySelectorAll('.reveal-up');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // ==========================================
    // Animated SVG Borders
    // ==========================================
    const animatedCards = document.querySelectorAll('.card-container');
    
    animatedCards.forEach(card => {
        const rect = card.querySelector('.borderRect');
        if (!rect) return;

        // Give a tiny delay to ensure SVG is rendered and has size
        setTimeout(() => {
            const perimeter = rect.getTotalLength();
            
            rect.style.strokeDasharray = perimeter;
            rect.style.strokeDashoffset = perimeter;

            const startAnimation = () => {
                rect.style.strokeDashoffset = 0;
            };

            const stopAnimation = () => {
                rect.style.strokeDashoffset = perimeter;
            };

            card.addEventListener('mouseenter', startAnimation);
            card.addEventListener('mouseleave', stopAnimation);

            card.addEventListener('touchstart', startAnimation, { passive: true });
            card.addEventListener('touchend', stopAnimation);
        }, 100);
    });
});

// ==========================================
// Hero Technical Animation Global Functions
// ==========================================
window.resetHeroAnimateClasses = function() {
    const lines = document.querySelectorAll('.tech-workspace-hero .path-line');
    const fades = document.querySelectorAll('.tech-workspace-hero .fade-element');

    lines.forEach(el => {
        el.classList.remove('animate-draw');
        el.classList.remove('animate-draw-slow');
        void el.offsetWidth;
    });

    fades.forEach(el => {
        el.classList.remove('animate-fade');
        void el.offsetWidth;
    });
};

window.iniciarHeroAnimacao = function() {
    window.resetHeroAnimateClasses();
    
    // --- ETAPA 1: Marco Externo ---
    document.querySelectorAll('.tech-workspace-hero .step-1').forEach(el => el.classList.add('animate-draw'));

    // --- ETAPA 2: Trilhos (Delay 1.5s) ---
    setTimeout(() => {
        document.querySelectorAll('.tech-workspace-hero .step-2').forEach(el => el.classList.add('animate-draw'));
    }, 1500);

    // --- ETAPA 3: Folhas da Janela (Delay 3s) ---
    setTimeout(() => {
        document.querySelectorAll('.tech-workspace-hero .step-3').forEach(el => el.classList.add('animate-draw-slow'));
    }, 3000);

    // --- ETAPA 4: Vidraçaria (Delay 5.5s) ---
    setTimeout(() => {
        document.querySelectorAll('.tech-workspace-hero .step-4').forEach(el => el.classList.add('animate-fade'));
    }, 5500);

    // --- ETAPA 5: Detalhamento Técnico (Delay 7.5s) ---
    setTimeout(() => {
        document.querySelectorAll('.tech-workspace-hero .step-5').forEach(el => {
            if (el.tagName.toLowerCase() === 'g') {
                el.classList.add('animate-fade');
            }
            const innerLines = el.querySelectorAll('.path-line');
            innerLines.forEach(l => l.classList.add('animate-draw'));
        });
    }, 7500);
};

// Iniciar automaticamente a animação da Hero Section quando a página carregar
window.addEventListener('load', () => {
    setTimeout(window.iniciarHeroAnimacao, 500); // 500ms delay para dar tempo do site carregar
});

// ==========================================
// Portfolio Background Canvas Animation
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('portfolio-bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    let frames = [];
    let profiles = [];

    const palette = {
        baseDark: '#005c99',
        baseMid: '#007acc',
        baseLight: '#3399ff',
        background: '#000000'
    };

    function hexToRgba(hex, alpha) {
        let r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    function resize() {
        if (!canvas.parentElement) return;
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class ProfileLine {
        constructor() {
            this.isVertical = Math.random() > 0.5;
            this.reset();
        }

        reset() {
            if (this.isVertical) {
                this.x = Math.random() * width;
                this.y = 0;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = 0;
            } else {
                this.x = 0;
                this.y = Math.random() * height;
                this.vx = 0;
                this.vy = (Math.random() - 0.5) * 0.5;
            }
            this.thickness = Math.random() * 1.5 + 0.5;
            this.opacity = Math.random() * 0.4 + 0.1;
            this.color = Math.random() > 0.5 ? palette.baseDark : palette.baseMid;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.isVertical && (this.x < -50 || this.x > width + 50)) this.reset();
            if (!this.isVertical && (this.y < -50 || this.y > height + 50)) this.reset();
        }

        draw() {
            ctx.beginPath();
            if (this.isVertical) {
                ctx.moveTo(this.x, 0);
                ctx.lineTo(this.x, height);
            } else {
                ctx.moveTo(0, this.y);
                ctx.lineTo(width, this.y);
            }
            ctx.strokeStyle = hexToRgba(this.color, this.opacity);
            ctx.lineWidth = this.thickness;
            ctx.setLineDash([]);
            ctx.stroke();
        }
    }

    class WindowFrame {
        constructor() {
            this.reset();
            this.x = Math.random() * width;
            this.y = Math.random() * height;
        }

        reset() {
            this.w = Math.random() * 200 + 100;
            this.h = Math.random() * 300 + 150;
            this.x = Math.random() > 0.5 ? -this.w : width + this.w;
            this.y = Math.random() * height;
            this.vx = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.8 + 0.2);
            this.vy = (Math.random() - 0.5) * 0.2;
            this.perimeter = (this.w * 2) + (this.h * 2);
            this.drawPhase = Math.random() * Math.PI * 2;
            this.drawSpeed = Math.random() * 0.01 + 0.005;
            this.hasMullionX = Math.random() > 0.3;
            this.hasMullionY = Math.random() > 0.5;
            this.mullionXPos = this.w * (Math.random() * 0.4 + 0.3);
            this.mullionYPos = this.h * (Math.random() * 0.4 + 0.3);
            this.glassColor = palette.baseDark;
            this.frameColor = palette.baseLight;
            this.mullionColor = palette.baseMid;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.drawPhase += this.drawSpeed;
            if (
                (this.vx > 0 && this.x > width + 100) ||
                (this.vx < 0 && this.x < -this.w - 100) ||
                this.y > height + 100 || this.y < -this.h - 100
            ) {
                this.reset();
            }
        }

        draw() {
            let progress = (Math.sin(this.drawPhase) + 1) / 2;
            let currentDrawLength = this.perimeter * progress;
            let glassAlpha = progress > 0.8 ? 0.15 : 0.05;
            
            ctx.fillStyle = hexToRgba(this.glassColor, glassAlpha);
            ctx.fillRect(this.x, this.y, this.w, this.h);

            ctx.strokeStyle = hexToRgba(this.frameColor, 0.7);
            ctx.lineWidth = 1.5;
            ctx.setLineDash([this.perimeter]);
            ctx.lineDashOffset = this.perimeter - currentDrawLength;
            ctx.strokeRect(this.x, this.y, this.w, this.h);

            ctx.setLineDash([]);
            ctx.lineWidth = 1;
            ctx.strokeStyle = hexToRgba(this.mullionColor, 0.5);
            ctx.globalAlpha = progress;

            if (this.hasMullionX) {
                ctx.beginPath();
                ctx.moveTo(this.x + this.mullionXPos, this.y);
                ctx.lineTo(this.x + this.mullionXPos, this.y + this.h);
                ctx.stroke();
            }

            if (this.hasMullionY) {
                ctx.beginPath();
                ctx.moveTo(this.x, this.y + this.mullionYPos);
                ctx.lineTo(this.x + this.w, this.y + this.mullionYPos);
                ctx.stroke();
            }

            ctx.globalAlpha = 1.0;
        }
    }

    function init() {
        frames = [];
        profiles = [];
        for (let i = 0; i < 15; i++) {
            frames.push(new WindowFrame());
        }
        for (let i = 0; i < 10; i++) {
            profiles.push(new ProfileLine());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        profiles.forEach(profile => {
            profile.update();
            profile.draw();
        });
        frames.forEach(frame => {
            frame.update();
            frame.draw();
        });
        requestAnimationFrame(animate);
    }

    init();
    animate();
});

// ==========================================
// Counter Animation for Metrics Section
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    
    const counterOptions = {
        threshold: 0.5,
        rootMargin: "0px"
    };

    const animateCounters = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const duration = 2500; // 2.5 seconds
                const frameDuration = 1000 / 60; // 60fps
                const totalFrames = Math.round(duration / frameDuration);
                let frame = 0;

                const updateCount = () => {
                    frame++;
                    const progress = frame / totalFrames;
                    // Easing effect (easeOutExpo)
                    const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                    
                    if (frame <= totalFrames) {
                        counter.innerText = Math.round(target * easeProgress);
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.innerText = target;
                    }
                };

                updateCount();
                observer.unobserve(counter);
            }
        });
    }, counterOptions);

    counters.forEach(counter => {
        animateCounters.observe(counter);
    });
});
