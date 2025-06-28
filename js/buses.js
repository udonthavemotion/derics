/**
 * Buses Page JavaScript
 * Handles bus filtering, display, and modal functionality
 */

let allBuses = [];
let filteredBuses = [];

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚌 Buses page loaded - initializing...');
    
    // Load buses data and display
    loadBusesData();
    
    // Initialize filters
    initializeFilters();
    
    // Initialize modal
    initializeModal();
    
    // Display buses after short delay for better UX
    setTimeout(() => {
        displayBuses(allBuses);
    }, 500);
});

/**
 * Load buses data from the featured bus script
 */
function loadBusesData() {
    // Wait for featured-bus.js to load
    if (window.FeaturedBus && window.FeaturedBus.getAllBuses) {
        allBuses = window.FeaturedBus.getAllBuses();
        
        // Add some additional bus data to make it 10 buses
        const additionalBuses = [
            {
                id: 'premium-express',
                name: 'Premium Express',
                image: 'images/Busses Stock/brian-jones-YUIYKnw_sAw-unsplash.jpg',
                capacity: 18,
                rate: 140,
                amenities: [
                    'Premium Seating',
                    'Sound System',
                    'LED Lighting',
                    'Climate Control',
                    'Mini Bar',
                    'Entertainment System'
                ]
            },
            {
                id: 'party-liner',
                name: 'Party Liner',
                image: 'images/Busses Stock/howard-senton-rL0LBKFWnh8-unsplash.jpg',
                capacity: 28,
                rate: 165,
                amenities: [
                    'Large Capacity',
                    'Dance Floor',
                    'Party Lights',
                    'Premium Sound',
                    'Bar Area',
                    'Comfortable Seating'
                ]
            },
            {
                id: 'executive-coach',
                name: 'Executive Coach',
                image: 'images/Busses Stock/ishrak-sami-NPFvKujrONA-unsplash.jpg',
                capacity: 16,
                rate: 185,
                amenities: [
                    'Executive Seating',
                    'Premium Bar',
                    'Privacy Features',
                    'High-End Sound',
                    'Ambient Lighting',
                    'Luxury Amenities'
                ]
            },
            {
                id: 'festival-cruiser',
                name: 'Festival Cruiser',
                image: 'images/Busses Stock/pexels-followingnyc-12311043.jpg',
                capacity: 26,
                rate: 145,
                amenities: [
                    'Festival Setup',
                    'Outdoor Sound',
                    'Colorful Lighting',
                    'Group Seating',
                    'Party Features',
                    'Entertainment Center'
                ]
            },
            {
                id: 'luxury-express',
                name: 'Luxury Express',
                image: 'images/Busses Stock/vy-tran-o3lP7R0YzUQ-unsplash.jpg',
                capacity: 24,
                rate: 195,
                amenities: [
                    'Luxury Interior',
                    'Premium Bar',
                    'High-End Sound',
                    'LED Lighting',
                    'VIP Features',
                    'Climate Control'
                ]
            }
        ];
        
        allBuses = [...allBuses, ...additionalBuses];
        filteredBuses = [...allBuses];
        
        console.log('📊 Loaded', allBuses.length, 'buses total');
    } else {
        // Fallback if featured-bus.js hasn't loaded yet
        setTimeout(loadBusesData, 100);
    }
}

/**
 * Display buses in the grid
 */
function displayBuses(buses) {
    const container = document.getElementById('buses-container');
    const noResults = document.getElementById('no-results');
    
    if (!container) return;
    
    // Clear loading placeholder
    container.innerHTML = '';
    
    if (buses.length === 0) {
        // Show no results message
        noResults.style.display = 'block';
        return;
    } else {
        noResults.style.display = 'none';
    }
    
    // Create bus cards
    buses.forEach((bus, index) => {
        const busCard = createBusCard(bus, index);
        container.appendChild(busCard);
    });
    
    console.log('🎯 Displayed', buses.length, 'buses');
}

/**
 * Create a bus card element
 */
