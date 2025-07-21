// src/utils/sendOrderMail.js
import emailjs from '@emailjs/browser';

const sendOrderMail = (order) => {
  const templateParams = {
    title: "New Order",
    name: order.name,
    email: order.email,
    phone: order.phone,
    address: order.address,
    amount: order.amount,
    items: order.items
      ?.map((item) => `• ${item.name} (x${item.quantity})`)
      .join("<br>"),
  };

  emailjs
    .send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ADMIN,
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then(
      (response) => {
        console.log("EmailJS SUCCESS!", response.status, response.text);
      },
      (err) => {
        console.error("EmailJS FAILED...", err);
      }
    );
};

export default sendOrderMail;
