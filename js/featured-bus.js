/**
 * Featured Bus Rotation Script
 * Rotates through different buses on the homepage
 */

// Sample bus data - In a real application, this would come from a database
const busData = [
    {
        id: 'luxury-cruiser',
        name: 'The Luxury Cruiser',
        image: 'images/Busses Stock/brian-jones-r_Ihv_Fafr0-unsplash.jpg',
        capacity: 20,
        rate: 150,
        amenities: [
            'Premium Sound System',
            'LED Lighting',
            'Climate Control',
            'Leather Seating',
            'Entertainment System',
            'Bar Area'
        ]
    },
    {
        id: 'party-express',
        name: 'Party Express',
        image: 'images/Busses Stock/samuel-regan-asante-MQUCOxS6R3c-unsplash.jpg',
        capacity: 25,
        rate: 175,
        amenities: [
            'Dance Floor',
            'Disco Lights',
            'Karaoke System',
            'Premium Speakers',
            'Mini Bar',
            'Comfortable Seating'
        ]
    },
    {
        id: 'vip-liner',
        name: 'VIP Liner',
        image: 'images/Busses Stock/vy-tran-o3lP7R0YzUQ-unsplash.jpg',
        capacity: 15,
        rate: 200,
        amenities: [
            'VIP Seating',
            'Premium Bar',
            'Ambient Lighting',
            'High-End Sound',
            'Privacy Partitions',
            'Luxury Amenities'
        ]
    },
    {
        id: 'celebration-coach',
        name: 'Celebration Coach',
        image: 'images/Busses Stock/zoshua-colah-FVa1eiTr7jw-unsplash.jpg',
        capacity: 30,
        rate: 125,
        amenities: [
            'Large Capacity',
            'Party Lights',
            'Sound System',
            'Dance Area',
            'Bar Setup',
            'Group Seating'
        ]
    },
    {
        id: 'night-owl',
        name: 'Night Owl',
        image: 'images/Busses Stock/jahanzeb-ahsan-nfRBxQwPj0s-unsplash.jpg',
        capacity: 22,
        rate: 160,
        amenities: [
            'Neon Lighting',
            'Club Sound System',
            'Premium Seating',
            'Mini Bar',
            'Entertainment Center',
            'Climate Control'
        ]
    }
];

let currentBusIndex = 0;
let featuredBusInterval;

// Initialize featured bus rotation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initFeaturedBusRotation();
});

/**
 * Initialize the featured bus rotation
 */
function initFeaturedBusRotation() {
    // Display the first bus immediately
    displayFeaturedBus(0);
    
    // Start automatic rotation every 8 seconds
    featuredBusInterval = setInterval(() => {
        currentBusIndex = (currentBusIndex + 1) % busData.length;
        displayFeaturedBus(currentBusIndex, true);
    }, 8000);
    
    // Add manual navigation (optional - can be added later)
    addFeaturedBusNavigation();
    
    // Pause rotation on hover
    const featuredSection = document.querySelector('.featured-bus');
    if (featuredSection) {
        featuredSection.addEventListener('mouseenter', pauseRotation);
        featuredSection.addEventListener('mouseleave', resumeRotation);
    }
}

/**
 * Display a specific featured bus
 * @param {number} index - Index of the bus to display
 * @param {boolean} animate - Whether to animate the transition
 */
function displayFeaturedBus(index, animate = false) {
    const bus = busData[index];
    if (!bus) return;
    
    // Get DOM elements
    const busImage = document.getElementById('featured-bus-image');
    const busName = document.getElementById('featured-bus-name');
    const busCapacity = document.getElementById('featured-capacity');
    const busRate = document.getElementById('featured-rate');
    const busAmenities = document.getElementById('featured-amenities');
    const bookButton = document.querySelector('.featured-actions .btn-primary');
    
    // Add transition class if animating
    if (animate) {
        const featuredContent = document.querySelector('.featured-content');
        if (featuredContent) {
            featuredContent.style.opacity = '0.7';
            featuredContent.style.transform = 'translateY(10px)';
        }
    }
    
    // Update content with a slight delay for smooth transition
    setTimeout(() => {
        // Update image with fallback
        if (busImage) {
            busImage.src = bus.image;
            busImage.alt = bus.name;
            
            // Handle image load errors
            busImage.onerror = function() {
                this.src = 'images/Busses Stock/brian-jones-YUIYKnw_sAw-unsplash.jpg';
                this.alt = bus.name + ' (Image loading...)';
            };
        }
        
        // Update text content
        if (busName) busName.textContent = bus.name;
        if (busCapacity) busCapacity.textContent = `${bus.capacity} passengers`;
        if (busRate) busRate.textContent = `$${bus.rate}/hour`;
        
        // Update amenities list
        if (busAmenities) {
            busAmenities.innerHTML = bus.amenities.map(amenity => 
                `<li><i class="fas fa-${getAmenityIcon(amenity)}"></i> ${amenity}</li>`
            ).join('');
        }
        
        // Update booking button link
        if (bookButton) {
            bookButton.href = `booking.html?bus=${bus.id}`;
        }
        
        // Remove transition effects
        if (animate) {
            const featuredContent = document.querySelector('.featured-content');
            if (featuredContent) {
                featuredContent.style.opacity = '1';
                featuredContent.style.transform = 'translateY(0)';
            }
        }
    }, animate ? 200 : 0);
}

