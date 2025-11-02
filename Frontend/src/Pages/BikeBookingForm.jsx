// src/Pages/BikeBookingForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "../Styles/BikeBookingForm.css";
import dash from "../assets/Projectpic/dash.jpg";
import { useNavigate } from "react-router-dom";

// ✅ Stripe test publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const API_URL = import.meta.env.VITE_API_URL;

export default function BikeBookingForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    altMobile: "",
    address: "",
    pickup: "",
    destination: "",
    purpose: "",
    aadhar: null,
  });


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setFormData({ ...formData, [name]: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    let discountValue = 0;

    switch (code) {
      case "GOBIKES100":
      case "MBK100":
        discountValue = 100;
        break;
      case "GOBIKES50":
        discountValue = 50;
        break;
      case "GOBIKES200":
        discountValue = 200;
        break;
      case "GOBIKES500":
        discountValue = 500;
        break;
      default:
        discountValue = 0;
    }

    if (discountValue > 0) {
      setDiscount(discountValue);
      alert(`🎉 Coupon Applied! ₹${discountValue} off your total.`);
    } else {
      setDiscount(0);
      alert("❌ Invalid coupon code.");
    }
  };

  // ✅ Submit booking form (after successful payment)
  const handleSubmit = async () => {
    setLoading(true);
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    try {
      await axios.post(`${API_URL}/api/bookings`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Booking Successful!");

      // ✅ Reset form
      setFormData({
        name: "",
        email: "",
        mobile: "",
        altMobile: "",
        address: "",
        pickup: "",
        destination: "",
        purpose: "",
        aadhar: null,
      });
      setCoupon("");
      setDiscount(0);
      setStep(0);
      navigate("/");
    } catch {
      alert("❌ Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-page" style={{ backgroundImage: `url(${dash})` }}>
      <div className="booking-card">
        <h2 className="form-title">🏍️ Bike Booking Form</h2>

        <div className="step-indicator">
          {["Personal Info", "Travel Details", "Upload Aadhar", "Payment"].map(
            (label, i) => (
              <div
                key={i}
                className={`step ${step === i ? "active-step" : ""}`}
              >
                {label}
              </div>
            )
          )}
        </div>

        {/* STEP 1 */}
        {step === 0 && (
          <div className="form-step">
            <label>Full Name*</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label>Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Mobile*</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
            <label>Alternate Mobile</label>
            <input
              type="tel"
              name="altMobile"
              value={formData.altMobile}
              onChange={handleChange}
            />
            <label>Address*</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>
            <button className="next-btn" onClick={nextStep}>
              Next ➜
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 1 && (
          <div className="form-step">
            <label>Purpose of Travel*</label>
            <input
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              required
            />
            <label>Pickup Point*</label>
            <input
              name="pickup"
              value={formData.pickup}
              onChange={handleChange}
              required
            />
            <label>Destination Point*</label>
            <input
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
            />
            <div className="button-group">
              <button className="back-btn" onClick={prevStep}>
                ← Back
              </button>
              <button className="next-btn" onClick={nextStep}>
                Next ➜
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 2 && (
          <div className="form-step">
            <label>Aadhar Card (Image or PDF)*</label>
            <input
              type="file"
              name="aadhar"
              accept="image/*,application/pdf"
              onChange={handleChange}
              required
            />
            {formData.aadhar && (
              <img
                src={URL.createObjectURL(formData.aadhar)}
                alt="aadhar"
                className="preview"
              />
            )}
            <p className="note">
              ⚠️ If the bike is damaged, you must pay the cost demanded by the
              owner/showroom.
            </p>
            <div className="button-group">
              <button className="back-btn" onClick={prevStep}>
                ← Back
              </button>
              <button className="next-btn" onClick={nextStep}>
                Next ➜
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 - Payment */}
        {step === 3 && (
          <Elements stripe={stripePromise}>
            <PaymentStep
              amount={500 - discount}
              discount={discount}
              coupon={coupon}
              setCoupon={setCoupon}
              applyCoupon={applyCoupon}
              prevStep={prevStep}
              handleSubmit={handleSubmit}
            />
          </Elements>
        )}
      </div>
    </div>
  );
}

// ✅ Payment Component
function PaymentStep({
  amount,
  discount,
  coupon,
  setCoupon,
  applyCoupon,
  prevStep,
  handleSubmit,
}) {
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async () => {
    if (!stripe || !elements) return;
    try {
      const token = localStorage.getItem("token"); // get JWT

      // ✅ Step 1: Create PaymentIntent (and save Pending to DB)
      const { data } = await axios.post(
        `${API_URL}/api/payment`,
        { amount },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const card = elements.getElement(CardElement);

      // ✅ Step 2: Confirm Payment via Stripe
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card,
          billing_details: { name: "Bike Booking User" },
        },
      });

      // ✅ Step 3: Handle result
      if (result.error) {
        alert("❌ Payment Failed: " + result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        alert("✅ Payment Successful!");
        // ✅ Step 4: Update payment status to Completed in MongoDB
        await axios.post(`${API_URL}/api/payment/success`, {
          paymentIntentId: result.paymentIntent.id,
        });

        // ✅ Step 5: Submit booking form
        await handleSubmit();
      }
    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <div className="form-step">
      <h3>💳 Payment Section</h3>
      <p>Booking Amount: ₹500</p>
      <p>Discount: ₹{discount}</p>
      <p>
        <strong>Total Payable: ₹{amount}</strong>
      </p>

      <label>Apply Coupon</label>
      <div className="coupon-section">
        <input
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Enter coupon (e.g. GOBIKES50)"
        />
        <button type="button" className="apply-btn" onClick={applyCoupon}>
          Apply
        </button>
      </div>

      <div className="card-box">
        <CardElement
          options={{
            style: {
              base: {
                color: "#fff",
                fontSize: "16px",
                "::placeholder": { color: "#bbb" },
              },
              invalid: { color: "#ff6b6b" },
            },
          }}
        />
      </div>

      <div className="button-group">
        <button className="back-btn" onClick={prevStep}>
          ← Back
        </button>
        <button className="pay-btn" onClick={handlePayment}>
          💰 Pay ₹{amount} & Submit
        </button>
      </div>
    </div>
  );
}
