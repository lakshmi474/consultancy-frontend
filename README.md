# MediCare - Online Medical Shop (Pharmacy)

A modern, responsive online pharmacy website built with React.js for ordering medicines online.

## Features

### User Features
- 🏠 **Homepage** with hero section, category showcase, popular medicines, offers, and trust factors
- 🔍 **Medicine Search** with auto-suggestions
- 📋 **Filters** by category, brand, price, and prescription requirement
- 💊 **Medicine Catalog** with detailed product pages
- 🛒 **Shopping Cart** with quantity management
- 💳 **Checkout** with prescription upload (image/PDF)
- 📦 **Order Management** with order history and tracking
- 👤 **User Account** with saved addresses, prescriptions, and wishlist
- 📱 **Fully Responsive** design for mobile, tablet, and desktop

### Admin Features
- 💊 **Medicine Management** - Add, update, delete medicines
- 📦 **Order Management** - View and update order status
- 📁 **Category Management** - Manage medicine categories
- 🎫 **Coupon Management** - Create and manage discount coupons

## Tech Stack

### Frontend
- **React 18** with Vite
- **React Router** for navigation
- **CSS3** with custom properties and animations
- **Intersection Observer** for lazy loading and scroll animations

### Backend (Structure Ready)
- **Node.js** with Express
- **MongoDB** schemas (ready to connect)
- RESTful API structure

## Project Structure

```
medical-web/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── home/           # Homepage sections
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx
│   │   ├── MedicineCard.jsx
│   │   └── Filters.jsx
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── Medicines.jsx
│   │   ├── MedicineDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Account.jsx
│   │   ├── Admin.jsx
│   │   └── ...
│   ├── context/            # React Context (Cart, Auth)
│   ├── data/               # Sample JSON data
│   ├── utils/              # Utility functions
│   ├── App.jsx
│   └── main.jsx
├── backend/                # Backend structure
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   └── server.js
└── package.json
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
cd "medical web"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Design Features

- **Color Palette**: White, Light Blue (#E0F2FE), and Green (#10B981)
- **Lazy Loading**: Images load only when scrolled into view
- **Scroll Animations**: Fade-in, slide-up, and zoom-in effects
- **Responsive**: Mobile-first design approach
- **Accessibility**: ARIA labels and semantic HTML

## Sample Data

The application includes sample medicine data in `src/data/medicines.json` with 20+ medicines across various categories.

## Demo Accounts

### Regular User
- Email: any email
- Password: any password
- (Demo authentication - not connected to backend)

### Admin
- Email: `admin@medicare.com`
- Password: any password
- Access: Admin dashboard

## Backend Setup (Optional)

The backend structure is ready but not connected. To set up:

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file based on `.env.example`

4. Connect MongoDB in `server.js`

5. Start backend server:
```bash
npm run dev
```

## Compliance & Safety

- ✅ Licensed Pharmacy information
- 🛡️ Prescription requirement badges
- 📋 Medical disclaimer
- 📜 Terms & Conditions
- 🔒 Privacy Policy
- 💰 Return & Refund Policy

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for demonstration purposes.

## Notes

- This is a frontend-focused implementation
- Backend APIs are placeholder structures
- Authentication uses localStorage (demo mode)
- Prescription upload UI is ready but file handling needs backend
- All data is stored in localStorage for demo purposes

## Future Enhancements

- Connect to MongoDB backend
- Implement full authentication with JWT
- Add payment gateway integration
- Implement prescription file upload
- Add email notifications
- Add real-time order tracking
- Implement search with backend API
- Add product reviews and ratings
- Implement wishlist functionality
- Add advanced filtering and sorting


