import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ethers } from "ethers";
import nodemailer from "nodemailer";
import ABI from "./MetaVaultKYC_ABI.json" with { type: "json" };

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ====== BLOCKCHAIN SETUP ======
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC_URL = process.env.ALCHEMY_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

if (!PRIVATE_KEY || !RPC_URL || !CONTRACT_ADDRESS) {
  console.error("❌ Missing environment variables");
  process.exit(1);
}

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

console.log("Backend wallet:", wallet.address);

// ====== EMAIL OTP SETUP ======

const otpStore = {}; // { email: { code, expiresAt } }

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// ====== OTP ROUTES ======

// 🔹 Send OTP
app.post("/auth/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  const code = generateOtp();
  otpStore[email] = {
    code,
    expiresAt: Date.now() + 5 * 60 * 1000,
  };

  try {
    await transporter.sendMail({
      from: `"MetaVault" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Your MetaVault Login OTP",
      text: `Your OTP is ${code}. It expires in 5 minutes.`,
    });

    return res.json({ success: true });
  } catch (err) {
    console.error("OTP send failed:", err);
    return res.status(500).json({ error: "Failed to send OTP" });
  }
});

// 🔹 Verify OTP
app.post("/auth/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp)
    return res.status(400).json({ error: "Email and OTP required" });

  const entry = otpStore[email];

  if (!entry) return res.status(400).json({ error: "OTP not requested" });

  if (Date.now() > entry.expiresAt) {
    delete otpStore[email];
    return res.status(400).json({ error: "OTP expired" });
  }

  if (otp !== entry.code)
    return res.status(400).json({ error: "Invalid OTP" });

  delete otpStore[email];

  return res.json({
    success: true,
    token: "dummy-session-token",
  });
});

// ====== STORE CID ONCHAIN ======

app.post("/store-kyc", async (req, res) => {
  try {
    const { cid } = req.body;

    if (!cid) {
      return res.status(400).json({ ok: false, error: "CID required" });
    }

    const tx = await contract.uploadKYC(cid);
    await tx.wait();

    return res.json({
      ok: true,
      txHash: tx.hash,
    });
  } catch (err) {
    console.error("❌ Backend error:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});

// ====== START BACKEND ======

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
