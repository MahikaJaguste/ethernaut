
const hre = require("hardhat");

async function main() {

    const [deployer, signer0, signer1] = await hre.ethers.getSigners();
    console.log(deployer.address, signer0.address, signer1.address);

    const contract = await hre.ethers.getContractAt("GatekeeperTwo", "0xAC7e1E589EaccB32D9652064c62590E422649de8", signer0);
    // const contract = await hre.ethers.deployContract("GatekeeperTwo", deployer);
    console.log("Contract deployed to address:", contract.address);
    console.log("Contract entrant:", await contract.entrant());
    const testContract = await hre.ethers.deployContract("TestGatekeeperTwo", [contract.address], deployer);
    console.log("Test contract deployed to:", testContract.address)

    console.log("Contract entrant:", await contract.entrant());


    /*
    // Understand caller()

    const c1 = await hre.ethers.deployContract("BeingCalled");
    const c2 = await hre.ethers.deployContract("DelegatorCaller");

    await c1.testCaller();
    let temp = (await c1.callerValue()).toLowerCase();
    console.log("Direct call from msg.sender returns msg.sender", temp === deployer.address.toLowerCase() );

    await c2.testCall(c1.address);
    temp = (await c1.callerValue()).toLowerCase();
    console.log("Call from contract returns c2 address", temp === c2.address.toLowerCase());

    await c2.testDelegatecall(c1.address);
    temp = (await c2.callerValue()).toLowerCase();
    console.log("Delegate call from contract returns msg.sender", temp === deployer.address.toLowerCase());

    */
}


main()
