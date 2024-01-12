import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>

      <p className="mb-4">
        Welcome to  Cakelisious! By placing order with us, we assume you accept these terms and conditions. Do not continue to use  Cakelisious if you do not agree to all of the terms and conditions stated on this page.
      </p>

      <h2 className="text-xl font-bold mb-2">1. Customized Cakes</h2>
      <p className="mb-4">
        Our customized cakes are made-to-order based on the specifications provided by the customer. Please ensure that all details, including design, flavors, and any dietary restrictions, are communicated accurately during the ordering process. Changes to custom orders may be subject to additional charges.
      </p>

      <h2 className="text-xl font-bold mb-2">2. Regular Cakes</h2>
      <p className="mb-4">
        Our regular cakes are pre-designed and may have specific flavors and sizes. Please review the product descriptions carefully before placing an order. If you have any questions or special requests, feel free to contact us before completing your purchase.
      </p>

      <h2 className="text-xl font-bold mb-2">3. Order Confirmation</h2>
      <p className="mb-4">
        Once an order is placed, you will receive an order confirmation via email. Please review the details carefully and contact us immediately if there are any discrepancies. Order modifications may be accommodated within a specified timeframe.
      </p>

      <h2 className="text-xl font-bold mb-2">4. Cancellation and Refunds</h2>
      <p className="mb-4">
        Cancellations and refund policies vary based on the type of cake and timing of the cancellation. Please refer to our cancellation and refund policy for detailed information. We reserve the right to refuse cancellations under certain circumstances.
      </p>

      {/* Add more sections as needed */}

      <p className="mt-8">
        By placing order at Cakelisious, you agree to these terms and conditions. If you have any questions or concerns, please contact us at [your contact email/phone].
      </p>
    </div>
  );
};

export default TermsAndConditions;
