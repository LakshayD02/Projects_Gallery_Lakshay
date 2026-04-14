// Filter functionality
const filterButtons = document.querySelectorAll(".filter-btn")
const projectCards = document.querySelectorAll(".project-card")

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((btn) => btn.classList.remove("active"))
        button.classList.add("active")

        const filterValue = button.getAttribute("data-filter")

        projectCards.forEach((card) => {
            if (filterValue === "all") {
                card.classList.remove("hidden")
                card.style.display = "flex"
            } else {
                const cardCategory = card.getAttribute("data-category")
                if (cardCategory === filterValue) {
                    card.classList.remove("hidden")
                    card.style.display = "flex"
                } else {
                    card.classList.add("hidden")
                    card.style.display = "none"
                }
            }
        })
    })
})

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    // Show all projects initially
    projectCards.forEach((card) => {
        card.style.display = "flex"
    })

    // Get modal elements
    const projectModal = document.getElementById("project-modal")
    const modalContent = document.querySelector(".modal-content")
    const modalBackBtn = document.getElementById("modal-back-btn")
    const modalTitle = document.querySelector(".modal-title")

    // Close modal function
    function closeModal() {
        if (projectModal) {
            projectModal.style.display = "none"
            projectModal.classList.remove("active")
            document.body.style.overflow = ""
            document.body.classList.remove("modal-open")
        }
    }

    // Open modal function
    function openModal(projectCard) {
        if (!projectModal || !modalContent) return
        
        // Clone the project card
        const clonedCard = projectCard.cloneNode(true)
        clonedCard.classList.add("modal-project-card")
        clonedCard.classList.remove("project-card")

        // Remove view more overlay from cloned card
        const clonedOverlay = clonedCard.querySelector(".view-more-overlay")
        if (clonedOverlay) {
            clonedOverlay.remove()
        }

        // Update modal title
        const projectTitle = clonedCard.querySelector(".project-title")
        if (modalTitle && projectTitle) {
            modalTitle.textContent = projectTitle.textContent
        }

        // Clear and add content
        modalContent.innerHTML = ""
        modalContent.appendChild(clonedCard)

        // Show modal
        projectModal.style.display = "block"
        projectModal.classList.add("active")
        document.body.style.overflow = "hidden"
        document.body.classList.add("modal-open")
    }

    // Back button click
    if (modalBackBtn) {
        modalBackBtn.addEventListener("click", closeModal)
    }

    // Close modal when clicking outside
    if (projectModal) {
        projectModal.addEventListener("click", (e) => {
            if (e.target === projectModal) {
                closeModal()
            }
        })
    }

    // Handle View More buttons
    const viewMoreOverlays = document.querySelectorAll(".view-more-overlay")
    
    viewMoreOverlays.forEach((overlay) => {
        const viewMoreBtn = overlay.querySelector(".view-more-btn")
        const projectCard = overlay.closest(".project-card")

        if (viewMoreBtn && projectCard) {
            viewMoreBtn.addEventListener("click", (e) => {
                e.stopPropagation()
                
                // On mobile (width <= 600px), open modal
                if (window.innerWidth <= 600) {
                    openModal(projectCard)
                }
                // On desktop, expand/collapse
                else {
                    if (projectCard.classList.contains("expanded")) {
                        projectCard.classList.remove("expanded")
                        viewMoreBtn.textContent = "View More"
                    } else {
                        projectCard.classList.add("expanded")
                        viewMoreBtn.textContent = "View Less"
                    }
                }
            })
        }
    })

    // Close modal on resize from mobile to desktop
    function handleResize() {
        if (window.innerWidth > 600 && projectModal && projectModal.style.display === "block") {
            closeModal()
        }
    }

    window.addEventListener("resize", handleResize)

    // Close modal on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && projectModal && projectModal.style.display === "block") {
            closeModal()
        }
    })

    // Set copyright year
    const yearEl = document.getElementById('copyright-year')
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear()
    }
})
