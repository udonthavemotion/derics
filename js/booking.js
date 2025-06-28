/**
 * Booking System JavaScript
 * Real-time calculations, form validation, and email integration
 */

// Initialize EmailJS with your public key
(function() {
    emailjs.init("YOUR_EMAILJS_PUBLIC_KEY"); // Replace with actual key
})();

let allBuses = [];
let selectedBus = null;
let currentBooking = {};

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Booking system initializing...');
    
    // Load bus data
    loadBusData();
    
    // Initialize form functionality
    initializeBookingForm();
    
    // Set minimum date to today
    setMinimumDate();
    
    // Initialize real-time calculations
    initializeCalculations();
    
    console.log('✅ Booking system ready!');
});

/**
 * Load bus data from the featured bus script
 */
function loadBusData() {
    // Wait for featured-bus.js to load
    if (window.FeaturedBus && window.FeaturedBus.getAllBuses) {
        allBuses = window.FeaturedBus.getAllBuses();
        
        // Add additional buses if needed (from buses.js)
        const additionalBuses = [
            {
                id: 'premium-express',
                name: 'Premium Express',
                image: 'images/bus-premium-6.jpg',
                capacity: 18,
                rate: 140,
                amenities: ['Premium Seating', 'Sound System', 'LED Lighting', 'Climate Control']
            },
            {
                id: 'party-liner',
                name: 'Party Liner',
                image: 'images/bus-liner-7.jpg',
                capacity: 28,
                rate: 165,
                amenities: ['Large Capacity', 'Dance Floor', 'Party Lights', 'Premium Sound']
            },
            {
                id: 'executive-coach',
                name: 'Executive Coach',
                image: 'images/bus-executive-8.jpg',
                capacity: 16,
                rate: 185,
                amenities: ['Executive Seating', 'Premium Bar', 'Privacy Features', 'High-End Sound']
            }
        ];
        
        allBuses = [...allBuses, ...additionalBuses];
        
        // Populate bus selection dropdown
        populateBusSelection();
        
        console.log('📊 Loaded', allBuses.length, 'buses for booking');
    } else {
        // Retry if featured-bus.js hasn't loaded yet
        setTimeout(loadBusData, 100);
    }
}

/**
 * Populate the bus selection dropdown
 */
function populateBusSelection() {
    const busSelect = document.getElementById('bus-selection');
    if (!busSelect) return;
    
    // Clear existing options (keep the first placeholder)
    busSelect.innerHTML = '<option value="">Select a bus...</option>';
    
    allBuses.forEach(bus => {
        const option = document.createElement('option');
        option.value = bus.id;
        option.textContent = `${bus.name} (${bus.capacity} passengers - $${bus.rate}/hr)`;
        option.dataset.capacity = bus.capacity;
        option.dataset.rate = bus.rate;
        busSelect.appendChild(option);
    });
}

/**
 * Filter buses based on passenger count
 */
function filterBusesByCapacity(passengerCount) {
    const busSelect = document.getElementById('bus-selection');
    if (!busSelect || !passengerCount) return;
    
    // Clear and repopulate with filtered buses
    busSelect.innerHTML = '<option value="">Select a bus...</option>';
    
    const suitableBuses = allBuses.filter(bus => bus.capacity >= passengerCount);
    
    if (suitableBuses.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'No buses available for this group size';
        option.disabled = true;
        busSelect.appendChild(option);
        return;
    }
    
    // Sort by capacity (smallest suitable first)
    suitableBuses.sort((a, b) => a.capacity - b.capacity);
    
    suitableBuses.forEach(bus => {
        const option = document.createElement('option');
        option.value = bus.id;
        option.textContent = `${bus.name} (${bus.capacity} passengers - $${bus.rate}/hr)`;
        option.dataset.capacity = bus.capacity;
        option.dataset.rate = bus.rate;
        busSelect.appendChild(option);
    });
    
    console.log(`🔍 Filtered to ${suitableBuses.length} buses for ${passengerCount} passengers`);
}

