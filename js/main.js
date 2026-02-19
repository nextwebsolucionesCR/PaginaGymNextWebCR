document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('open'); // For hamburger animation
        });
    }

    // 2. Scroll Animations (Unified Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once revealed for performance
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Observe standard elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // Observe Premium Text Reveal elements
    document.querySelectorAll('.reveal-text').forEach(el => observer.observe(el));

    // 3. WhatsApp Dynamic Button Logic (for Services page)
    const whatsappBtns = document.querySelectorAll('.whatsapp-btn');
    whatsappBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceName = btn.getAttribute('data-service');
            const phone = "50688888888"; // Replace with actual number
            const message = `Hola, me interesa información sobre ${serviceName}`;
            const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        });
    });

    // 4. Modal Logic (Details)
    const modal = document.getElementById('service-modal');
    const closeBtn = document.querySelector('.close-modal');
    const detailBtns = document.querySelectorAll('.details-btn');

    if (modal) {
        detailBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const service = btn.getAttribute('data-service');
                const price = btn.getAttribute('data-price');
                const desc = btn.getAttribute('data-desc');

                // Populate Modal
                document.getElementById('modal-title').innerText = service;
                document.getElementById('modal-price').innerText = price;
                document.getElementById('modal-desc').innerText = desc;

                modal.style.display = 'flex';
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
    }

    // 5. Tawk.to Script Injection (Global)
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function () {
        var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/69633d7c987b03197cb20051/1jelqgcbd';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
    })();

    // 6. Interactive Catalogue Logic
    const catItems = document.querySelectorAll('.cat-item');
    const catImg = document.getElementById('catalogue-img');

    if (catItems && catImg) {
        catItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                // Update active class
                catItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                // Swap Image with Fade Effect
                const newSrc = item.getAttribute('data-img');

                catImg.style.opacity = '0'; // Fade out
                setTimeout(() => {
                    catImg.src = newSrc;
                    catImg.onload = () => {
                        catImg.style.opacity = '1'; // Fade in
                    };
                }, 200); // Wait for fade out
            });
        });
    }

    // 7. Hero Media Cycle (Desktop Only) - Robust Cross-Fade
    if (window.innerWidth > 768 && document.getElementById('hero-video')) {
        const player1 = document.getElementById('hero-video');
        const player2 = document.getElementById('hero-video-secondary');
        const heroImage = document.getElementById('hero-image-slide');

        // State
        let activeElement = player1;
        let currentIndex = 0;
        let isTransitioning = false;

        const playlist = [
            {
                type: 'video',
                src: 'video/hero/videohero2.mp4',
                title: 'Transforma tu <span class="text-primary">Cuerpo</span><br>Transforma tu <span class="text-outline">Mente</span>',
                desc: 'El gimnasio líder en Costa Rica con equipo de última generación y profesionales dedicados a tu éxito.'
            },
            {
                type: 'video',
                src: 'video/hero/videohero1.mp4',
                title: 'Entrenamiento <span class="text-primary">Experto</span><br>Resultados <span class="text-outline">Reales</span>',
                desc: 'Tecnología de punta y coaches de élite listos para llevarte al siguiente nivel.'
            },
            {
                type: 'image',
                src: 'img/hero/imagenhero1.jpg',
                duration: 7000,
                title: 'Comunidad <span class="text-primary">Tiquicia</span><br>Más que un <span class="text-outline">Gimnasio</span>',
                desc: 'Únete a una familia apasionada por el fitness y el bienestar integral.'
            }
        ];

        // Ensure initial state
        player1.classList.add('active'); // Ensure opacity 1
        player2.classList.remove('active');
        heroImage.classList.remove('active');

        const updateHeroText = (item) => {
            const titleEl = document.getElementById('hero-title');
            const descEl = document.getElementById('hero-desc');

            if (!titleEl || !descEl) return;

            // 1. Exit State (Fade Out + Slide Down slightly)
            titleEl.style.transition = 'all 0.5s ease-in';
            descEl.style.transition = 'all 0.5s ease-in';

            titleEl.style.opacity = '0';
            titleEl.style.transform = 'translateY(20px)';

            descEl.style.opacity = '0';
            descEl.style.transform = 'translateY(20px)';

            setTimeout(() => {
                // 2. Prepare Entry State (Jump to Top hidden)
                // Disable transition for instantaneous jump
                titleEl.style.transition = 'none';
                descEl.style.transition = 'none';

                titleEl.style.transform = 'translateY(-30px)';
                descEl.style.transform = 'translateY(-30px)';

                // Update Content
                titleEl.innerHTML = item.title;
                descEl.innerText = item.desc;

                // Force Reflow/Repaint to acknowledge the jump
                void titleEl.offsetWidth;

                // 3. Enter State (Fade In + Slide Down to 0)
                titleEl.style.transition = 'all 0.8s ease-out';
                descEl.style.transition = 'all 0.8s ease-out';

                titleEl.style.opacity = '1';
                titleEl.style.transform = 'translateY(0)';
                descEl.style.transform = 'translateY(0)';
            }, 500);
        };

        const transitionTo = (nextItem) => {
            if (isTransitioning) return;
            isTransitioning = true;

            console.log("Transitioning to:", nextItem.src || 'Image');

            // Trigger Text Update
            updateHeroText(nextItem);

            let nextElement;

            // 1. Dtermine Next Element & Prepare It
            if (nextItem.type === 'video') {
                // If current is P1, next is P2. If current is Img, use P1 or P2 (whichever is not active, effectively toggle)
                // Simplest: If P1 is active, use P2. Else use P1.
                nextElement = (activeElement === player1) ? player2 : player1;

                nextElement.src = nextItem.src;
                nextElement.muted = true;
                nextElement.load();

                // Play Promise
                nextElement.play().then(() => {
                    performVisualSwap(nextElement, nextItem);
                }).catch(e => {
                    console.error("Play failed, skipping:", e);
                    isTransitioning = false;
                    cycleNext(); // Recover
                });
            } else {
                nextElement = heroImage;
                performVisualSwap(nextElement, nextItem);
            }
        };

        // Helper to attach the "Early Trigger"
        const attachEarlyTrigger = (mediaElement) => {
            const checkTime = () => {
                // Check if we are within 2.0s of the end (Covering 1.5s fade)
                if (mediaElement.duration && (mediaElement.currentTime >= mediaElement.duration - 2.0)) {
                    mediaElement.removeEventListener('timeupdate', checkTime);
                    cycleNext();
                }
            };
            mediaElement.addEventListener('timeupdate', checkTime);
            // Fallback
            mediaElement.onended = () => cycleNext();
        };

        const performVisualSwap = (nextElement, nextItem) => {
            // 2. Put Next on TOP (z-index 2) and Fade In
            nextElement.classList.add('z-top'); // Forces z-index 2

            // Small delay to ensure browser acknowledges z-index before opacity transition
            requestAnimationFrame(() => {
                nextElement.classList.add('active'); // Start Opacity 1 transition (1.5s)

                // 3. Wait for Transition
                setTimeout(() => {
                    // 4. Cleanup Old Active
                    // Remove active from everyone EXCEPT nextElement
                    [player1, player2, heroImage].forEach(el => {
                        if (el !== nextElement) {
                            el.classList.remove('active');
                            el.classList.remove('z-top');
                            // Optional: Pause hidden videos to save resources
                            if (el.tagName === 'VIDEO') el.pause();
                        }
                    });

                    // 5. Normalize Next (Drop z-top, keep active/z-index 1)
                    nextElement.classList.remove('z-top');

                    // Update State
                    activeElement = nextElement;
                    isTransitioning = false;

                    // 6. Setup End Trigger
                    if (nextItem.type === 'video') {
                        attachEarlyTrigger(nextElement);
                    } else {
                        setTimeout(() => cycleNext(), nextItem.duration);
                    }

                }, 1500); // Match CSS duration
            });
        };

        const cycleNext = () => {
            currentIndex = (currentIndex + 1) % playlist.length;
            transitionTo(playlist[currentIndex]);
        };

        // Initialize Loop
        if (player1) {
            // Apply logic to the FIRST video immediately
            // We use 'loadedmetadata' to ensure duration is known, or if readyState is sufficient
            if (player1.readyState >= 1) {
                attachEarlyTrigger(player1);
            } else {
                player1.addEventListener('loadedmetadata', () => attachEarlyTrigger(player1));
            }

            // Failsafe for initial video playback
            if (player1.paused) player1.play().catch(console.error);
        }
    }

    // 12. Velocity Skew Effect (Desktop Only)
    // Adds physical weight/inertia to the scroll
    if (window.innerWidth > 1024) {
        const content = document.getElementById('main-content');
        if (content) {
            let currentPos = window.pageYOffset;
            let skew = 0;

            const loop = () => {
                const newPos = window.pageYOffset;
                const diff = newPos - currentPos;
                const speed = diff * 0.15; // Sensitivity factor

                // Apply friction/easing to skew
                skew += (speed - skew) * 0.1;

                // Clamp skew to prevent nausea (max 2deg)
                if (skew > 2) skew = 2;
                if (skew < -2) skew = -2;

                // Round to avoid sub-pixel blurring
                const displaySkew = Math.round(skew * 100) / 100;

                if (Math.abs(displaySkew) > 0.05) {
                    content.style.transform = `skewY(${displaySkew}deg)`;
                } else {
                    content.style.transform = `skewY(0deg)`; // Reset for crisp text
                }

                currentPos = newPos;
                requestAnimationFrame(loop);
            };

            loop();
        }
    }


    // 13. Anti-Inspection Logic
    // Prevent Right Click
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // Prevent F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === 123) { // F12
            e.preventDefault();
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) { // Ctrl+Shift+I
            e.preventDefault();
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) { // Ctrl+Shift+J
            e.preventDefault();
            return false;
        }
        if (e.ctrlKey && e.keyCode === 85) { // Ctrl+U
            e.preventDefault();
            return false;
        }
    });

});

