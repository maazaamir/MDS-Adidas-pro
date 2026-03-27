const tl = gsap.timeline();
const isTouchDevice = 'ontouchstart' in window;

// 1. Entrance Sequence
tl.from(".mds-header", { y: -50, opacity: 0, duration: 1, ease: "power3.out" })
  .from(".bento-item", { 
    y: 50, 
    opacity: 0, 
    stagger: 0.1, 
    duration: 0.8, 
    ease: "back.out(1.7)" 
  }, "-=0.5");

// 2. Continuous Sneaker Rotation
gsap.to(".sneaker-img", { rotationY: 360, duration: 10, repeat: -1, ease: "none" });

// 3. Ambient Breathing Effect
gsap.to(".bento-item", {
    borderColor: "rgba(0, 127, 255, 0.4)",
    duration: 2,
    repeat: -1,
    yoyo: true,
    stagger: { each: 0.2, from: "random" },
    ease: "sine.inOut"
});

// 4. Counter Animation
gsap.from(".counter", {
    innerText: 0,
    duration: 2,
    snap: { innerText: 0.1 },
    ease: "power2.out"
});

// 5. Interaction Logic
const bentoItems = document.querySelectorAll('.bento-item');

bentoItems.forEach(item => {
    if (!isTouchDevice) {
        item.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = item.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;

            item.style.setProperty('--mouse-x', `${x}px`);
            item.style.setProperty('--mouse-y', `${y}px`);

            const tiltX = (x / width - 0.5) * 10;
            const tiltY = (y / height - 0.5) * 10;

            gsap.to(item, {
                rotationY: tiltX,
                rotationX: -tiltY,
                transformPerspective: 1000,
                duration: 0.3
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, { rotationY: 0, rotationX: 0, duration: 0.5 });
        });
    }
});