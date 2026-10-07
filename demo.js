// Shared Mobile Navigation and Interactions for Showcase Demo Pages
document.addEventListener("DOMContentLoaded", () => {

    const mobileToggle = document.getElementById("mobileMenuToggle");
    const closeBtn = document.getElementById("closeMobileMenuBtn");
    const drawer = document.getElementById("mobileNavDrawer");
    const backdrop = document.getElementById("mobileNavBackdrop");
    const navLinks = document.querySelectorAll(".mobile-nav-link");

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

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && drawer && drawer.classList.contains("is-open")) {
            closeMenu();
        }
    });

    // Close when any mobile navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });

    // Close drawer when resized above mobile/tablet breakpoint
    window.addEventListener("resize", () => {
        if (window.innerWidth > 900 && drawer && drawer.classList.contains("is-open")) {
            closeMenu();
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function(e) {
            const targetId = this.getAttribute("href");
            if (!targetId || targetId === "#") return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

});
