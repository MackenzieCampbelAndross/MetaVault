import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

// In-memory OTP store: { [email]: { code, expiresAt } }
const otpStore = {};

// 🔐 Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,          // your Gmail
    pass: process.env.GMAIL_APP_PASSWORD,  // app password
  },
});

// helper: generate 6-digit OTP
const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

/**
 * POST /auth/send-otp
 * body: { email }
 */
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const code = generateOtp();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

  otpStore[email] = { code, expiresAt };

  try {
    await transporter.sendMail({
      from: `"MetaVault" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Your MetaVault Login OTP",
      text: `Your MetaVault OTP is: ${code}. It is valid for 5 minutes.`,
    });

    return res.json({ success: true });
  } catch (err) {
    console.error("Error sending OTP:", err);
    return res.status(500).json({ error: "Failed to send OTP" });
  }
});

/**
 * POST /auth/verify-otp
 * body: { email, otp }
 */
router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp)
    return res.status(400).json({ error: "Email and OTP are required" });

  const record = otpStore[email];
  if (!record) return res.status(400).json({ error: "OTP not requested" });

  if (Date.now() > record.expiresAt) {
    delete otpStore[email];
    return res.status(400).json({ error: "OTP expired" });
  }

  if (record.code !== otp) {
    return res.status(400).json({ error: "Invalid OTP" });
  }

  // OTP correct → you can generate JWT here; for now, simple success + fake token
  delete otpStore[email];

  return res.json({
    success: true,
    token: "dummy-metavault-session-token",
  });
});

export default router;
