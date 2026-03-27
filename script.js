// 1. Entrance Animation
gsap.from(".bento-item", {
    y: 80,
    opacity: 0,
    duration: 1.4,
    stagger: 0.1,
    ease: "expo.out"
});

// 2. Continuous 3D Sneaker Spin
const sneakerSpin = gsap.to(".sneaker-img", {
    rotationY: 360,
    duration: 12,
    repeat: -1,
    ease: "none"
});

// 3. Counter Growth
gsap.from(".counter", {
    innerText: 0,
    duration: 2.5,
    snap: { innerText: 0.1 },
    ease: "power4.out",
    delay: 0.5
});

// 4. Global Mouse Logic (Tilt + Light Follow)
const bentoItems = document.querySelectorAll('.bento-item');

bentoItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = item.getBoundingClientRect();
        
        // Coordinates relative to the card
        const x = e.clientX - left;
        const y = e.clientY - top;

        // Update CSS variables for Light Follow spotlight
        item.style.setProperty('--mouse-x', `${x}px`);
        item.style.setProperty('--mouse-y', `${y}px`);

        // 3D Tilt math
        const tiltX = (x / width - 0.5) * 12; // Max 12 deg
        const tiltY = (y / height - 0.5) * 12;

        gsap.to(item, {
            rotationY: tiltX,
            rotationX: -tiltY,
            transformPerspective: 1000,
            duration: 0.4,
            ease: "power2.out"
        });

        // Background Glow for Sneaker Card (Behind the shoe)
        if(item.classList.contains('product-card')) {
            const glow = item.querySelector('.card-glow');
            glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,127,255,0.25) 0%, transparent 70%)`;
        }
    });

    item.addEventListener('mouseleave', () => {
        // Reset tilt on exit
        gsap.to(item, { rotationY: 0, rotationX: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
        
        // Reset Light Follow position
        item.style.setProperty('--mouse-x', `50%`);
        item.style.setProperty('--mouse-y', `50%`);
    });
});
// Add this check at the start of your mouse interaction logic
const isTouchDevice = 'ontouchstart' in window;

bentoItems.forEach(item => {
    // Only run Tilt/Light effects if NOT a touch device for better performance
    if (!isTouchDevice) {
        item.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = item.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;

            item.style.setProperty('--mouse-x', `${x}px`);
            item.style.setProperty('--mouse-y', `${y}px`);

            const tiltX = (x / width - 0.5) * 12;
            const tiltY = (y / height - 0.5) * 12;

            gsap.to(item, {
                rotationY: tiltX,
                rotationX: -tiltY,
                duration: 0.4
            });
        });
    } else {
        // Mobile behavior: Simple pulse on tap
        item.addEventListener('touchstart', () => {
            gsap.to(item, { scale: 0.98, duration: 0.2, yoyo: true, repeat: 1 });
        });
    }
});