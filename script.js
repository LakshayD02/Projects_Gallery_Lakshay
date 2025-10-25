// Dark/Light Theme toggle
        const toggleSwitch = document.getElementById("theme-toggle")
        const body = document.body

        toggleSwitch.addEventListener("change", () => {
            if (toggleSwitch.checked) {
                body.classList.add("dark-theme")
                body.classList.remove("light-theme")
            } else {
                body.classList.add("light-theme")
                body.classList.remove("dark-theme")
            }
        })

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
                        setTimeout(() => {
                            card.style.display = "flex"
                        }, 10)
                    } else {
                        const cardCategory = card.getAttribute("data-category")
                        if (cardCategory === filterValue) {
                            card.classList.remove("hidden")
                            setTimeout(() => {
                                card.style.display = "flex"
                            }, 10)
                        } else {
                            card.classList.add("hidden")
                            setTimeout(() => {
                                card.style.display = "none"
                            }, 300)
                        }
                    }
                })
            })
        })

        // Initialize filter on page load
        document.addEventListener("DOMContentLoaded", () => {
            // Show all projects initially
            projectCards.forEach((card) => {
                card.style.display = "flex"
            })

            const viewMoreOverlays = document.querySelectorAll(".view-more-overlay")
            const projectModal = document.getElementById("project-modal")
            const modalContent = document.querySelector(".modal-content")
            const modalBackBtn = document.getElementById("modal-back-btn")

            // Close modal function
            function closeModal() {
                projectModal.style.display = "none"
                document.body.style.overflow = "auto"
           
            }

            // Back button click handler
            modalBackBtn.addEventListener("click", closeModal)

            // Close modal when clicking outside content (optional)
            projectModal.addEventListener("click", (e) => {
                if (e.target === projectModal) {
                    closeModal()
                }
            })

            viewMoreOverlays.forEach((overlay) => {
                const viewMoreBtn = overlay.querySelector(".view-more-btn")
                const projectCard = overlay.parentElement

                viewMoreBtn.addEventListener("click", (e) => {
                    e.stopPropagation()

                    // Check if we're on small device
                    if (window.innerWidth <= 600) {
                        // Clone the project card for modal
                        const clonedCard = projectCard.cloneNode(true)
                        clonedCard.classList.add("modal-project-card")
                        clonedCard.classList.remove("project-card")

                        // Remove the view more overlay from cloned card
                        const clonedOverlay = clonedCard.querySelector(".view-more-overlay")
                        if (clonedOverlay) {
                            clonedOverlay.remove()
                        }

                        // Clear modal content and add cloned card
                        modalContent.innerHTML = ""
                        modalContent.appendChild(clonedCard)

                        // Show modal
                        projectModal.style.display = "flex"
                        document.body.style.overflow = "hidden"
                    } else {
                        if (projectCard.classList.contains("expanded")) {
                            projectCard.classList.remove("expanded")
                            viewMoreBtn.textContent = "View More"
                            // Smooth scroll to top of card when collapsing
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
            })

            function handleResize() {
                if (window.innerWidth > 600) {
                    closeModal()
                }
            }

            window.addEventListener("resize", handleResize)
            handleResize() // Call once on load

            // --- Footer: set current year dynamically ---
            const yearEl = document.getElementById('copyright-year')
            if (yearEl) {
                yearEl.textContent = new Date().getFullYear()
            }
        })