// 1. Initialize GSAP Timeline for Entrance
const tl = gsap.timeline();
const isTouchDevice = 'ontouchstart' in window;

// 2. Cinematic Header & Grid Entrance
tl.from(".mds-header", {
    y: -50,
    opacity: 0,
    duration: 1.5,
    ease: "expo.out"
});

tl.from(".bento-item", {
    y: 100,
    opacity: 0,
    duration: 1.2,
    stagger: 0.1,
    ease: "elastic.out(1, 0.7)"
}, "-=1"); // Overlap with header for a smooth feel

// 3. Counter Animation (Linked to timeline or independent)
gsap.from(".counter", {
    innerText: 0,
    duration: 2.5,
    snap: { innerText: 0.1 },
    ease: "power4.out",
    delay: 0.5
});

// 4. Continuous Sneaker Spin
const sneakerSpin = gsap.to(".sneaker-img", {
    rotationY: 360,
    duration: 12,
    repeat: -1,
    ease: "none"
});

// 5. Global Breathing Effect (Ambient Motion)
gsap.to(".bento-item", {
    borderColor: "rgba(0, 127, 255, 0.4)",
    boxShadow: "0 0 20px rgba(0, 127, 255, 0.1)",
    duration: 2,
    repeat: -1,
    yoyo: true,
    stagger: {
        each: 0.2,
        from: "random"
    },
    ease: "sine.inOut"
});

// 6. Interactive Logic (Tilt + Light Follow)
const bentoItems = document.querySelectorAll('.bento-item');

bentoItems.forEach(item => {
    if (!isTouchDevice) {
        // Desktop: High-End Tilt & Light Follow
        item.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = item.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;

            // Set Light Follow CSS Variables
            item.style.setProperty('--mouse-x', `${x}px`);
            item.style.setProperty('--mouse-y', `${y}px`);

            // Calculate Tilt
            const tiltX = (x / width - 0.5) * 12;
            const tiltY = (y / height - 0.5) * 12;

            gsap.to(item, {
                rotationY: tiltX,
                rotationX: -tiltY,
                transformPerspective: 1000,
                duration: 0.4,
                ease: "power2.out"
            });

            // Special Glow for Product Card
            if(item.classList.contains('product-card')) {
                const glow = item.querySelector('.card-glow');
                if(glow) {
                    glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,127,255,0.25) 0%, transparent 70%)`;
                }
            }
        });

        item.addEventListener('mouseleave', () => {
            // Reset everything on exit
            gsap.to(item, { 
                rotationY: 0, 
                rotationX: 0, 
                duration: 1, 
                ease: "elastic.out(1, 0.3)" 
            });
            item.style.setProperty('--mouse-x', `50%`);
            item.style.setProperty('--mouse-y', `50%`);
        });

    } else {
        // Mobile: Simple Interactive Pulse
        item.addEventListener('touchstart', () => {
            gsap.to(item, { 
                scale: 0.95, 
                duration: 0.2, 
                yoyo: true, 
                repeat: 1,
                ease: "power1.inOut"
            });
        });
    }
});