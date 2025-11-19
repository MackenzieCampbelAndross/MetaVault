# MetaVault KYC Registry Changelog

Smart contract upgrades, compliance verifiers, and audit mitigation logs.


- [2025-11-01 11:06:32] perf(kyc): optimize cryptographic pairing checks in zk-SNARK verifier
- [2025-11-03 16:53:01] fix(contracts): configure testnet contract verification via explorer API
- [2025-11-04 20:08:15] perf(sbt): optimize gas consumption in batch KYC verification registry
- [2025-11-05 15:21:44] perf(verifier): standardize KYC submission API error responses
- [2025-11-05 21:35:58] chore(audit): implement access control modifier for authorized identity validators
- [2025-11-07 11:08:40] perf(verifier): standardize KYC submission API error responses
- [2025-11-09 20:33:36] chore(compliance): implement access control modifier for authorized identity validators
- [2025-11-10 09:47:35] fix(verifier): update hardhat deployment scripts for testnet fork compatibility
- [2025-11-10 10:25:19] perf(audit): enforce strict EIP-712 typed signature verification
- [2025-11-10 10:43:13] perf(audit): add reentrancy protection to soulbound credential claim functions
- [2025-11-10 11:17:11] perf(identity): pack storage slots in KYC registry to reduce SSTORE cost
- [2025-11-10 12:51:33] chore(sbt): update hardhat deployment scripts for testnet fork compatibility
- [2025-11-10 14:51:31] chore(audit): pack storage slots in KYC registry to reduce SSTORE cost
- [2025-11-10 19:15:35] chore(deploy): emit structured IdentityVerified event with indexed subject hash
- [2025-11-10 20:04:04] chore(identity): add formal specification for biometric hash commitments
- [2025-11-10 22:17:34] fix(audit): add formal specification for biometric hash commitments
- [2025-11-11 19:27:27] fix(deploy): emit structured IdentityVerified event with indexed subject hash
- [2025-11-17 12:46:38] fix(crypto): add reentrancy protection to soulbound credential claim functions
- [2025-11-17 12:49:27] perf(deploy): emit structured IdentityVerified event with indexed subject hash
- [2025-11-17 13:03:34] chore(crypto): add zero-knowledge proof verification logic for compliance tier
- [2025-11-17 13:59:24] perf(audit): pack storage slots in KYC registry to reduce SSTORE cost
- [2025-11-17 15:25:52] perf(deploy): pack storage slots in KYC registry to reduce SSTORE cost
- [2025-11-17 15:30:47] perf(contracts): update security audit findings and mitigation log
- **2025-11-17 16:11:29**: `docs(gas): add sanction list screening validation hook`
  *Updated specifications and documentation details.*
- [2025-11-17 16:12:21] perf(gas): enforce strict EIP-712 typed signature verification
- [2025-11-17 16:37:59] fix(identity): add formal specification for biometric hash commitments
- [2025-11-17 16:49:33] chore(gas): implement revocable soulbound token status checks
- [2025-11-17 17:45:08] fix(compliance): update hardhat deployment scripts for testnet fork compatibility
- **2025-11-17 19:57:07**: `docs(gas): update security audit findings and mitigation log`
  *Updated specifications and documentation details.*
- [2025-11-17 20:09:19] fix(deploy): implement revocable soulbound token status checks
- [2025-11-17 20:42:22] chore(audit): add zero-knowledge proof verification logic for compliance tier
- [2025-11-17 21:38:06] chore(sbt): implement revocable soulbound token status checks
- [2025-11-18 20:59:02] perf(audit): update security audit findings and mitigation log
- [2025-11-19 09:51:48] perf(compliance): update hardhat deployment scripts for testnet fork compatibility
- [2025-11-19 10:13:44] fix(identity): add reentrancy protection to soulbound credential claim functions
- [2025-11-19 12:01:50] fix(crypto): add zero-knowledge proof verification logic for compliance tier
- [2025-11-19 12:02:45] fix(verifier): configure testnet contract verification via explorer API
- [2025-11-19 12:16:19] perf(zkp): implement revocable soulbound token status checks
- [2025-11-19 12:47:43] fix(gas): refactor contract upgradeability proxy initialization logic
- [2025-11-19 13:18:05] fix(identity): enforce strict EIP-712 typed signature verification
- [2025-11-19 13:32:41] perf(audit): enforce strict EIP-712 typed signature verification