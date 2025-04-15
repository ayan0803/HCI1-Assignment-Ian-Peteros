
const projects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "A fully responsive e-commerce solution with integrated payment gateways and inventory management.",
        image: "https://framerusercontent.com/images/BtSOiu1CJrIjCK2LCNTsFwBj0wg.jpeg",
        category: "web",
        tags: ["React", "Node.js", "MongoDB"]
    },
    // ... your existing project data
];

// DOM Elements
const projectsGrid = document.querySelector('.projects-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const themeToggle = document.querySelector('.theme-toggle');
const backToTop = document.querySelector('.back-to-top');
const header = document.querySelector('header');

// State management
let activeCategory = 'all';
let isSearchOpen = false;
let selectedProject = null;

// Initialize projects
function generateProjects(category = 'all', searchTerm = '') {
    projectsGrid.innerHTML = '';
    
    let filteredProjects = category === 'all' 
        ? projects 
        : projects.filter(project => project.category === category);
    
    // Add search functionality
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredProjects = filteredProjects.filter(project => 
            project.title.toLowerCase().includes(term) || 
            project.description.toLowerCase().includes(term) || 
            project.tags.some(tag => tag.toLowerCase().includes(term))
        );
    }
    
    if (filteredProjects.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results fade-in';
        noResults.innerHTML = `
            <h3>No projects found</h3>
            <p>Try adjusting your search or filter criteria</p>
        `;
        noResults.style.textAlign = 'center';
        noResults.style.gridColumn = '1 / -1';
        noResults.style.padding = '40px 0';
        projectsGrid.appendChild(noResults);
        return;
    }
    
    filteredProjects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.dataset.category = project.category;
        projectCard.style.animationDelay = `${index * 0.1}s`;
        
        projectCard.innerHTML = `
            <div class="project-img">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        
        // Add click event to open project details
        projectCard.addEventListener('click', () => openProjectDetails(project));
        
        // Add to DOM
        projectsGrid.appendChild(projectCard);
        
        // Trigger animation after a small delay
        setTimeout(() => {
            projectCard.classList.add('fade-in');
        }, 50);
    });
}

// Filter functionality
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter projects
        activeCategory = button.getAttribute('data-filter');
        generateProjects(activeCategory, document.querySelector('.search-input')?.value || '');
        
        // Add animation to the button
        button.classList.add('btn-clicked');
        setTimeout(() => {
            button.classList.remove('btn-clicked');
        }, 300);
    });
});

// Theme toggle functionality with enhanced animation
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Update button text with animation
    themeToggle.classList.add('theme-toggle-active');
    setTimeout(() => {
        themeToggle.textContent = document.body.classList.contains('dark-mode') 
            ? 'Toggle Light Mode' 
            : 'Toggle Dark Mode';
        themeToggle.classList.remove('theme-toggle-active');
    }, 150);
});

// Back to top button with smooth animation
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Add sticky header effect
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Enhanced 3D tilt effect for project cards
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = ((x - centerX) / centerX) * 10;
            const rotateX = ((centerY - y) / centerY) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            card.style.transition = 'transform 0.1s ease';
            
            // Enhance image zoom on hover
            const img = card.querySelector('.project-img img');
            if (img) {
                img.style.transform = 'scale(1.1)';
                img.style.transition = 'transform 0.5s ease';
            }
        } else {
            card.style.transform = '';
            
            // Reset image zoom
            const img = card.querySelector('.project-img img');
            if (img) {
                img.style.transform = '';
            }
        }
    });
});

// Reset card transform when mouse leaves document
document.addEventListener('mouseleave', () => {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.style.transform = '';
        
        // Reset image zoom
        const img = card.querySelector('.project-img img');
        if (img) {
            img.style.transform = '';
        }
    });
});

// Add search functionality
function createSearchBar() {
    const headerContent = document.querySelector('.header-content');
    
    // Create search icon
    const searchIcon = document.createElement('div');
    searchIcon.className = 'search-icon';
    searchIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
    `;
    searchIcon.style.cursor = 'pointer';
    searchIcon.style.marginLeft = '15px';
    
    // Add search icon to header
    const nav = document.querySelector('nav');
    nav.parentNode.insertBefore(searchIcon, nav.nextSibling);
    
    // Create search container
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.style.maxHeight = '0';
    searchContainer.style.overflow = 'hidden';
    searchContainer.style.transition = 'max-height 0.3s ease';
    searchContainer.style.width = '100%';
    searchContainer.style.marginTop = '15px';
    
    // Create search input
    searchContainer.innerHTML = `
        <input type="text" class="search-input" placeholder="Search projects...">
    `;
    
    // Add search container to header
    const container = document.querySelector('header .container');
    container.appendChild(searchContainer);
    
    // Toggle search bar
    searchIcon.addEventListener('click', () => {
        isSearchOpen = !isSearchOpen;
        searchContainer.style.maxHeight = isSearchOpen ? '50px' : '0';
        
        if (isSearchOpen) {
            setTimeout(() => {
                document.querySelector('.search-input').focus();
            }, 300);
        }
    });
    
    // Handle search input
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.trim();
        generateProjects(activeCategory, searchTerm);
    });
    
    // Style search input
    searchInput.style.width = '100%';
    searchInput.style.padding = '10px 15px';
    searchInput.style.borderRadius = '20px';
    searchInput.style.border = '1px solid rgba(255, 255, 255, 0.3)';
    searchInput.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    searchInput.style.color = 'white';
    searchInput.style.outline = 'none';
}

