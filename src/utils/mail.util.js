const confirmPayment = ({ customer_name, order_number, order_date, total_amount }) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Order Confirmation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1,
        p {
          margin-bottom: 20px;
        }
        h1 {
          text-align: center;
          background-color: #007bff;
          color: white;
          padding: 10px 0;
        }
        .button {
          display: inline-block;
          background-color: #007bff;
          color: #fff;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Order Confirmation</h1>
        <p>Dear ${customer_name} ,</p>
        <p>
          Thank you for placing your order with <strong>A6Garden</strong>. Your order details are as
          follows:
        </p>
        <ul>
          <li>Order Number: ${order_number}</li>
          <li>Order Date: ${order_date}</li>
          <li>Total Amount: ${total_amount}VND</li>
        </ul>
        <p>Thank you for shopping with us!</p>
    </body>
  </html>`
}

const forgotPassword = ({ user_mail, new_password }) => {
  return ` <!DOCTYPE html>
 <html lang="en">
   <head>
     <meta charset="UTF-8" />
     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     <title>Password Reset</title>
     <style>
       body {
         font-family: Arial, sans-serif;
         line-height: 1.6;
         color: #333;
         background-color: #f4f4f4;
         margin: 0;
         padding: 0;
       }
       .container {
         max-width: 600px;
         margin: 20px auto;
         padding: 20px;
         background-color: #fff;
         border-radius: 8px;
         box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
       }
       h1,
       p {
         margin-bottom: 20px;
       }
       h1 {
         background-color: #007bff;
         color: white;
         text-align: center;
         padding: 10px 0;
       }
       .button {
         display: inline-block;
         background-color: #007bff;
         color: #fff;
         padding: 10px 40px;
         text-decoration: none;
         border-radius: 5px;
       }
     </style>
   </head>
   <body>
     <div class="container">
       <h1>Password Reset</h1>
       <p>Dear ${user_mail},</p>
       <p>
         Your password has been successfully reset. Here is your new password:
       </p>
       <p><strong>${new_password}</strong></p>
       <p>
         For security reasons, we recommend changing your password after logging
         in.
       </p>
       <p>
         You can log in using your new password by clicking the button below:
       </p>
       <p>
         If you did not request a password reset, please contact us immediately.
       </p>
       <p>Thank you!</p>
     </div>
   </body>
 </html>`
}

const newAccount = ({ user_mail, user_name, user_password, user_role }) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Account Created Successfully</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1,
        p {
          margin-bottom: 20px;
        }
        h1 {
          background-color: #007bff;
          color: white;
          text-align: center;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          text-decoration: none;
          border-radius: 4px;
          transition: background-color 0.3s ease;
        }
        .button:hover {
          background-color: #0056b3;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Account Created Successfully</h1>
        <p>Dear ${user_name},</p>
        <p>Congratulations! Your account has been successfully created.</p>
        <p>Here are your account details:</p>
        <ul>
          <li><strong>Name:</strong> ${user_name}</li>
          <li><strong>Email:</strong> ${user_mail}</li>
          <li><strong>Password:</strong> ${user_password}</li>
          <li><strong>Role:</strong> ${user_role}</li>
        </ul>
        <p>
          You can now log in to your account using the email and password
          provided.
        </p>
        <p>Thank you for joining us!</p>
      </div>
    </body>
  </html>`
}

module.exports = {
  confirmPayment,
  forgotPassword,
  newAccount
}
