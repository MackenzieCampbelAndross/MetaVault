import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ethers } from "ethers";
import ABI from "./MetaVaultKYC_abi.json" with { type: "json" };

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

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

// Store CID on-chain
app.post("/store-kyc", async (req, res) => {
  try {
    const { cid } = req.body;

    if (!cid) {
      return res.status(400).json({ ok: false, error: "CID required" });
    }

    console.log("⏳ Sending tx uploadKYC:", cid);

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

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});

