# 🎭 **Wheelz Of Fadez - Asset Integration Guide**

## 📁 **Asset Folder Structure**

Based on your new folders, here's how to organize and integrate your Louisiana Mardi Gras assets:

```
DericsBusses/
├── Mardi Gras/           # Louisiana party vibes & decorations
├── Bust a Stock/         # Professional 4K bus photos  
├── Hero Videos/          # Background videos for pages
└── images/              # Processed web-ready assets
```

---

## 🎭 **Mardi Gras Folder Integration**

### **Recommended Usage:**
- **Background overlays** for sections
- **Decorative elements** (masks, beads, feathers)
- **Color inspiration** for gradients and accents
- **Texture backgrounds** for cards and sections

### **File Integration:**
```html
<!-- Example Mardi Gras background integration -->
<section class="overview" style="background-image: url('Mardi Gras/mardi-gras-overlay.jpg');">
    <div class="mardi-gras-overlay"></div>
    <!-- content -->
</section>
```

### **CSS Integration:**
```css
/* Mardi Gras texture backgrounds */
.overview {
    background: 
        linear-gradient(rgba(102, 51, 153, 0.8), rgba(255, 215, 0, 0.8)),
        url('Mardi Gras/beads-texture.jpg') center/cover;
}

.feature-card {
    background-image: url('Mardi Gras/mask-subtle.png');
    background-size: 50px;
    background-position: top right;
    background-repeat: no-repeat;
}
```

---

## 🚌 **Bust a Stock (Bus Photos) Integration**

### **Primary Locations:**
1. **Hero section** background
2. **Featured bus** rotation images
3. **Bus gallery** card images
4. **About section** backgrounds

### **File Naming Convention:**
```
Bust a Stock/
├── hero-bus-main.jpg          # Main hero background
├── luxury-cruiser-01.jpg      # The Luxury Cruiser
├── party-express-01.jpg       # Party Express
├── vip-liner-01.jpg          # VIP Liner
├── celebration-coach-01.jpg   # Celebration Coach
├── night-owl-01.jpg          # Night Owl
└── [additional-buses]/
```

### **JavaScript Integration:**
Update `js/featured-bus.js`:
```javascript
const busData = [
    {
        id: 'luxury-cruiser',
        name: 'The Luxury Cruiser',
        image: 'Bust a Stock/luxury-cruiser-01.jpg', // Your 4K bus photo
        capacity: 20,
        rate: 150,
        amenities: [...]
    },
    // ... update all bus entries
];
```

### **CSS Hero Background:**
```css
.hero-background {
    background: url('Bust a Stock/hero-bus-main.jpg') center/cover no-repeat;
}
```

---

## 🎬 **Hero Videos Integration**

### **Current Implementation:**
Videos are already set up in the HTML! Just add your files:

```html
<!-- Already implemented in index.html -->
<video class="hero-video" autoplay muted loop playsinline>
    <source src="Hero Videos/hero-main.mp4" type="video/mp4">
    <source src="Hero Videos/hero-main.webm" type="video/webm">
</video>
```

### **Recommended Video Specs:**
- **Duration:** 10-30 seconds (loops seamlessly)
- **Resolution:** 1920x1080 (Full HD)
- **Format:** MP4 (H.264) + WebM for compatibility
- **File Size:** Under 10MB for fast loading
- **Content:** Party bus in action, Louisiana scenery, Mardi Gras celebrations

### **Add Videos to Other Pages:**
```html
<!-- For buses.html header -->
<section class="page-header">
    <div class="header-video-container">
        <video autoplay muted loop playsinline>
            <source src="Hero Videos/buses-page-video.mp4" type="video/mp4">
        </video>
        <div class="video-overlay"></div>
    </div>
    <!-- content -->
</section>
```

---

## 🎨 **Louisiana Theme Integration**

### **Color Palette from Mardi Gras Assets:**
```css
:root {
    --mardi-gras-purple: #663399;
    --mardi-gras-gold: #FFD700;
    --mardi-gras-green: #228B22;
    --louisiana-sunset: #FF6B35;
    --bourbon-street: #8B4513;
    --jazz-blue: #4169E1;
}
```

### **Texture Overlays:**
```css
.section-texture {
    position: relative;
}

.section-texture::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('Mardi Gras/subtle-pattern.png');
    opacity: 0.1;
    z-index: 1;
}
```

---

## 📐 **Image Optimization Steps**

### **1. Process Your Assets:**
```bash
# Resize for web (recommended)
- Hero images: 1920x1080
- Bus photos: 800x600 
- Thumbnails: 400x300
- Mardi Gras elements: Vary by use
```

### **2. Compression:**
- Use tools like TinyPNG or ImageOptim
- Target: Under 500KB per image
- Maintain quality for professional look

### **3. Create Multiple Sizes:**
```
images/
├── hero/
│   ├── hero-1920.jpg     # Desktop
│   ├── hero-1200.jpg     # Tablet
│   └── hero-800.jpg      # Mobile
├── buses/
│   ├── luxury-cruiser-large.jpg
│   ├── luxury-cruiser-medium.jpg
│   └── luxury-cruiser-thumb.jpg
└── mardi-gras/
    ├── backgrounds/
    ├── elements/
    └── textures/
```

---

## 🚀 **Implementation Priority**

### **Phase 1 (Immediate Impact):**
1. ✅ **Hero video** - Add your best party bus video
2. ✅ **Bus photos** - Replace placeholder images with your 4K photos
3. ✅ **Mardi Gras colors** - Already implemented in CSS

### **Phase 2 (Visual Enhancement):**
1. **Mardi Gras backgrounds** - Subtle textures and overlays
2. **Additional videos** - Buses page header video
3. **Louisiana elements** - Decorative masks, beads, etc.

### **Phase 3 (Polish):**
1. **Responsive images** - Multiple sizes for performance
2. **Loading animations** - Smooth transitions
3. **Interactive elements** - Hover effects with Louisiana flair

---

## 💡 **Pro Tips for Louisiana Vibes**

### **Visual Elements:**
- **Gold accents** on buttons and highlights
- **Purple shadows** for depth
- **Green details** for balance
- **Mask icons** instead of generic icons
- **Jazz-inspired fonts** for headings

### **Content Voice:**
- Use "Laissez les bons temps rouler!" (Let the good times roll!)
- Reference "NOLA" and "Big Easy"
- Mention "Fat Tuesday vibes all year"
- Include Louisiana hospitality language

### **Interactive Features:**
- **Mardi Gras color transitions** on hover
- **Festive animations** (floating, glowing effects)
- **Jazz music** integration (optional)
- **Louisiana map** integration for pickup areas

---

## 🎯 **Next Steps**

1. **Add your video files** to `Hero Videos/` folder
2. **Replace bus images** in the JavaScript bus data
3. **Add Mardi Gras backgrounds** to key sections
4. **Test on mobile** to ensure videos work properly
5. **Optimize file sizes** for fast loading

**Your website will transform from a standard party bus site into an authentic Louisiana experience that screams "PARTY TIME" the moment visitors arrive!** 🎭🚌💜💛💚

---

*Ready to make Wheelz Of Fadez the most exciting party bus experience in Louisiana!* 