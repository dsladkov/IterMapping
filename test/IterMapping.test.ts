import {time, loadFixture, hre, ethers, expect, anyValue, SignerWithAddress} from "./setup";

describe("IterMapping", function() {
  async function deply() {
    const [owner] = await ethers.getSigners();
    const IterMapping = await ethers.getContractFactory("IterMapping");
    const iterMapping = await IterMapping.deploy();
    await iterMapping.waitForDeployment();
    return {iterMapping, owner};
  }
  it("it should possible to add data into mapping", async function() {
    const {iterMapping, owner} = await loadFixture(deply);
    const name = "TestName";
    const age = 30n;
    const txAddData = await iterMapping.set(name, age);
    await txAddData.wait();

    const txGetData = await iterMapping.get(0);
    expect(txGetData).eq(age);

    expect(await iterMapping.length()).eq(1);
  });

  it("it should possible to get array data from mapping", async function() {
    const {iterMapping, owner} = await loadFixture(deply);
    const name = "TestName";
    const age = 30n;
    const txAddData = await iterMapping.set(name, age);
    await txAddData.wait();

    const txGetValues = await iterMapping.values();
    expect(txGetValues.length).eq(1);
    expect(txGetValues[0].valueOf()).eq(30);
  });

  it("it should check if key is already exists in mapping", async function() {
    const {iterMapping, owner} = await loadFixture(deply);
    const name = "TestName";
    const age = 30n;
    const txAddData = await iterMapping.set(name, age);
    await txAddData.wait();

    const age2 = 333n;
    const txAddData2 = await iterMapping.set(name, age2);
    await txAddData2.wait();

    expect(await iterMapping.get(0)).eq(age2);
  });
});