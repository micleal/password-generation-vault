import { createContext, useContext, useState } from 'react'

/**
 * Represents the props for configuring password settings.
 */
type PasswordProps = {
  numOfCharacters: number
  allowUppercase?: boolean
  allowNumbers?: boolean
  allowSymbols?: boolean
  useStandardCharacters?: boolean
  nonSequential?: boolean
  noMoreThan?: number
  password?: string
  setNumOfCharacters?: (numberOfCharacters: number) => void
  setAllowUppercase?: (allowUppercase: boolean) => void
  setAllowNumbers?: (allowNumbers: boolean) => void
  setAllowSymbols?: (allowSymbols: boolean) => void
  setUseStandardCharacters?: (useStandardCharacters: boolean) => void
  setNonSequential?: (nonSequential: boolean) => void
  setNoMoreThan?: (noMoreThan: number) => void
  setPassword?: (password: string) => void
}

/**
 * Props for the PasswordSettingsProvider component.
 */
type PasswordProviderProps = {
  children: Readonly<React.ReactNode>
  defaultPasswordState?: PasswordProps
}

/**
 * Represents the state of the PasswordSettingsProvider component.
 */
type PasswordProviderState = PasswordProps

/**
 * Represents the initial state for the PasswordSettingsProvider.
 */
const initialState: PasswordProviderState = {
  numOfCharacters: 16,
  allowUppercase: true,
  allowNumbers: true,
  allowSymbols: true,
  useStandardCharacters: true,
  nonSequential: true,
  noMoreThan: 2,
  password: '',
  setNumOfCharacters: () => null,
  setAllowNumbers: () => null,
  setAllowSymbols: () => null,
  setAllowUppercase: () => null,
  setUseStandardCharacters: () => null,
  setNonSequential: () => null,
  setNoMoreThan: () => null,
  setPassword: () => null,
}

/**
 * Creates a context for the PasswordSettingsProvider.
 */
const PasswordProviderContext =
  createContext<PasswordProviderState>(initialState)

/**
 * Provides password settings to its children components.
 *
 * @param {PasswordProviderProps} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @param {PasswordProps} props.defaultPasswordSettings - The default password settings.
 * @returns {JSX.Element} The rendered component.
 */
export function PasswordProvider({
  children,
  defaultPasswordState = initialState,
}: PasswordProviderProps) {
  const [numOfCharacters, setNumOfCharacters] = useState<number>(
    defaultPasswordState.numOfCharacters
  )
  const [allowUppercase, setAllowUppercase] = useState<boolean>(
    defaultPasswordState.allowUppercase
  )
  const [allowNumbers, setAllowNumbers] = useState<boolean>(
    defaultPasswordState.allowNumbers
  )
  const [allowSymbols, setAllowSymbols] = useState<boolean>(
    defaultPasswordState.allowSymbols
  )
  const [useStandardCharacters, setUseStandardCharacters] = useState<boolean>(
    defaultPasswordState.useStandardCharacters
  )
  const [nonSequential, setNonSequential] = useState<boolean>(
    defaultPasswordState.nonSequential
  )
  const [noMoreThan, setNoMoreThan] = useState<number>(
    defaultPasswordState.noMoreThan
  )
  const [password, setPassword] = useState<string>(
    defaultPasswordState.password
  )

  const value: PasswordProviderState = {
    // ...defaultPasswordState,
    numOfCharacters,
    setNumOfCharacters,
    allowUppercase,
    setAllowUppercase,
    allowNumbers,
    setAllowNumbers,
    allowSymbols,
    setAllowSymbols,
    useStandardCharacters,
    setUseStandardCharacters,
    nonSequential,
    setNonSequential,
    noMoreThan,
    setNoMoreThan,
    password,
    setPassword,
  }

  return (
    <PasswordProviderContext.Provider value={value}>
      {children}
    </PasswordProviderContext.Provider>
  )
}

/**
 * Custom hook that provides access to the password settings context.
 * Throws an error if used outside of a PasswordSettingsProvider.
 *
 * @returns The password settings context.
 * @throws Error if used outside of a PasswordSettingsProvider.
 */
export function usePassword() {
  const context = useContext(PasswordProviderContext)

  if (!context) {
    throw new Error(
      'usePasswordSettings must be used within a PasswordSettingsProvider'
    )
  }

  return context
}
