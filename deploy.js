const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("🚀 Deploying contract with:", deployer.address);

  const TokenisedKYC = await hre.ethers.getContractFactory("TokenisedKYC", deployer);
  const tokenisedKYC = await TokenisedKYC.deploy();

  await tokenisedKYC.waitForDeployment();

  console.log("✅ TokenisedKYC deployed to:", await tokenisedKYC.getAddress());
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
