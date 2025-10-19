import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Cart from "./Pages/Cart";
import ProductDetail from "./Pages/ProductDetail";
import WriteReview from "./Pages/WriteReview";
import Checkout from "./Pages/Checkout";
import Orders from "./Pages/Orders";
import Wishlist from "./Pages/Wishlist";
import Profile from "./Pages/Profile";
import About from "./Pages/About";
import Support from "./Pages/Support";
import TrackOrder from "./Pages/TrackOrder";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsConditions from "./Pages/TermsConditions";
import AdminLogin from "./Pages/AdminLogin";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminProducts from "./Pages/AdminProducts";
import AdminOrders from "./Pages/AdminOrders";
import AdminUsers from "./Pages/AdminUsers";
import AdminCustomers from "./Pages/AdminCustomers";
import { AuthProvider } from "./Context/AuthContext";
import { CartProvider } from "./Context/CartContext";
import { ProductProvider } from "./Context/ProductContext";
import { WishlistProvider } from "./Context/WishlistContext";

const App = () => {
  const router = createBrowserRouter(
    [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "signin",
          element: <Signin />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "checkout",
          element: <Checkout />,
        },
        {
          path: "orders",
          element: <Orders />,
        },
        {
          path: "wishlist",
          element: <Wishlist />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "product/:id",
          element: <ProductDetail />,
        },
        {
          path: "product/:id/review",
          element: <WriteReview />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "support",
          element: <Support />,
        },
        {
          path: "track-order",
          element: <TrackOrder />,
        },
        {
          path: "privacy-policy",
          element: <PrivacyPolicy />,
        },
        {
          path: "terms-conditions",
          element: <TermsConditions />,
        },
      ],
    },
    {
      path: "admin/login",
      element: <AdminLogin />,
    },
    {
      path: "admin/dashboard",
      element: <AdminDashboard />,
    },
    {
      path: "admin/products",
      element: <AdminProducts />,
    },
    {
      path: "admin/orders",
      element: <AdminOrders />,
    },
    {
      path: "admin/users",
      element: <AdminUsers />,
    },
    {
      path: "admin/customers",
      element: <AdminCustomers />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
  );
  
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <ProductProvider>
          <WishlistProvider>
            <CartProvider>
              <RouterProvider router={router} />
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: '#ffffff',
                    color: '#1f2937',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                    border: '1px solid #e5e7eb',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                  },
                  success: {
                    duration: 2500,
                    style: {
                      background: '#ecfdf5',
                      color: '#065f46',
                      border: '1px solid #6ee7b7',
                    },
                    iconTheme: {
                      primary: '#10b981',
                      secondary: '#ffffff',
                    },
                  },
                  error: {
                    duration: 4000,
                    style: {
                      background: '#fef2f2',
                      color: '#991b1b',
                      border: '1px solid #fca5a5',
                    },
                    iconTheme: {
                      primary: '#ef4444',
                      secondary: '#ffffff',
                    },
                  },
                  loading: {
                    style: {
                      background: '#eff6ff',
                      color: '#1e40af',
                      border: '1px solid #93c5fd',
                    },
                    iconTheme: {
                      primary: '#3b82f6',
                      secondary: '#ffffff',
                    },
                  },
                }}
              />
            </CartProvider>
          </WishlistProvider>
        </ProductProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