// Project details modal
function openProjectDetails(project) {
    selectedProject = project;
    
    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.3s ease';
    
    // Create modal content
    modal.innerHTML = `
        <div class="modal-content" style="
            background-color: var(--card-bg);
            color: var(--text-color);
            width: 90%;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            border-radius: 10px;
            position: relative;
            transform: translateY(20px);
            transition: transform 0.3s ease;
        ">
            <button class="close-modal" style="
                position: absolute;
                top: 15px;
                right: 15px;
                background: var(--primary-color);
                color: white;
                border: none;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                z-index: 10;
            ">×</button>
            
            <div class="modal-image" style="
                width: 100%;
                height: 300px;
                overflow: hidden;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
            ">
                <img src="${project.image}" alt="${project.title}" style="
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                ">
            </div>
            
            <div class="modal-body" style="padding: 30px;">
                <h2 style="
                    font-size: 24px;
                    color: var(--primary-color);
                    margin-bottom: 15px;
                ">${project.title}</h2>
                
                <p style="margin-bottom: 20px;">${project.description}</p>
                
                <div class="modal-tags" style="margin-top: 20px;">
                    <h3 style="
                        font-size: 18px;
                        margin-bottom: 10px;
                    ">Technologies Used:</h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        ${project.tags.map(tag => `
                            <span style="
                                background-color: rgba(139, 35, 49, 0.1);
                                color: var(--primary-color);
                                padding: 5px 12px;
                                border-radius: 15px;
                                font-size: 14px;
                            ">${tag}</span>
                        `).join('')}
                    </div>
                </div>
                
                <div style="
                    margin-top: 30px;
                    display: flex;
                    justify-content: flex-end;
                ">
                    <button class="view-demo-btn" style="
                        background-color: var(--primary-color);
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        cursor: pointer;
                        font-family: 'Poppins', sans-serif;
                        font-weight: 500;
                        transition: background-color 0.3s ease;
                    ">View Demo</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Animate modal in
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'translateY(0)';
    }, 10);
    
    // Close modal on button click
    modal.querySelector('.close-modal').addEventListener('click', closeProjectDetails);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProjectDetails();
        }
    });
    
    // Demo button click
    modal.querySelector('.view-demo-btn').addEventListener('click', () => {
        alert(`Demo for ${project.title} would launch here!`);
    });
}

function closeProjectDetails() {
    const modal = document.querySelector('.project-modal');
    if (!modal) return;
    
    // Animate modal out
    modal.style.opacity = '0';
    modal.querySelector('.modal-content').style.transform = 'translateY(20px)';
    
    // Remove modal after animation
    setTimeout(() => {
        document.body.removeChild(modal);
        document.body.style.overflow = ''; // Restore scrolling
        selectedProject = null;
    }, 300);
}

// Add smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Add typing effect to hero heading
function addTypingEffect() {
    const heroHeading = document.querySelector('.hero h2');
    const originalText = heroHeading.textContent;
    heroHeading.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < originalText.length) {
            heroHeading.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            
            // Fade in the paragraph after typing is complete
            const heroParagraph = document.querySelector('.hero p');
            heroParagraph.style.opacity = '0';
            heroParagraph.style.transform = 'translateY(20px)';
            heroParagraph.style.transition = 'opacity 1s ease, transform 1s ease';
            
            setTimeout(() => {
                heroParagraph.style.opacity = '1';
                heroParagraph.style.transform = 'translateY(0)';
            }, 200);
        }
    }, 100);
}

// Add header scroll effect
function addHeaderScrollEffect() {
    header.style.transition = 'padding 0.3s ease, box-shadow 0.3s ease';
}

// Add CSS for new animations
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .theme-toggle-active {
            transform: scale(0.9);
        }
        
        .btn-clicked {
            transform: scale(0.95);
        }
        
        .header-scrolled {
            padding: 10px 0 !important;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1) !important;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .fade-in {
            animation: fadeIn 0.5s ease forwards;
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything
function init() {
    generateProjects();
    createSearchBar();
    addTypingEffect();
    addHeaderScrollEffect();
    addAnimationStyles();
    
    // Add animation classes to filter buttons
    filterButtons.forEach((button, index) => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px)';
        button.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        button.style.transitionDelay = `${index * 0.1}s`;
        
        setTimeout(() => {
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, 100);
    });
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);