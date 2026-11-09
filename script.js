/**
 * LAKSHAY DHOUNDIYAL - PROJECT SHOWCASE & PORTFOLIO
 * Modern Interactive Script: Combined Search, Category Filter,
 * Theme Toggle, Modal Dialog, Dynamic Counts & Smooth Interactions.
 */

document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------------------------------------------------
    // 1. Elements & State
    // -------------------------------------------------------------------------
    const projectCards = Array.from(document.querySelectorAll(".project-card"));
    const filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
    const searchInput = document.getElementById("project-search");
    const clearSearchBtn = document.getElementById("clear-search");
    const resultsCountText = document.getElementById("results-count-text");
    const noResultsState = document.getElementById("no-results");
    const resetFiltersBtn = document.getElementById("reset-filters-btn");
    const themeToggleBtn = document.getElementById("theme-toggle");
    const backToTopBtn = document.getElementById("back-to-top");
    const heroTotalCount = document.getElementById("hero-total-count");

    // Modal elements
    const projectModal = document.getElementById("project-modal");
    const modalContent = document.querySelector(".modal-content");
    const modalBackBtn = document.getElementById("modal-back-btn");
    const modalCloseIcon = document.getElementById("modal-close-icon");
    const modalTitle = document.querySelector(".modal-title");
    const modalBackdrop = document.querySelector(".modal-backdrop");

    let currentCategory = "all";
    let currentSearchQuery = "";

    // Category display label mapping
    const categoryLabels = {
        fullstack: "Full Stack",
        python: "Python & AI",
        cybersecurity: "Cybersecurity",
        others: "Specialized"
    };

    // -------------------------------------------------------------------------
    // 2. Enhance Project Cards with Badges & Image Wrappers
    // -------------------------------------------------------------------------
    projectCards.forEach((card) => {
        const category = card.getAttribute("data-category") || "others";
        const img = card.querySelector(".project-image");

        // Ensure each card has an image wrapper with category badge
        if (img && !img.parentElement.classList.contains("image-wrapper")) {
            const wrapper = document.createElement("div");
            wrapper.className = "image-wrapper";
            img.parentNode.insertBefore(wrapper, img);
            wrapper.appendChild(img);

            // Add floating category badge
            const badge = document.createElement("span");
            badge.className = "card-category-badge";
            badge.textContent = categoryLabels[category] || category.toUpperCase();
            wrapper.appendChild(badge);
        }

        // Graceful Image Fallback if image fails to load
        if (img) {
            img.addEventListener("error", function () {
                this.onerror = null;
                const title = card.querySelector(".project-title")?.textContent || "Project Preview";
                const catText = categoryLabels[category] || category.toUpperCase();
                this.src = `data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22600%22%20height%3D%22340%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%231e1b4b%22%2F%3E%3Cstop%20offset%3D%2250%25%22%20stop-color%3D%22%230f172a%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%22300%22%20cy%3D%22130%22%20r%3D%2246%22%20fill%3D%22rgba(99%2C102%2C241%2C0.18)%22%2F%3E%3Ctext%20x%3D%22300%22%20y%3D%22142%22%20font-size%3D%2232%22%20fill%3D%22%23818cf8%22%20font-family%3D%22sans-serif%22%20text-anchor%3D%22middle%22%3E%E2%9A%A1%3C%2Ftext%3E%3Ctext%20x%3D%22300%22%20y%3D%22220%22%20font-size%3D%2220%22%20font-weight%3D%22bold%22%20fill%3D%22%23f8fafc%22%20font-family%3D%22sans-serif%22%20text-anchor%3D%22middle%22%3E${encodeURIComponent(title.slice(0, 32))}%3C%2Ftext%3E%3Ctext%20x%3D%22300%22%20y%3D%22252%22%20font-size%3D%2213%22%20font-weight%3D%22600%22%20letter-spacing%3D%221px%22%20fill%3D%22%2394a3b8%22%20font-family%3D%22sans-serif%22%20text-anchor%3D%22middle%22%3E${encodeURIComponent(catText)}%3C%2Ftext%3E%3C%2Fsvg%3E`;
            });
        }
    });

    // -------------------------------------------------------------------------
    // 3. Category Counts Calculation
    // -------------------------------------------------------------------------
    function updateCategoryCounts() {
        const counts = {
            all: projectCards.length,
            fullstack: 0,
            python: 0,
            cybersecurity: 0,
            others: 0
        };

        projectCards.forEach((card) => {
            const cat = card.getAttribute("data-category");
            if (counts[cat] !== undefined) {
                counts[cat]++;
            } else {
                counts.others++;
            }
        });

        // Update counts in filter buttons
        Object.keys(counts).forEach((cat) => {
            const countEl = document.getElementById(`count-${cat}`);
            if (countEl) {
                countEl.textContent = counts[cat];
            }
        });

        // Update hero metric
        if (heroTotalCount) {
            heroTotalCount.textContent = `${counts.all}+`;
        }
    }
    updateCategoryCounts();

    // -------------------------------------------------------------------------
    // 4. Combined Filter & Search Engine
    // -------------------------------------------------------------------------
    function applyFilters() {
        const query = currentSearchQuery.trim().toLowerCase();
        let visibleCount = 0;

        projectCards.forEach((card) => {
            const cardCategory = card.getAttribute("data-category") || "";
            const title = (card.querySelector(".project-title")?.textContent || "").toLowerCase();
            const desc = (card.querySelector(".project-description")?.textContent || "").toLowerCase();

            const tags = Array.from(card.querySelectorAll(".tag"))
                .map((t) => t.textContent.toLowerCase())
                .join(" ");

            // Category match
            const matchesCategory = (currentCategory === "all") || (cardCategory === currentCategory);

            // Search match
            const matchesSearch = !query ||
                title.includes(query) ||
                desc.includes(query) ||
                tags.includes(query);

            if (matchesCategory && matchesSearch) {
                card.classList.remove("hidden");
                card.style.display = "flex";
                visibleCount++;
            } else {
                card.classList.add("hidden");
                card.style.display = "none";
            }
        });

        // Update Results Count Text
        if (resultsCountText) {
            if (query || currentCategory !== "all") {
                resultsCountText.textContent = `Showing ${visibleCount} of ${projectCards.length} projects`;
            } else {
                resultsCountText.textContent = `Showing all ${projectCards.length} projects`;
            }
        }

        // Show/hide empty state
        if (noResultsState) {
            noResultsState.style.display = visibleCount === 0 ? "flex" : "none";
        }
    }

    // -------------------------------------------------------------------------
    // 5. Category Filter Button Handlers
    // -------------------------------------------------------------------------
    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            currentCategory = btn.getAttribute("data-filter") || "all";
            applyFilters();
        });
    });

    // -------------------------------------------------------------------------
    // 6. Search Input Handlers
    // -------------------------------------------------------------------------
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            currentSearchQuery = e.target.value;
            if (clearSearchBtn) {
                clearSearchBtn.style.display = currentSearchQuery ? "flex" : "none";
            }
            applyFilters();
        });

        // Keyboard shortcut: Ctrl + K or '/' to focus search
        document.addEventListener("keydown", (e) => {
            if ((e.ctrlKey && e.key === "k") || (e.key === "/" && document.activeElement !== searchInput)) {
                e.preventDefault();
                searchInput.focus();
                searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        });
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener("click", () => {
            if (searchInput) {
                searchInput.value = "";
                currentSearchQuery = "";
                clearSearchBtn.style.display = "none";
                searchInput.focus();
                applyFilters();
            }
        });
    }

    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener("click", () => {
            if (searchInput) {
                searchInput.value = "";
                currentSearchQuery = "";
            }
            if (clearSearchBtn) {
                clearSearchBtn.style.display = "none";
            }
            currentCategory = "all";
            filterButtons.forEach((b) => {
                if (b.getAttribute("data-filter") === "all") {
                    b.classList.add("active");
                } else {
                    b.classList.remove("active");
                }
            });
            applyFilters();
        });
    }

    // -------------------------------------------------------------------------
    // 7. Theme Management (Dark & Light)
    // -------------------------------------------------------------------------
    const THEME_STORAGE_KEY = "lakshay_portfolio_theme";

    function initTheme() {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme) {
            document.body.className = savedTheme;
        } else {
            // Default to dark theme for high-tech aesthetic
            document.body.className = "dark-theme";
        }
    }
    initTheme();

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const isDark = document.body.classList.contains("dark-theme");
            const newTheme = isDark ? "light-theme" : "dark-theme";
            document.body.className = newTheme;
            localStorage.setItem(THEME_STORAGE_KEY, newTheme);
        });
    }

    // -------------------------------------------------------------------------
    // 8. Project Detail Modal
    // -------------------------------------------------------------------------
    function openModal(projectCard) {
        if (!projectModal || !modalContent) return;

        // Clone the card for modal view
        const clonedCard = projectCard.cloneNode(true);
        clonedCard.classList.add("modal-project-card");
        clonedCard.classList.remove("project-card", "hidden");
        clonedCard.style.display = "block";

        // Remove overlay / view more buttons
        const overlay = clonedCard.querySelector(".view-more-overlay");
        if (overlay) overlay.remove();
        const extraBtn = clonedCard.querySelector(".view-more-btn");
        if (extraBtn) extraBtn.remove();

        // Update modal title
        const titleEl = clonedCard.querySelector(".project-title");
        if (modalTitle && titleEl) {
            modalTitle.textContent = titleEl.textContent;
        }

        // Put cloned content in modal
        modalContent.innerHTML = "";
        modalContent.appendChild(clonedCard);

        // Open modal
        projectModal.classList.add("active");
        projectModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
    }

    function closeModal() {
        if (!projectModal) return;
        projectModal.classList.remove("active");
        projectModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
    }

    // Modal close triggers
    if (modalBackBtn) modalBackBtn.addEventListener("click", closeModal);
    if (modalCloseIcon) modalCloseIcon.addEventListener("click", closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);

    projectModal?.addEventListener("click", (e) => {
        if (e.target === projectModal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && projectModal && projectModal.classList.contains("active")) {
            closeModal();
        }
    });

    // Make project cards clickable for details modal
    projectCards.forEach((card) => {
        const title = card.querySelector(".project-title");
        const img = card.querySelector(".project-image");
        const viewMoreBtn = card.querySelector(".view-more-btn");

        [title, img, viewMoreBtn].forEach((el) => {
            if (el) {
                el.style.cursor = "pointer";
                el.addEventListener("click", (e) => {
                    e.stopPropagation();
                    openModal(card);
                });
            }
        });
    });

    // -------------------------------------------------------------------------
    // 9. Floating Back to Top Button
    // -------------------------------------------------------------------------
    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 350) {
                backToTopBtn.classList.add("visible");
            } else {
                backToTopBtn.classList.remove("visible");
            }
        }, { passive: true });

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // -------------------------------------------------------------------------
    // 10. Dynamic Copyright Year
    // -------------------------------------------------------------------------
    const copyrightYear = document.getElementById("copyright-year");
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }
});
