const hre = require("hardhat");

async function main() {
  const contractAddress = "0xdd68551fc96a55f43B11Df6883c54E4FB27e7cE8";
  const TokenisedKYC = await hre.ethers.getContractAt("TokenisedKYC", contractAddress);
  const [signer] = await hre.ethers.getSigners();

  const userAddress = signer.address;
  console.log(`📡 Fetching user info for: ${userAddress}`);

  const [name, email, documentHash, isVerified] = await TokenisedKYC.getUser(userAddress);

  console.log(`
  👤 Name: ${name}
  📧 Email: ${email}
  🧾 Document Hash: ${documentHash}
  ✅ Verified: ${isVerified ? "Yes" : "No"}
  `);
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exitCode = 1;
});
