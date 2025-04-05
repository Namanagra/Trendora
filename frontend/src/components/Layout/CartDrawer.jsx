import React, { useRef, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import CartContent from "../Cart/CartContent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;
  const drawerRef = useRef(null);

  const handleCheckout = () => {
    toggleCartDrawer();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerOpen && drawerRef.current && !drawerRef.current.contains(event.target)) {
        toggleCartDrawer();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [drawerOpen, toggleCartDrawer]);

  return (
    <>
      {/* Overlay */}
      {drawerOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 40,
          transition: 'opacity 300ms',
          opacity: drawerOpen ? 1 : 0
        }}></div>
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '75%',
          maxWidth: '30rem',
          height: '100%',
          backgroundColor: 'white',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 300ms',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 50
        }}
      >
        {/* Close Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '1rem',
          borderBottom: '1px solid #f3f4f6'
        }}>
          <button 
            onClick={toggleCartDrawer}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.25rem',
              borderRadius: '50%',
              transition: 'background-color 150ms',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <IoMdClose style={{ height: '1.5rem', width: '1.5rem', color: '#4b5563' }} />
          </button>
        </div>

        {/* Cart Contents */}
        <div style={{
          flexGrow: 1,
          padding: '1rem',
          overflowY: 'auto',
          borderBottom: '1px solid #f3f4f6'
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            marginBottom: '1rem',
            color: '#111827'
          }}>Your Cart</h2>
          {cart && cart?.products?.length > 0 ? (
            <CartContent cart={cart} userId={userId} guestId={guestId} />
          ) : (
            <p style={{ color: '#6b7280', textAlign: 'center', marginTop: '2rem' }}>Your Cart is Empty</p>
          )}
        </div>

        {/* Checkout Button */}
        {cart && cart?.products?.length > 0 && (
          <div style={{
            padding: '1rem',
            backgroundColor: 'white',
            position: 'sticky',
            bottom: 0,
            boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <button
              onClick={handleCheckout}
              style={{
                width: '100%',
                backgroundColor: '#000000',
                color: 'white',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 150ms',
                marginBottom: '0.5rem'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1f2937'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#000000'}
            >
              Checkout
            </button>
            <p style={{
              fontSize: '0.75rem',
              letterSpacing: '-0.025em',
              color: '#6b7280',
              marginTop: '0.5rem',
              textAlign: 'center'
            }}>
              Shipping and taxes calculated at checkout.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;