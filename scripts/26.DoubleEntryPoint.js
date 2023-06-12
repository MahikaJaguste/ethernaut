
const hre = require("hardhat");

async function main() {

    const [deployer, signer0, signer1, deployer1] = await hre.ethers.getSigners();

    const legacyToken = await hre.ethers.deployContract("LegacyToken", signer0);
    const vault = await hre.ethers.deployContract("CryptoVault", [signer1.address], signer0);
    const forta = await hre.ethers.deployContract("Forta", signer0);

    const detToken = await hre.ethers.deployContract("DoubleEntryPoint", [
        legacyToken.address,
        vault.address,
        forta.address,
        deployer.address
    ], signer0);

    await legacyToken.mint(vault.address, hre.ethers.utils.parseEther("100"));
    await legacyToken.delegateToNewContract(detToken.address);
    await vault.setUnderlying(detToken.address);


    // const legacyToken = await hre.ethers.getContractAt("LegacyToken", "0x325077298f29A3767f94E74E9Ec75be5087b3Dde", deployer);
    // const vault = await hre.ethers.getContractAt("CryptoVault", "0x8277A9F635B807Aa7f6344C25A2cb3253a509a54", deployer);
    // const forta = await hre.ethers.getContractAt("Forta", "0x6657B7Ea0eA7c51bccfb941146813E0973b01768", deployer);
    // const detToken = await hre.ethers.getContractAt("DoubleEntryPoint", "0x4963685475A67639fb9e57655A1bc3a0Eddcd8cf", deployer);

    const bot = await hre.ethers.deployContract('DetectionBot', [vault.address, forta.address], deployer);
    const forta1 = await hre.ethers.getContractAt('Forta', forta.address, deployer);
    await forta1.setDetectionBot(bot.address);

    console.log("Vault balance of DET tokens before:", await detToken.balanceOf(vault.address));
    await vault.sweepToken(legacyToken.address);
    console.log("Vault balance of DET tokens after:", await detToken.balanceOf(vault.address));

}


main()