/**
 * Initialize booking form functionality
 */
function initializeBookingForm() {
    const form = document.getElementById('booking-form');
    const passengerInput = document.getElementById('passengers');
    const busSelect = document.getElementById('bus-selection');
    
    // Passenger count change - filter buses
    if (passengerInput) {
        passengerInput.addEventListener('input', function() {
            const count = parseInt(this.value);
            if (count > 0) {
                filterBusesByCapacity(count);
                updateSummary();
            }
        });
    }
    
    // Bus selection change - show preview
    if (busSelect) {
        busSelect.addEventListener('change', function() {
            const busId = this.value;
            if (busId) {
                showBusPreview(busId);
                updateSummary();
            } else {
                hideBusPreview();
            }
        });
    }
    
    // Form submission
    if (form) {
        form.addEventListener('submit', handleFormSubmission);
    }
    
    // Add real-time validation to all inputs
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', updateSummary);
    });
    
    // Check for pre-selected bus from URL
    checkUrlParameters();
}

/**
 * Set minimum date to today
 */
function setMinimumDate() {
    const dateInput = document.getElementById('event-date');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        
        const minDate = tomorrow.toISOString().split('T')[0];
        dateInput.min = minDate;
        
        console.log('📅 Minimum booking date set to:', minDate);
    }
}

/**
 * Initialize real-time calculations
 */
function initializeCalculations() {
    // Update calculations when any form field changes
    const form = document.getElementById('booking-form');
    if (form) {
        form.addEventListener('input', debounce(updateSummary, 300));
        form.addEventListener('change', updateSummary);
    }
}

/**
 * Show bus preview when selected
 */
function showBusPreview(busId) {
    const bus = allBuses.find(b => b.id === busId);
    if (!bus) return;
    
    selectedBus = bus;
    
    const preview = document.getElementById('selected-bus-preview');
    const previewImage = document.getElementById('preview-bus-image');
    const previewName = document.getElementById('preview-bus-name');
    const previewCapacity = document.getElementById('preview-capacity');
    const previewRate = document.getElementById('preview-rate');
    
    if (preview) {
        preview.style.display = 'grid';
        
        if (previewImage) {
            previewImage.src = bus.image;
            previewImage.alt = bus.name;
            previewImage.onerror = function() {
                this.src = 'images/placeholder-bus.jpg';
            };
        }
        
        if (previewName) previewName.textContent = bus.name;
        if (previewCapacity) previewCapacity.textContent = `Capacity: ${bus.capacity} passengers`;
        if (previewRate) previewRate.textContent = `Rate: $${bus.rate}/hour`;
    }
    
    console.log('🚌 Selected bus:', bus.name);
}

/**
 * Hide bus preview
 */
function hideBusPreview() {
    const preview = document.getElementById('selected-bus-preview');
    if (preview) {
        preview.style.display = 'none';
    }
    selectedBus = null;
}

/**
 * Update booking summary in real-time
 */
function updateSummary() {
    const formData = getFormData();
    
    // Update summary fields
    updateSummaryField('summary-date', formData.eventDate || '-');
    updateSummaryField('summary-duration', formData.duration ? `${formData.duration} hours` : '-');
    updateSummaryField('summary-passengers', formData.passengers || '-');
    updateSummaryField('summary-bus', selectedBus ? selectedBus.name : '-');
    
    // Calculate and update total
    const total = calculateTotal(formData);
    updateSummaryField('summary-total', total > 0 ? `$${total}` : '$0');
    
    console.log('💰 Updated total:', total);
}

/**
 * Update individual summary field
 */
function updateSummaryField(fieldId, value) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.textContent = value;
    }
}

/**
 * Calculate total cost
 */
