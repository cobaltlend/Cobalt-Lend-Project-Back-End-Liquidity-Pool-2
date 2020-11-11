import React, {useEffect, useMemo, useState} from 'react'
import styled from 'styled-components'
import {useWallet} from 'use-wallet'
import {provider} from 'web3-core'
import Spacer from '../../components/Spacer'
import useCobalt from '../../hooks/useCobalt'
import {getContract} from '../../utils/erc20'
import UnstakeXCobalt from './components/UnstakeXCobalt'
import StakeCobalt from "./components/StakeCobalt";

import {contractAddresses} from '../../cobalt/lib/constants'
import {getXCobaltSupply} from "../../cobalt/utils";
import BigNumber from "bignumber.js";
import {getBalanceNumber} from "../../utils/formatBalance";
import { CHAIN_ID } from '../../cobalt/lib/constants'

const StakeXCobalt: React.FC = () => {
  const {
    tokenAddress,
  } = {
    tokenAddress: contractAddresses.xCobalt[CHAIN_ID],
  }

  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  const cobalt = useCobalt()
  const {ethereum} = useWallet()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getXCobaltSupply(cobalt)
      setTotalSupply(supply)
    }
    if (cobalt) {
      fetchTotalSupply()
    }
  }, [cobalt, setTotalSupply])



  const lpContract = useMemo(() => {
    debugger
    return getContract(ethereum as provider, tokenAddress)
  }, [ethereum, tokenAddress])

  return (
    <>
      <StyledFarm>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <UnstakeXCobalt
              lpContract={lpContract}
            />
          </StyledCardWrapper>
          <Spacer/>
          <StyledCardWrapper>
            <StakeCobalt
            />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg"/>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <StyledInfo>
              ℹ️️ You will earn a portion of the swaps fees based on the amount
              of Xcobalt held relative the weight of the staking. Xcobalt can be minted
              by staking Cobalt. To redeem Cobalt staked plus swap fees convert Xcobalt
              back to Cobalt. {totalSupply ? `There are currently ${getBalanceNumber(totalSupply)} Xcobalt in the whole pool.` : '' }
            </StyledInfo>
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg"/>
      </StyledFarm>
    </>
  )
}

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default StakeXcobalt
