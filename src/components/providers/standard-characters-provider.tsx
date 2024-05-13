import { createContext, useContext, useEffect, useState } from 'react'

type StandardCharactersProviderProps = {
  children: Readonly<React.ReactNode>
  defaultState?: boolean
}

type StandardCharactersProviderState = {
  standardCharacters: boolean
  setStandardCharacters: (standardCharacters: boolean) => void
}

const StandardCharactersProviderContext =
  createContext<StandardCharactersProviderState>({
    standardCharacters: true,
    setStandardCharacters: () => null,
  })

export function StandardCharactersProvider({
  children,
  defaultState = true,
}: StandardCharactersProviderProps) {
  const [standardCharacters, setStandardCharacters] =
    useState<boolean>(defaultState)

  useEffect(() => {
    if (standardCharacters) {
      console.log('🔤 | useEffect | standardCharacters:', standardCharacters)
    }
  }, [standardCharacters, setStandardCharacters])

  const value: StandardCharactersProviderState = {
    standardCharacters,
    setStandardCharacters,
  }

  return (
    <StandardCharactersProviderContext.Provider value={value}>
      {children}
    </StandardCharactersProviderContext.Provider>
  )
}

export function useStandardCharacters() {
  const context = useContext(StandardCharactersProviderContext)

  if (!context) {
    throw new Error(
      'useStandardCharacters must be used within a StandardCharactersProvider'
    )
  }

  return context
}