function calculateTotal(formData) {
    if (!selectedBus || !formData.duration) {
        return 0;
    }
    
    const hours = parseInt(formData.duration);
    const hourlyRate = selectedBus.rate;
    const subtotal = hours * hourlyRate;
    
    // Apply any discounts or fees here
    let total = subtotal;
    
    // Weekend surcharge (Friday-Sunday)
    if (formData.eventDate) {
        const eventDate = new Date(formData.eventDate);
        const dayOfWeek = eventDate.getDay();
        if (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) { // Fri, Sat, Sun
            total *= 1.1; // 10% weekend surcharge
        }
    }
    
    return Math.round(total);
}

/**
 * Get all form data
 */
function getFormData() {
    const form = document.getElementById('booking-form');
    if (!form) return {};
    
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    return data;
}

/**
 * Validate individual form field
 */
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error
    removeFieldError(field);
    
    // Required field validation
    if (field.required && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Specific field validations
    switch (field.type) {
        case 'email':
            if (value && !isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
            
        case 'tel':
            if (value && !isValidPhone(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
            break;
            
        case 'date':
            if (value) {
                const selectedDate = new Date(value);
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                
                if (selectedDate < tomorrow) {
                    isValid = false;
                    errorMessage = 'Event date must be at least 24 hours in advance';
                }
            }
            break;
            
        case 'number':
            if (field.id === 'passengers') {
                const count = parseInt(value);
                if (count > 30) {
                    isValid = false;
                    errorMessage = 'Maximum 30 passengers per bus';
                } else if (count < 1) {
                    isValid = false;
                    errorMessage = 'At least 1 passenger required';
                }
            }
            break;
    }
    
    // Show error if validation failed
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        showFieldSuccess(field);
    }
    
    return isValid;
}

/**
 * Show field error
 */
function showFieldError(field, message) {
    field.style.borderColor = 'var(--warning-color)';
    
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
}

/**
 * Show field success
 */
function showFieldSuccess(field) {
    field.style.borderColor = 'var(--success-color)';
}

/**
 * Remove field error
 */
function removeFieldError(field) {
    field.style.borderColor = '';
    
    const existingError = field.parentNode.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }
}

/**
 * Handle form submission
 */
async function handleFormSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = document.getElementById('submit-booking');
    
    // Validate entire form
    const isValid = validateEntireForm();
    if (!isValid) {
        showAlert('Please fix the errors in the form before submitting.', 'error');
        return;
    }
    
    // Show loading state
    submitButton.classList.add('btn-loading');
    submitButton.disabled = true;
    
    try {
        // Prepare booking data
        const bookingData = prepareBookingData();
        
        // Send email via EmailJS
        await sendBookingEmail(bookingData);
        
        // Show success message
        showBookingConfirmation(bookingData);
        
        // Reset form
        form.reset();
        hideBusPreview();
        updateSummary();
        
        console.log('✅ Booking request sent successfully');
        
    } catch (error) {
        console.error('❌ Booking submission failed:', error);
        showAlert('Sorry, there was an error sending your booking request. Please try again or call us directly.', 'error');
    } finally {
        // Remove loading state
        submitButton.classList.remove('btn-loading');
        submitButton.disabled = false;
    }
}

/**
 * Validate entire form
 */
