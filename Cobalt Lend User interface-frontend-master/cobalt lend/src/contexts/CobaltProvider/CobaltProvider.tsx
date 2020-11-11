import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Cobalt } from '../../cobalt'

export interface CobaltContext {
  cobalt?: typeof Cobalt
}

export const Context = createContext<CobaltContext>({
  cobalt: undefined,
})

declare global {
  interface Window {
    cobaltlend: any
  }
}

const CobaltProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [cobalt, setCobalt] = useState<any>()

  // @ts-ignore
  window.cobalt = cobalt
  // @ts-ignore


  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const sushiLib = new Cobalt(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setCobalt(cobaltLib)
      window.cobaltlend = cobaltLib
    }
  }, [ethereum])

  return <Context.Provider value={{ cobalt }}>{children}</Context.Provider>
}

export default CobaltProvider
