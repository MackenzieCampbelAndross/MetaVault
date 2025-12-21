const hre = require("hardhat");

async function main() {
  const contractAddress = "0xdd68551fc96a55f43B11Df6883c54E4FB27e7cE8";
  const TokenisedKYC = await hre.ethers.getContractAt("TokenisedKYC", contractAddress);

  const [admin] = await hre.ethers.getSigners();

  // 🔧 Use a valid address — your wallet or the user's actual address
  const userAddress = "0x250C6A930a44b625a239e46D79e7B8d91E3fcAa0";

  console.log(`🔍 Verifying user: ${userAddress}`);
  console.log(`👑 Admin executing: ${admin.address}`);

  const tx = await TokenisedKYC.verifyUser(userAddress);
  await tx.wait();

  console.log(`✅ User ${userAddress} marked as verified!`);
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exitCode = 1;
});
