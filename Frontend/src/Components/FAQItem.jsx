// src/Components/FAQItem.jsx
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import "../Styles/FAQItem.css"; // We will create this CSS file next

export default function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <p>{question}</p>
        <ChevronDown
          className="faq-icon"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </div>
      <div className={`faq-answer ${isOpen ? "open" : ""}`}>
        <p>{answer}</p>
      </div>
    </div>
  );
}