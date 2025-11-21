import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("🚀 Deploying contract with:", deployer.address);

  const factory = await hre.ethers.getContractFactory("MetaVaultKYC");

  // no constructor args needed
  const contract = await factory.deploy();

  await contract.waitForDeployment();

  console.log("✅ MetaVaultKYC deployed at:", contract.target);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
