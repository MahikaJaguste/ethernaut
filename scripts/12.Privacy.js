
const hre = require("hardhat");

async function main() {

    const [deployer, signer0, signer1] = await hre.ethers.getSigners();

    const arg1 = hre.ethers.utils.hexZeroPad(hre.ethers.utils.hexlify(hre.ethers.utils.toUtf8Bytes("mahika")), 32);
    const arg2 = hre.ethers.utils.hexZeroPad(hre.ethers.utils.hexlify(hre.ethers.utils.toUtf8Bytes("eshika")), 32);
    const arg3 = hre.ethers.utils.hexZeroPad(hre.ethers.utils.hexlify(hre.ethers.utils.toUtf8Bytes("isha")), 32);

    args = [arg1, arg2, arg3];
    console.log("Args", args);

    // const contract = await hre.ethers.deployContract("TestPrivacy", [[5,6,7]], signer0);
    const contract = await hre.ethers.getContractAt("Privacy", "0x40Fe568458DD9aDC0bE4c1DBD5dF44637ff7610c", signer0);
    console.log("Contract deployed to address:", contract.address);

    const slot = 3;

    // const arg1_ = await hre.ethers.provider.getStorageAt(contract.address, slot + 0);
    // const arg2_ = await hre.ethers.provider.getStorageAt(contract.address, slot + 1);
    const arg3_ = await hre.ethers.provider.getStorageAt(contract.address, slot + 2);

    console.log(arg3_)

    // console.log(hre.ethers.utils.toUtf8String(arg1_));
    // console.log(hre.ethers.utils.toUtf8String(arg2_));
    // console.log(hre.ethers.utils.toUtf8String(arg3_));

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