/**
 * Get appropriate Font Awesome icon for amenity
 * @param {string} amenity - The amenity name
 * @returns {string} Font Awesome icon class
 */
function getAmenityIcon(amenity) {
    const iconMap = {
        'Premium Sound System': 'music',
        'LED Lighting': 'lightbulb',
        'Climate Control': 'snowflake',
        'Leather Seating': 'couch',
        'Entertainment System': 'tv',
        'Bar Area': 'wine-glass',
        'Dance Floor': 'dancing',
        'Disco Lights': 'star',
        'Karaoke System': 'microphone',
        'Premium Speakers': 'volume-up',
        'Mini Bar': 'glass-martini',
        'Comfortable Seating': 'chair',
        'VIP Seating': 'crown',
        'Premium Bar': 'cocktail',
        'Ambient Lighting': 'moon',
        'High-End Sound': 'headphones',
        'Privacy Partitions': 'shield-alt',
        'Luxury Amenities': 'gem',
        'Large Capacity': 'users',
        'Party Lights': 'magic',
        'Sound System': 'speaker',
        'Dance Area': 'music',
        'Bar Setup': 'wine-bottle',
        'Group Seating': 'users-cog',
        'Neon Lighting': 'bolt',
        'Club Sound System': 'equalizer',
        'Entertainment Center': 'play-circle'
    };
    
    return iconMap[amenity] || 'check';
}

/**
 * Add navigation dots for manual bus selection
 */
function addFeaturedBusNavigation() {
    const featuredSection = document.querySelector('.featured-bus .container');
    if (!featuredSection) return;
    
    // Create navigation container
    const navContainer = document.createElement('div');
    navContainer.className = 'featured-nav';
    navContainer.style.cssText = `
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 2rem;
    `;
    
    // Create navigation dots
    busData.forEach((bus, index) => {
        const dot = document.createElement('button');
        dot.className = `nav-dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('data-bus-index', index);
        dot.innerHTML = `<span class="sr-only">${bus.name}</span>`;
        dot.style.cssText = `
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 2px solid var(--primary-color);
            background: ${index === 0 ? 'var(--primary-color)' : 'transparent'};
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        
        // Add click handler
        dot.addEventListener('click', () => {
            currentBusIndex = index;
            displayFeaturedBus(index, true);
            updateNavDots(index);
            
            // Restart the rotation timer
            clearInterval(featuredBusInterval);
            featuredBusInterval = setInterval(() => {
                currentBusIndex = (currentBusIndex + 1) % busData.length;
                displayFeaturedBus(currentBusIndex, true);
                updateNavDots(currentBusIndex);
            }, 8000);
        });
        
        navContainer.appendChild(dot);
    });
    
    featuredSection.appendChild(navContainer);
}

/**
 * Update navigation dots active state
 * @param {number} activeIndex - Index of the active bus
 */
function updateNavDots(activeIndex) {
    const dots = document.querySelectorAll('.nav-dot');
    dots.forEach((dot, index) => {
        if (index === activeIndex) {
            dot.classList.add('active');
            dot.style.background = 'var(--primary-color)';
        } else {
            dot.classList.remove('active');
            dot.style.background = 'transparent';
        }
    });
}

/**
 * Pause the bus rotation
 */
function pauseRotation() {
    if (featuredBusInterval) {
        clearInterval(featuredBusInterval);
    }
}

/**
 * Resume the bus rotation
 */
function resumeRotation() {
    featuredBusInterval = setInterval(() => {
        currentBusIndex = (currentBusIndex + 1) % busData.length;
        displayFeaturedBus(currentBusIndex, true);
        updateNavDots(currentBusIndex);
    }, 8000);
}

/**
 * Get bus data by ID (useful for other pages)
 * @param {string} busId - The bus ID
 * @returns {object|null} Bus data or null if not found
 */
function getBusById(busId) {
    return busData.find(bus => bus.id === busId) || null;
}

/**
 * Get all bus data (useful for buses page)
 * @returns {array} Array of all bus data
 */
function getAllBuses() {
    return [...busData];
}

// Export functions for use in other scripts
window.FeaturedBus = {
    getBusById,
    getAllBuses,
    busData,
    pauseRotation,
    resumeRotation
};

// Console log for debugging
console.log('🎭 Wheelz Of Fadez - Featured bus rotation initialized with', busData.length, 'buses'); 