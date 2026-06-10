# Fresh Cart E-Commerce Application

A fully functional, responsive React e-commerce application integrated with a REST API backend. The application features user authentication, a dynamic product catalog with search and category filtering, a robust shopping cart, a wishlist management system, and an order checkout flow with Cash on Delivery and online payment integrations.

## Live Links

- **Live Demo Link:** [Fresh Cart Web Application](https://e-commerce-beta-seven-92.vercel.app/)
- **API Base Endpoint:** `https://ecommerce.routemisr.com/api/v1/`

## Deliverables & Features

- **User Authentication:** Fully secure registration, login, forgot password flow, and route protection guards.
- **Interactive Product Catalog:** Dynamic search bar filtering products by title, category filtering chips, and real-time updates.
- **Product Details & Gallery:** Responsive detail views displaying ratings, descriptions, brands, and thumbnail image preview selection.
- **Shopping Cart System:** Responsive cart page with quantity increment and decrement buttons, item removal, and full cart clearing.
- **Wishlist System:** Dedicated wishlist page showcasing saved items, permitting item removal and direct cart conversion.
- **Integrated Checkout Flow:** Shipping details form with client-side validation, supporting cash orders and Stripe online card payments.
- **Real-Time Badging & Toasts:** Global toast alerts notifying users on action statuses, coupled with navbar badges showing active cart and wishlist counts.

## Skills & Tools Used

- **Core Library:** React.js (Functional Components, Custom Hooks)
- **Styling:** Tailwind CSS, Flowbite, FontAwesome Icons
- **State & Data Management:** React Context API (Cart, Wishlist, and Authentication Providers), React Query (TanStack Query)
- **API Integration:** Axios
- **Routing:** React Router DOM (createBrowserRouter, RouterProvider)
- **Form Validation:** Formik, Yup
- **User Notifications:** React Hot Toast
- **Build System:** Vite

## Installation & Local Development

Follow these steps to run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/nourbatniji/E-commerce.git
   ```

2. Navigate to the project directory:
   ```bash
   cd E-commerce
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build the application for production:
   ```bash
   npm run build
   ```