function createBusCard(bus, index) {
    const card = document.createElement('div');
    card.className = 'bus-card';
    card.setAttribute('data-bus-id', bus.id);
    
    // Determine badge text
    let badgeText = '';
    if (bus.rate <= 150) badgeText = 'Great Value';
    else if (bus.capacity >= 25) badgeText = 'Large Capacity';
    else if (bus.rate >= 180) badgeText = 'Premium';
    else if (index === 0) badgeText = 'Most Popular';
    
    // Get first 3 amenities for preview
    const previewAmenities = bus.amenities.slice(0, 3);
    
    card.innerHTML = `
        <div class="bus-card-image">
            <img src="${bus.image}" alt="${bus.name}" onerror="this.src='images/Busses Stock/brian-jones-YUIYKnw_sAw-unsplash.jpg'">
            ${badgeText ? `<div class="bus-badge">${badgeText}</div>` : ''}
        </div>
        
        <div class="bus-card-content">
            <div class="bus-card-header">
                <h3 class="bus-card-title">${bus.name}</h3>
                <div class="bus-card-price">
                    <span class="price-amount">$${bus.rate}</span>
                    <span class="price-period">per hour</span>
                </div>
            </div>
            
            <div class="bus-specs">
                <div class="spec-item">
                    <i class="fas fa-users"></i>
                    <span>${bus.capacity} passengers</span>
                </div>
                <div class="spec-item">
                    <i class="fas fa-clock"></i>
                    <span>3 hour minimum</span>
                </div>
                <div class="spec-item">
                    <i class="fas fa-star"></i>
                    <span>4.9 rating</span>
                </div>
            </div>
            
            <div class="bus-amenities">
                <h4>Top Features:</h4>
                <div class="amenities-preview">
                    ${previewAmenities.map(amenity => 
                        `<span class="amenity-tag">${amenity}</span>`
                    ).join('')}
                    ${bus.amenities.length > 3 ? `<span class="amenity-tag">+${bus.amenities.length - 3} more</span>` : ''}
                </div>
            </div>
            
            <div class="bus-actions">
                <button class="btn btn-details" onclick="showBusDetails('${bus.id}')">
                    <i class="fas fa-info-circle"></i> View Details
                </button>
                <a href="booking.html?bus=${bus.id}" class="btn btn-primary">
                    <i class="fas fa-calendar-alt"></i> Book Now
                </a>
            </div>
        </div>
    `;
    
    return card;
}

/**
 * Initialize filter functionality
 */
function initializeFilters() {
    const capacityFilter = document.getElementById('capacity-filter');
    const priceFilter = document.getElementById('price-filter');
    const amenityFilter = document.getElementById('amenity-filter');
    const resetButton = document.getElementById('reset-filters');
    const clearFiltersLink = document.getElementById('clear-filters');
    
    // Add event listeners
    if (capacityFilter) {
        capacityFilter.addEventListener('change', applyFilters);
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', applyFilters);
    }
    
    if (amenityFilter) {
        amenityFilter.addEventListener('change', applyFilters);
    }
    
    if (resetButton) {
        resetButton.addEventListener('click', resetFilters);
    }
    
    if (clearFiltersLink) {
        clearFiltersLink.addEventListener('click', function(e) {
            e.preventDefault();
            resetFilters();
        });
    }
    
    console.log('🔍 Filters initialized');
}

/**
 * Apply filters to the bus list
 */
function applyFilters() {
    const capacityFilter = document.getElementById('capacity-filter').value;
    const priceFilter = document.getElementById('price-filter').value;
    const amenityFilter = document.getElementById('amenity-filter').value;
    
    filteredBuses = allBuses.filter(bus => {
        // Capacity filter
        if (capacityFilter !== 'all') {
            if (capacityFilter === 'small' && bus.capacity > 20) return false;
            if (capacityFilter === 'medium' && (bus.capacity <= 20 || bus.capacity > 30)) return false;
            if (capacityFilter === 'large' && bus.capacity <= 30) return false;
        }
        
        // Price filter
        if (priceFilter !== 'all') {
            if (priceFilter === 'budget' && bus.rate >= 150) return false;
            if (priceFilter === 'mid' && (bus.rate < 150 || bus.rate > 175)) return false;
            if (priceFilter === 'premium' && bus.rate <= 175) return false;
        }
        
        // Amenity filter
        if (amenityFilter !== 'all') {
            const amenityKeywords = {
                'dance': ['Dance Floor', 'Dance Area'],
                'vip': ['VIP Seating', 'VIP Features'],
                'bar': ['Premium Bar', 'Bar Area', 'Mini Bar'],
                'karaoke': ['Karaoke System']
            };
            
            const keywords = amenityKeywords[amenityFilter] || [];
            const hasAmenity = keywords.some(keyword => 
                bus.amenities.some(amenity => amenity.includes(keyword))
            );
            
            if (!hasAmenity) return false;
        }
        
        return true;
    });
    
    // Display filtered results
    displayBuses(filteredBuses);
    
    console.log('🔍 Filters applied:', {
        capacity: capacityFilter,
        price: priceFilter,
        amenity: amenityFilter,
        results: filteredBuses.length
    });
}

