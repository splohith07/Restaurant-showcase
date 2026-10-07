document.addEventListener("DOMContentLoaded", () => {

    // Mobile navigation drawer controls
    const mobileToggle = document.getElementById("mobileMenuToggle");
    const closeBtn = document.getElementById("closeMobileMenuBtn");
    const drawer = document.getElementById("mobileNavDrawer");
    const backdrop = document.getElementById("mobileNavBackdrop");
    const navLinks = document.querySelectorAll(".mobile-nav-link, .mobile-nav-cta");

    function openMenu() {
        if (!drawer || !backdrop) return;
        drawer.classList.add("is-open");
        backdrop.classList.add("is-open");
        if (mobileToggle) {
            mobileToggle.classList.add("is-active");
            mobileToggle.setAttribute("aria-expanded", "true");
        }
        document.body.style.overflow = "hidden";
    }

    function closeMenu() {
        if (!drawer || !backdrop) return;
        drawer.classList.remove("is-open");
        backdrop.classList.remove("is-open");
        if (mobileToggle) {
            mobileToggle.classList.remove("is-active");
            mobileToggle.setAttribute("aria-expanded", "false");
        }
        document.body.style.overflow = "";
    }

    if (mobileToggle) {
        mobileToggle.addEventListener("click", () => {
            if (drawer && drawer.classList.contains("is-open")) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    if (backdrop) backdrop.addEventListener("click", closeMenu);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && drawer && drawer.classList.contains("is-open")) {
            closeMenu();
        }
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900 && drawer && drawer.classList.contains("is-open")) {
            closeMenu();
        }
    });

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
                closeMenu();
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
