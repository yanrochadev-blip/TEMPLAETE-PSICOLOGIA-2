/**
 * Inicialização do Lenis para rolagem fluida
 */
const lenis = new Lenis({
    duration: 1.0,          
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier: 1.3,   
    smoothWheel: true,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

/**
 * Animação do texto da seção "Sobre Mim" palavra por palavra
 */
const textElement = document.getElementById('animated-text');
if (textElement) {
    const words = textElement.innerText.split(/(\s+)/); 
    textElement.innerHTML = ''; 

    words.forEach(word => {
        if (word.trim() === '') {
            textElement.appendChild(document.createTextNode(word));
        } else {
            const span = document.createElement('span');
            span.classList.add('word');
            span.innerText = word;
            textElement.appendChild(span);
        }
    });

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".about-me-section",
            start: "center center",
            end: "+=120%",          
            pin: true,
            scrub: 1,               
        }
    });

    tl.to(".word", {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        ease: "power2.out"
    });
}

/**
 * Interatividade do FAQ (Accordion)
 */
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        document.querySelectorAll('.faq-item').forEach(other => {
            other.classList.remove('active');
            const icon = other.querySelector('.faq-icon i');
            if (icon) icon.className = "fa-solid fa-chevron-down";
        });

        if (!isActive) {
            item.classList.add('active');
            const icon = item.querySelector('.faq-icon i');
            if (icon) icon.className = "fa-solid fa-chevron-up";
        }
    });
});

/**
 * Interatividade dos Cards de Tratamentos no Mobile (Clique para Abrir)
 */
document.querySelectorAll('.treat-card').forEach(card => {
    card.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
            const isActive = card.classList.contains('mobile-active');
            
            // Fecha todos os cards mobile
            document.querySelectorAll('.treat-card').forEach(c => c.classList.remove('mobile-active'));
            
            // Se não estava ativo, abre este
            if (!isActive) {
                card.classList.add('mobile-active');
            }
        }
    });
});