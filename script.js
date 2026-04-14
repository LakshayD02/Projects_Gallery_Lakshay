:root {
    --primary: #2563eb;
    --primary-dark: #1d4ed8;
    --secondary: #3b82f6;
    --bg: #eef2f7;
    --card-bg: #ffffff;
    --header-bg: #f8fbff;
    --text: #1f2937;
    --text-light: #6b7280;
    --shadow: rgba(15, 23, 42, 0.12);
    --border-radius: 14px;
    --spacing-sm: 0.75rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
}

* {
    box-sizing: border-box;
}

html,
body {
    margin: 0;
    padding: 0;
}

body {
    background: var(--bg);
    color: var(--text);
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
}

header {
    background: var(--header-bg);
    padding: 1.25rem 1rem;
    text-align: center;
}

h1 {
    margin: 0;
}

.subheading {
    margin: 0.4rem 0 0;
    color: var(--text-light);
}

.filter-container {
    padding: 0 1rem;
    margin: 1rem 0;
}

.filter-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
}

.filter-btn {
    border: 0;
    border-radius: 999px;
    padding: 0.5rem 0.9rem;
    cursor: pointer;
    background: #dbeafe;
    color: #1e3a8a;
    font-weight: 600;
}

.filter-btn.active {
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    color: #fff;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-md);
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--spacing-lg);
}

.project-card {
    background: var(--card-bg);
    border-radius: var(--border-radius);
    overflow: hidden;
    position: relative;
    box-shadow: 0 8px 20px var(--shadow);
    display: flex;
    flex-direction: column;
    min-height: 100%;
    transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.25s ease;
}

.project-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px var(--shadow);
}

.project-card.hidden {
    opacity: 0;
    transform: scale(0.96);
    pointer-events: none;
}

.project-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-bottom: 3px solid;
    border-image: linear-gradient(90deg, var(--primary), var(--secondary)) 1;
}

.project-content {
    padding: var(--spacing-md);
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    flex: 1;
}

.project-title {
    margin: 0;
    font-size: 1.2rem;
    line-height: 1.35;
}

.project-description {
    margin: 0;
    color: var(--text-light);
    flex: 1;
}

.project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.tag {
    background: #eff6ff;
    color: #1e3a8a;
    border: 1px solid #dbeafe;
    border-radius: 999px;
    padding: 0.2rem 0.6rem;
    font-size: 0.75rem;
    font-weight: 600;
}

.project-links {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
}

.project-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    border-radius: 999px;
    padding: 0.5rem 0.85rem;
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: 600;
}

.github-link {
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    color: #fff;
}

.demo-link {
    background: #fff;
    color: var(--primary);
    border: 1.5px solid var(--primary);
}

.view-more-overlay {
    display: none;
}

.project-modal {
    position: fixed;
    inset: 0;
    display: none;
    background: rgba(15, 23, 42, 0.55);
    z-index: 1000;
    overflow-y: auto;
}

.modal-header {
    position: sticky;
    top: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: #fff;
    border-bottom: 1px solid #e5e7eb;
    padding: 0.85rem 1rem;
}

.modal-back-btn {
    border: 0;
    border-radius: 8px;
    padding: 0.35rem 0.5rem;
    background: #eff6ff;
    color: #1e3a8a;
    cursor: pointer;
}

.modal-title {
    margin: 0;
    font-size: 1rem;
}

.modal-content {
    padding: 1rem;
}

.modal-project-card {
    background: var(--card-bg);
    border-radius: var(--border-radius);
    overflow: hidden;
}

.footer {
    margin-top: 2rem;
    background: var(--header-bg);
    color: var(--text-light);
    padding: 0.9rem 1rem;
    text-align: center;
}

@media (max-width: 1024px) {
    .projects-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 600px) {
    .projects-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-sm);
    }

    .filter-container {
        overflow-x: auto;
    }

    .filter-buttons {
        flex-wrap: nowrap;
        justify-content: flex-start;
        width: max-content;
        min-width: 100%;
    }

    .filter-btn {
        white-space: nowrap;
        flex-shrink: 0;
    }

    .project-card {
        max-height: 280px;
    }

    .view-more-overlay {
        position: absolute;
        inset: auto 0 0;
        height: 80px;
        background: linear-gradient(to top, var(--card-bg) 0%, var(--card-bg) 40%, rgba(255, 255, 255, 0) 100%);
        display: flex;
        align-items: flex-end;
        justify-content: center;
        padding-bottom: 15px;
        z-index: 10;
    }

    .view-more-btn {
        background: linear-gradient(135deg, var(--primary), var(--primary-dark));
        color: #fff;
        border: none;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        cursor: pointer;
    }

    .project-image {
        height: 160px;
    }
}
