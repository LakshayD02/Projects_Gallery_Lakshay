// Filter functionality
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        const filterValue = button.getAttribute("data-filter");

        projectCards.forEach((card) => {
            if (filterValue === "all") {
                card.classList.remove("hidden");
                card.style.display = "flex";
            } else {
                const cardCategory = card.getAttribute("data-category");
                if (cardCategory === filterValue) {
                    card.classList.remove("hidden");
                    card.style.display = "flex";
                } else {
                    card.classList.add("hidden");
                    card.style.display = "none";
                }
            }
        });
    });
});

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    // Show all projects initially
    projectCards.forEach((card) => {
        card.style.display = "flex";
    });

    // Get or create modal elements
    let projectModal = document.getElementById("project-modal");
    let modalContent = document.querySelector(".modal-content");
    let modalBackBtn = document.getElementById("modal-back-btn");
    let modalTitle = document.querySelector(".modal-title");

    // If modal doesn't exist, create it
    if (!projectModal) {
        const modalHTML = `
            <div id="project-modal" class="project-modal">
                <div class="modal-header">
                    <button id="modal-back-btn" class="modal-back-btn">
                        <i class="fas fa-arrow-left"></i> Back
                    </button>
                    <h3 class="modal-title">Project Details</h3>
                    <button class="modal-close-btn" aria-label="Close modal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-content"></div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // Get final references
    const finalModal = document.getElementById("project-modal");
    const finalModalContent = document.querySelector(".modal-content");
    const finalModalBackBtn = document.getElementById("modal-back-btn");
    const finalModalTitle = document.querySelector(".modal-title");
    const closeBtn = document.querySelector(".modal-close-btn");

    // Close modal function
    function closeModal() {
        if (finalModal) {
            finalModal.style.display = "none";
            finalModal.classList.remove("active");
            document.body.style.overflow = "";
            document.body.classList.remove("modal-open");
        }
    }

    // Open modal function
    function openModal(projectCard) {
        if (!finalModal || !finalModalContent) return;

        // Deep clone the project card
        const clonedCard = projectCard.cloneNode(true);
        clonedCard.classList.add("modal-project-card");
        clonedCard.classList.remove("project-card");
        clonedCard.style.display = "block";

        // Remove view more overlay
        const clonedOverlay = clonedCard.querySelector(".view-more-overlay");
        if (clonedOverlay) clonedOverlay.remove();

        // Remove any stray view-more-btn
        const extraBtn = clonedCard.querySelector(".view-more-btn");
        if (extraBtn) extraBtn.remove();

        // Ensure description is fully visible
        const desc = clonedCard.querySelector(".project-description");
        if (desc) {
            desc.style.display = "block";
            desc.style.webkitLineClamp = "unset";
            desc.style.maxHeight = "none";
            desc.style.overflow = "visible";
        }

        // Update modal title
        const projectTitle = clonedCard.querySelector(".project-title");
        if (finalModalTitle && projectTitle) {
            finalModalTitle.textContent = projectTitle.textContent;
        }

        // Clear and add content
        finalModalContent.innerHTML = "";
        finalModalContent.appendChild(clonedCard);

        // Show modal
        finalModal.style.display = "block";
        finalModal.classList.add("active");
        document.body.style.overflow = "hidden";
        document.body.classList.add("modal-open");

        // Scroll to top
        finalModal.scrollTop = 0;
    }

    // Event listeners for closing
    if (finalModalBackBtn) {
        finalModalBackBtn.addEventListener("click", closeModal);
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    // Close on backdrop click
    if (finalModal) {
        finalModal.addEventListener("click", (e) => {
            if (e.target === finalModal) {
                closeModal();
            }
        });
    }

    // Handle View More buttons
    const viewMoreOverlays = document.querySelectorAll(".view-more-overlay");

    viewMoreOverlays.forEach((overlay) => {
        const viewMoreBtn = overlay.querySelector(".view-more-btn");
        const projectCard = overlay.closest(".project-card");

        if (viewMoreBtn && projectCard) {
            // Remove existing listeners by cloning
            const newBtn = viewMoreBtn.cloneNode(true);
            viewMoreBtn.parentNode.replaceChild(newBtn, viewMoreBtn);

            newBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                e.preventDefault();

                // On mobile (<= 640px), open modal
                if (window.innerWidth <= 640) {
                    openModal(projectCard);
                }
                // On desktop, expand/collapse
                else {
                    if (projectCard.classList.contains("expanded")) {
                        projectCard.classList.remove("expanded");
                        newBtn.textContent = "View More";
                    } else {
                        projectCard.classList.add("expanded");
                        newBtn.textContent = "View Less";
                    }
                }
            });
        }
    });

    // Close modal on resize from mobile to desktop
    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 640 && finalModal && finalModal.classList.contains("active")) {
                closeModal();
            }
        }, 100);
    });

    // Close modal on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && finalModal && finalModal.classList.contains("active")) {
            closeModal();
        }
    });

    // Prevent touch events from bubbling incorrectly on modal content
    if (finalModalContent) {
        finalModalContent.addEventListener("touchstart", (e) => {
            e.stopPropagation();
        }, { passive: true });
    }

    // Set copyright year
    const yearEl = document.getElementById("copyright-year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});