/**
 * Reset all filters
 */
function resetFilters() {
    document.getElementById('capacity-filter').value = 'all';
    document.getElementById('price-filter').value = 'all';
    document.getElementById('amenity-filter').value = 'all';
    
    filteredBuses = [...allBuses];
    displayBuses(filteredBuses);
    
    console.log('🔄 Filters reset');
}

/**
 * Show bus details in modal
 */
function showBusDetails(busId) {
    const bus = allBuses.find(b => b.id === busId);
    if (!bus) return;
    
    const modal = document.getElementById('bus-details-modal');
    const modalBusName = document.getElementById('modal-bus-name');
    const modalBusImage = document.getElementById('modal-bus-image');
    const modalCapacity = document.getElementById('modal-capacity');
    const modalRate = document.getElementById('modal-rate');
    const modalAmenities = document.getElementById('modal-amenities');
    const modalBookBtn = document.getElementById('modal-book-btn');
    
    // Populate modal content
    if (modalBusName) modalBusName.textContent = bus.name;
    if (modalBusImage) {
        modalBusImage.src = bus.image;
        modalBusImage.alt = bus.name;
        modalBusImage.onerror = function() {
            this.src = 'images/Busses Stock/brian-jones-YUIYKnw_sAw-unsplash.jpg';
        };
    }
    if (modalCapacity) modalCapacity.textContent = `${bus.capacity} passengers`;
    if (modalRate) modalRate.textContent = `$${bus.rate}/hour`;
    
    // Populate amenities with icons
    if (modalAmenities) {
        modalAmenities.innerHTML = bus.amenities.map(amenity => {
            const iconClass = getAmenityIcon(amenity);
            return `<li><i class="fas fa-${iconClass}"></i> ${amenity}</li>`;
        }).join('');
    }
    
    // Update book button
    if (modalBookBtn) {
        modalBookBtn.href = `booking.html?bus=${bus.id}`;
    }
    
    // Show modal
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    console.log('📋 Showing details for:', bus.name);
}

/**
 * Get amenity icon (from featured-bus.js)
 */
function getAmenityIcon(amenity) {
    const iconMap = {
        'Premium Sound System': 'music',
        'LED Lighting': 'lightbulb',
        'Climate Control': 'snowflake',
        'Leather Seating': 'couch',
        'Entertainment System': 'tv',
        'Bar Area': 'wine-glass',
        'Dance Floor': 'music',
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
        'Entertainment Center': 'play-circle',
        'Premium Seating': 'couch',
        'Festival Setup': 'calendar',
        'Outdoor Sound': 'volume-up',
        'Colorful Lighting': 'palette',
        'Party Features': 'star',
        'Luxury Interior': 'gem',
        'VIP Features': 'crown',
        'Executive Seating': 'chair',
        'Privacy Features': 'shield-alt'
    };
    
    return iconMap[amenity] || 'check';
}

/**
 * Initialize modal functionality
 */
function initializeModal() {
    const modal = document.getElementById('bus-details-modal');
    const closeButton = document.getElementById('modal-close');
    
    // Close modal when clicking close button
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    console.log('🔲 Modal initialized');
}

/**
 * Close the modal
 */
function closeModal() {
    const modal = document.getElementById('bus-details-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/**
 * Handle URL parameters (if coming from homepage with specific bus)
 */
function handleUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const busId = urlParams.get('bus');
    
    if (busId) {
        // Wait for buses to load, then show details
        setTimeout(() => {
            showBusDetails(busId);
        }, 1000);
    }
}

// Check for URL parameters
handleUrlParameters();

// Export functions for global access
window.showBusDetails = showBusDetails;
window.closeModal = closeModal;

// Console message
console.log('🚌 Buses page functionality loaded!'); 