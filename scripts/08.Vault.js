
const hre = require("hardhat");

async function main() {

    // txn hash = https://mumbai.polygonscan.com/tx/0x957724c282fa487710ddfd0fb2ef60f31a7eea6a1baf5ce829c8aa09451db37a
    // const address = "0xBedd452b09d4Bd11255a8434E1B85c53801D0153"
    // const locked = await hre.ethers.provider.getStorageAt(address, 0);
    // const password = await hre.ethers.provider.getStorageAt(address, 1);

    // console.log("locked:", locked);
    // console.log("password:", password);
    // console.log("password:", hre.ethers.utils.toUtf8String(password));

    const [deployer, signer0, signer1] = await hre.ethers.getSigners();

    const args = [hre.ethers.utils.hexlify(hre.ethers.utils.toUtf8Bytes("mahika"))];
    args[0] = hre.ethers.utils.hexZeroPad(args[0], 32);
    const contract = await hre.ethers.deployContract("Vault", args, signer0);
    console.log("Contract deployed to address:", contract.address);
    console.log("Contract locked:", await contract.locked());

    // use ethers to getStorageAt
    const locked = await hre.ethers.provider.getStorageAt(contract.address, 0);
    const password = await hre.ethers.provider.getStorageAt(contract.address, 1);

    console.log("locked:", locked);
    console.log("password:", password);
    console.log("password:", hre.ethers.utils.toUtf8String(password));

    await contract.unlock(password);

    console.log("Contract locked:", await contract.locked());

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
