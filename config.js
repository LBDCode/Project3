require("dotenv").config();
module.exports = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  twilioNumber: process.env.TWILIO_NUMBER,
  email: process.env.EMAIL,
  password: process.env.PASSWORD
};
