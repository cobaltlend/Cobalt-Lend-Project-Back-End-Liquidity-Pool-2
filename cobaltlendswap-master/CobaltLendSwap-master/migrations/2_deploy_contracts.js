const CobaltToken = artifacts.require('CobaltToken.sol')
const MasterChief = artifacts.require('MastierChef.sol')

module.exports = async function(deployer) {
  // Deploy Cobalt Token
  await deployer.deploy(CobaltToken)
  const cobaltToken = await CobaltToken.deployed()

  // Deploy Masterchief Contract
  await deployer.deploy(
    MasterChief,
    cobaltToken.address,
    process.env.DEV_ADDRESS, // Your address where you get cobalt tokens - should be a multisig
    web3.utils.toWei(process.env.TOKENS_PER_BLOCK), // Number of tokens rewarded per block, e.g., 100
    process.env.START_BLOCK, // Block number when token mining starts
    process.env.BONUS_END_BLOCK // Block when bonus ends
  )

  // Make Masterchief contract token owner
  const masterChief = await MasterChief.deployed()
  await cobaltToken.transferOwnership(masterChief.address)

  // Add Liquidity pool for rewards, e.g., "ETH/DAI Pool"
  await masterChief.add(
    process.env.ALLOCATION_POINT,
    process.env.LP_TOKEN_ADDRESS,
    false
  )

  // Add more liquidity pools here upon deployment, or add them later manually
}
