// Dark/Light Theme toggle
const toggleSwitch = document.getElementById("theme-toggle")
const body = document.body

// Filter functionality
const filterButtons = document.querySelectorAll(".filter-btn")
const projectCards = document.querySelectorAll(".project-card")

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"))
        // Add active class to clicked button
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

    const viewMoreOverlays = document.querySelectorAll(".view-more-overlay")
    const projectModal = document.getElementById("project-modal")
    const modalContent = document.querySelector(".modal-content")
    const modalBackBtn = document.getElementById("modal-back-btn")
    const modalTitle = document.querySelector(".modal-title")

    // Close modal function
    function closeModal() {
        projectModal.style.display = "none"
        projectModal.classList.remove("active")
        document.body.style.overflow = ""
        document.body.classList.remove("modal-open")
        // Clear modal content
        if (modalContent) {
            modalContent.innerHTML = ""
        }
    }

    // Open modal function
    function openModal(projectCard) {
        if (!projectModal || !modalContent) return
        
        // Clone the project card for modal
        const clonedCard = projectCard.cloneNode(true)
        clonedCard.classList.add("modal-project-card")
        clonedCard.classList.remove("project-card")

        // Remove the view more overlay from cloned card
        const clonedOverlay = clonedCard.querySelector(".view-more-overlay")
        if (clonedOverlay) {
            clonedOverlay.remove()
        }

        // Update modal title
        const projectTitle = clonedCard.querySelector(".project-title")
        if (modalTitle && projectTitle) {
            modalTitle.textContent = projectTitle.textContent
        }

        // Clear modal content and add cloned card
        modalContent.innerHTML = ""
        modalContent.appendChild(clonedCard)

        // Show modal
        projectModal.style.display = "flex"
        projectModal.classList.add("active")
        document.body.style.overflow = "hidden"
        document.body.classList.add("modal-open")
    }

    // Back button click handler
    if (modalBackBtn) {
        modalBackBtn.addEventListener("click", closeModal)
    }

    // Close modal when clicking outside content
    if (projectModal) {
        projectModal.addEventListener("click", (e) => {
            if (e.target === projectModal) {
                closeModal()
            }
        })
    }

    // Handle view more button clicks
    viewMoreOverlays.forEach((overlay) => {
        const viewMoreBtn = overlay.querySelector(".view-more-btn")
        const projectCard = overlay.parentElement

        if (viewMoreBtn) {
            viewMoreBtn.addEventListener("click", (e) => {
                e.stopPropagation()
                
                // Check if we're on mobile device
                if (window.innerWidth <= 600) {
                    openModal(projectCard)
                } else {
                    // Desktop behavior - expand/collapse
                    if (projectCard.classList.contains("expanded")) {
                        projectCard.classList.remove("expanded")
                        viewMoreBtn.textContent = "View More"
                        setTimeout(() => {
                            projectCard.scrollIntoView({
                                behavior: "smooth",
                                block: "nearest",
                            })
                        }, 100)
                    } else {
                        projectCard.classList.add("expanded")
                        viewMoreBtn.textContent = "View Less"
                    }
                }
            })
        }
    })

    // Handle window resize - close modal if switching to desktop
    function handleResize() {
        if (window.innerWidth > 600 && projectModal && projectModal.style.display === "flex") {
            closeModal()
        }
    }

    window.addEventListener("resize", handleResize)

    // Handle escape key to close modal
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && projectModal && projectModal.style.display === "flex") {
            closeModal()
        }
    })

    // Footer: set current year dynamically
    const yearEl = document.getElementById('copyright-year')
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear()
    }
})

// Optional: Add CSS for expanded desktop view
const style = document.createElement('style')
style.textContent = `
    /* Desktop expanded view */
    @media (min-width: 601px) {
        .project-card.expanded {
            grid-column: span 1;
            max-height: none;
        }
        .project-card.expanded .project-description {
            -webkit-line-clamp: unset;
            max-height: none;
            overflow: visible;
        }
        .project-card.expanded .view-more-overlay {
            display: none;
        }
    }
    
    /* Modal styles */
    .project-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 1000;
        overflow-y: auto;
        display: none;
    }
    
    .project-modal.active {
        display: flex;
        align-items: flex-start;
        justify-content: center;
    }
    
    .modal-header {
        position: sticky;
        top: 0;
        background: white;
        padding: 15px;
        display: flex;
        align-items: center;
        gap: 10px;
        border-bottom: 1px solid #ddd;
        z-index: 10;
    }
    
    .modal-back-btn {
        background: #f0f0f0;
        border: none;
        padding: 8px 12px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
    }
    
    .modal-title {
        margin: 0;
        font-size: 18px;
        flex: 1;
    }
    
    .modal-content {
        padding: 15px;
        max-width: 600px;
        margin: 0 auto;
        width: 100%;
    }
    
    .modal-project-card {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    }
    
    .modal-project-card .project-image {
        width: 100%;
        height: auto;
        max-height: 250px;
        object-fit: cover;
    }
    
    .modal-project-card .project-content {
        padding: 20px;
    }
    
    .modal-project-card .project-description {
        max-height: none;
        overflow: visible;
        display: block;
    }
    
    body.modal-open {
        overflow: hidden;
    }
    
    /* Mobile specific modal adjustments */
    @media (max-width: 600px) {
        .modal-header {
            padding: 12px;
        }
        .modal-title {
            font-size: 16px;
        }
        .modal-content {
            padding: 10px;
        }
        .modal-project-card .project-content {
            padding: 15px;
        }
        .modal-project-card .project-description {
            font-size: 14px;
            line-height: 1.5;
        }
        .modal-project-card .project-tags {
            flex-wrap: wrap;
        }
        .modal-project-card .project-links {
            flex-direction: column;
        }
        .modal-project-card .project-link {
            text-align: center;
            justify-content: center;
        }
    }
`
document.head.appendChild(style)
