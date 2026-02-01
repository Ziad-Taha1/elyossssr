# Elyossssr - React Market App

A modern, responsive e-commerce market application built with React, TypeScript, and Firebase. Features a user-friendly store interface, admin dashboard, real-time global data management, and WhatsApp integration for orders.

## Features

### 🛒 Store Interface
- Browse products by category (All, Pulses, Oils, Dairy, Pasta, Cleaners, Other)
- Add products to cart
- Dark/Light mode toggle
- Responsive design for mobile and desktop
- QR code for easy website access

### 👨‍💼 Admin Dashboard
- Secure admin login (password: "admin")
- Add new products with name, price, category, and image URL
- View all products in a table
- Delete products
- Statistics: Total products, total sales (placeholder)
- Real-time data updates

### 📱 WhatsApp Integration
- Send orders directly to WhatsApp
- Pre-formatted order message with customer details
- QR code for WhatsApp contact

### 🌐 Global Data Management
- localStorage for persistent data storage
- Data syncs across browser sessions on the same device
- No backend required - works immediately

### 🎨 UI/UX
- Tailwind CSS for styling
- Lucide React icons
- Smooth animations and transitions
- Arabic language support

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Storage**: Browser localStorage
- **QR Codes**: QRCode React
- **Deployment**: GitHub Pages

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ziad-Taha1/elyossssr.git
   cd elyossssr
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

### For Customers
1. Browse products in the store
2. Add items to cart
3. Click cart icon to view cart
4. Fill order form with name, phone, address
5. Submit to send WhatsApp order

### For Admins
1. Click "Admin" button
2. Enter password: "admin"
3. Add new products using the form
4. View and delete existing products
5. Monitor statistics

## Deployment

The app is deployed on GitHub Pages. To deploy your changes:

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

The app will be available at: https://ziad-taha1.github.io/elyossssr/

## Project Structure

```
elyossssr/
├── public/
│   └── products.json (fallback data)
├── src/
│   └── app.tsx (main component)
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

## Key Components

- **App**: Main component with routing between store and admin
- **Store**: Product browsing and cart functionality
- **Admin**: Product management interface
- **CartDrawer**: Shopping cart modal

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run deploy`: Deploy to GitHub Pages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For questions or support, contact via WhatsApp: +201227412513

---

Built with ❤️ using React and Firebase