
/* =================================
   NAVBAR AKTIF DAN AUTOSCROLL
================================= */

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(
        '.navbar .nav-link[href^="#"]'
    );

    const sections = [...navLinks]
        .map(link => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    function setActiveNavigation(sectionId) {
        navLinks.forEach(link => {
            const active = link.getAttribute("href") === `#${sectionId}`;

            link.classList.toggle("active", active);

            if (active) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener("click", event => {
            const target = document.querySelector(link.getAttribute("href"));

            if (!target) return;

            event.preventDefault();
            setActiveNavigation(target.id);

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            history.replaceState(null, "", `#${target.id}`);
        });
    });

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
            const visible = entries
                .filter(entry => entry.isIntersecting)
                .sort((a, b) =>
                    b.intersectionRatio - a.intersectionRatio
                );

            if (visible.length) {
                setActiveNavigation(visible[0].target.id);
            }
        }, {
            rootMargin: "-20% 0px -60% 0px",
            threshold: [0, 0.25, 0.5]
        });

        sections.forEach(section => observer.observe(section));
    }
});


/* =================================
   FORMULIR CONTACT
================================= */

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("contactStatus");

    if (!form || !status) return;

    form.addEventListener("submit", event => {
        event.preventDefault();

        status.textContent =
            "Formulir valid, tetapi pesan belum dikirim. Diperlukan backend atau layanan email untuk mengirim pesan.";
    });
});