function validateEntireForm() {
    const form = document.getElementById('booking-form');
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        const fieldValid = validateField({ target: input });
        if (!fieldValid) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Prepare booking data for email
 */
function prepareBookingData() {
    const formData = getFormData();
    const total = calculateTotal(formData);
    
    // Generate reference number
    const referenceNumber = generateReferenceNumber();
    
    const bookingData = {
        // Event details
        eventDate: formData.eventDate,
        eventTime: formData.eventTime,
        duration: formData.duration,
        passengers: formData.passengers,
        eventType: formData.eventType || 'Not specified',
        
        // Bus details
        busName: selectedBus ? selectedBus.name : 'Not selected',
        busCapacity: selectedBus ? selectedBus.capacity : 0,
        busRate: selectedBus ? selectedBus.rate : 0,
        
        // Location
        pickupLocation: formData.pickupLocation,
        dropoffLocation: formData.dropoffLocation || 'Round trip',
        
        // Customer info
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        
        // Additional
        specialRequests: formData.specialRequests || 'None',
        totalCost: total,
        referenceNumber: referenceNumber,
        submissionDate: new Date().toLocaleString()
    };
    
    return bookingData;
}

/**
 * Generate unique reference number
 */
function generateReferenceNumber() {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    return `${year}${month}${day}${random}`;
}

/**
 * Send booking email via EmailJS
 */
async function sendBookingEmail(bookingData) {
    // Email to business owner
    const businessEmailTemplate = {
        service_id: 'YOUR_SERVICE_ID', // Replace with actual service ID
        template_id: 'booking_notification', // Replace with actual template ID
        user_id: 'YOUR_PUBLIC_KEY', // Replace with actual public key
        template_params: {
            to_email: 'info@derikspartybuses.com',
            subject: `New Booking Request - ${bookingData.referenceNumber}`,
            customer_name: bookingData.customerName,
            customer_email: bookingData.customerEmail,
            customer_phone: bookingData.customerPhone,
            event_date: bookingData.eventDate,
            event_time: bookingData.eventTime,
            duration: bookingData.duration,
            passengers: bookingData.passengers,
            bus_name: bookingData.busName,
            pickup_location: bookingData.pickupLocation,
            dropoff_location: bookingData.dropoffLocation,
            total_cost: bookingData.totalCost,
            special_requests: bookingData.specialRequests,
            reference_number: bookingData.referenceNumber
        }
    };
    
    // Email to customer (confirmation)
    const customerEmailTemplate = {
        service_id: 'YOUR_SERVICE_ID',
        template_id: 'customer_confirmation',
        user_id: 'YOUR_PUBLIC_KEY',
        template_params: {
            to_email: bookingData.customerEmail,
            customer_name: bookingData.customerName,
            event_date: bookingData.eventDate,
            bus_name: bookingData.busName,
            total_cost: bookingData.totalCost,
            reference_number: bookingData.referenceNumber
        }
    };
    
    // For demo purposes, we'll simulate email sending
    // In real implementation, replace with actual EmailJS calls:
    // await emailjs.send(businessEmailTemplate.service_id, businessEmailTemplate.template_id, businessEmailTemplate.template_params);
    // await emailjs.send(customerEmailTemplate.service_id, customerEmailTemplate.template_id, customerEmailTemplate.template_params);
    
    console.log('📧 Would send emails:', { businessEmailTemplate, customerEmailTemplate });
    
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000));
}

/**
 * Show booking confirmation
 */
function showBookingConfirmation(bookingData) {
    showAlert(
        `Booking request sent successfully! Reference: #PB-${bookingData.referenceNumber}. We'll contact you within 2 hours to confirm availability.`,
        'success'
    );
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Check URL parameters for pre-selected bus
 */
function checkUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const busId = urlParams.get('bus');
    
    if (busId) {
        // Wait for buses to load, then select the specified bus
        setTimeout(() => {
            const busSelect = document.getElementById('bus-selection');
            if (busSelect && busSelect.querySelector(`option[value="${busId}"]`)) {
                busSelect.value = busId;
                showBusPreview(busId);
                updateSummary();
                
                console.log('🔗 Pre-selected bus from URL:', busId);
            }
        }, 500);
    }
}

/**
 * Utility functions
 */

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
    return phoneRegex.test(phone);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showAlert(message, type = 'info') {
    // Use the existing alert system from main.js
    if (window.PartyBusUtils && window.PartyBusUtils.showAlert) {
        window.PartyBusUtils.showAlert(message, type);
    } else {
        // Fallback alert
        alert(message);
    }
}

// Export functions for global access
window.BookingSystem = {
    calculateTotal,
    validateField,
    updateSummary,
    showBusPreview
};

console.log('📋 Booking system JavaScript loaded successfully!'); 