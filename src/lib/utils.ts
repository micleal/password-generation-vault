import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const LOWERCASE_CHARACTER_CODES = arrayFromLowToHigh(97, 122)

const UPPERCASE_CHARACTER_CODES = arrayFromLowToHigh(65, 90)
const NUMBERS_CHARACTERS_CODES = arrayFromLowToHigh(48, 57)

const SYMBOL_CHARACTERS_CODES = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126))

export function generatePassword(
  numOfCharacters: number,
  useUpperCase?: boolean,
  useNumbers = true,
  useSpecialCharacters?: boolean
): string {
  let charCodes = LOWERCASE_CHARACTER_CODES

  if (useUpperCase) charCodes = charCodes.concat(UPPERCASE_CHARACTER_CODES)

  if (useNumbers) charCodes = charCodes.concat(NUMBERS_CHARACTERS_CODES)

  if (useSpecialCharacters)
    charCodes = charCodes.concat(SYMBOL_CHARACTERS_CODES)

  const passwordCharacters: string[] = []
  for (let i = 0; i < numOfCharacters; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)]
    passwordCharacters.push(String.fromCharCode(characterCode))
  }

  return passwordCharacters.join('')
}

function arrayFromLowToHigh(low: number, high: number) {
  const array: number[] = []
  for (let i = low; i <= high; i++) array.push(i)

  return array
}
