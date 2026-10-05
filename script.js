document.addEventListener("DOMContentLoaded", () => {

    // Mobile navigation toggle (if present)
    const mobileToggle = document.querySelector(".mobile-menu-toggle");
    const navMenu = document.querySelector("header nav");

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener("click", () => {
            navMenu.classList.toggle("nav-open");
            mobileToggle.classList.toggle("active");
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");
            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);
            if (target) {
                event.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth"
                });
                if (navMenu && navMenu.classList.contains("nav-open")) {
                    navMenu.classList.remove("nav-open");
                    if (mobileToggle) mobileToggle.classList.remove("active");
                }
            }
        });
    });

    // Scroll reveal with safe fallback
    const revealElements = document.querySelectorAll(
        ".theme-card, .feature, .cta-section"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";
                        obs.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach(element => {
            element.style.opacity = "0";
            element.style.transform = "translateY(20px)";
            element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            observer.observe(element);
        });

        // Safety timeout: ensure everything becomes visible even if observer fails or doesn't trigger
        setTimeout(() => {
            revealElements.forEach(element => {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            });
        }, 1200);
    } else {
        // Fallback for older browsers
        revealElements.forEach(element => {
            element.style.opacity = "1";
            element.style.transform = "none";
        });
    }

});