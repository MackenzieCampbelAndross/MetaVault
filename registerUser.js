const hre = require("hardhat");

async function main() {
  const contractAddress = "0xdd68551fc96a55f43B11Df6883c54E4FB27e7cE8";
  const TokenisedKYC = await hre.ethers.getContractAt("TokenisedKYC", contractAddress);

  console.log("🚀 Registering user...");

  const name = "John Doe";
  const email = "john@example.com";
  const documentHash = "hashed_kyc_data_12345"; // Simulated encrypted or IPFS hash

  const tx = await TokenisedKYC.registerUser(name, email, documentHash);
  await tx.wait();

  console.log(`✅ User ${name} registered successfully!`);
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exitCode = 1;
});
