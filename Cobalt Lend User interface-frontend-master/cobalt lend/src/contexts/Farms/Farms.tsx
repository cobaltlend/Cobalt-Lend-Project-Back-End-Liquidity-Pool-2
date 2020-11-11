import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useCobalt from '../../hooks/useCobalt'

import { bnToDec } from '../../utils'
import { getMasterChiefContract, getEarned } from '../../cobalt/utils'
import { getFarms } from '../../cobalt/utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const cobalt = useCobalt()
  const { account } = useWallet()

  const farms = getFarms(cobalt)

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
