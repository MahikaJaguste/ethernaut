
const hre = require("hardhat");

async function main() {

    const [deployer, signer0, signer1] = await hre.ethers.getSigners();
    console.log(deployer.address, signer0.address, signer1.address);

    // const modulo32 = hre.ethers.BigNumber.from(2**32);
    // const modulo16 = 65536;

    // const keyNumber = hre.ethers.BigNumber.from(modulo32).add(54338)

    // const key =  hre.ethers.utils.hexZeroPad(hre.ethers.utils.hexlify(keyNumber), 8);
    // console.log("Key:", key);

    // // uint64(_gateKey)
    // const keyUint = hre.ethers.BigNumber.from(key);
    // // uint32(uint64(_gateKey))
    // const lhs = keyUint.mod(modulo32);
    // // uint16(uint64(_gateKey))
    // const rhs1 = keyUint.mod(modulo16);

    // console.log("Gate 3 part one:", rhs1.eq(lhs));
    // console.log("Gate 3 part two", keyUint.eq(lhs));

    // // tx.origin
    // const txOrigin = "0xa518097A3843F10c06a9B9419aa02245771dD442";
    // // uint160(tx.origin)
    // const txOrigin_ = hre.ethers.BigNumber.from(txOrigin);
    // // uint16(uint160(tx.origin))
    // const rhs3 = txOrigin_.mod(modulo16);
    // console.log(rhs3, "rhs3")
    // console.log("Gate 3 part three:", rhs3.eq(lhs));


    // const contract = await hre.ethers.getContractAt("GatekeeperTwo", "", signer0);
    const contract = await hre.ethers.deployContract("GatekeeperTwo", deployer);
    console.log("Contract deployed to address:", contract.address);
    console.log("Contract entrant:", await contract.entrant());
    const testContract = await hre.ethers.deployContract("TestGatekeeperTwo", [contract.address], deployer);
    // const testContract = await hre.ethers.getContractAt("TestGatekeeperTwo", "0x68180a8d85c867CC2806c6C7F0561acDF62cF6f8", deployer);
    console.log("Test contract deployed to:", testContract.address)

    // const tx = await testContract.attack();
    // await tx.wait();
    // const receipt = await hre.ethers.provider.getTransactionReceipt(tx.hash);
    // console.log(receipt.logs);
   
    // console.log("Contract entrant:", await contract.entrant());


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
}


main()
