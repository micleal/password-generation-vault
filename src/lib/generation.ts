const LOWERCASE_CHARACTER_CODES = arrayFromLowToHigh(97, 122)

const UPPERCASE_CHARACTER_CODES = arrayFromLowToHigh(65, 90)

const NUMBERS_CHARACTERS_CODES = arrayFromLowToHigh(48, 57)

const SYMBOL_CHARACTERS_CODES = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126))

const STANDARD_SYMBOL_CHARACTERS_CODES = [33, 35, 37, 43, 58, 61, 63, 64]

/**
 * Generates a random password with the specified number of characters and optional constraints.
 *
 * @param numOfCharacters - The number of characters in the generated password.
 * @param useUpperCase - Whether to include uppercase letters in the password. Defaults to `false`.
 * @param useNumbers - Whether to include numbers in the password. Defaults to `true`.
 * @param useSpecialCharacters - Whether to include special characters in the password. Defaults to `false`.
 * @param onlyNumbers - Whether to generate a password consisting only of numbers. Defaults to `false`.
 * @param noMoreThan - The maximum number of consecutive occurrences of the same character allowed in the password. Defaults to `undefined`.
 * @param nonSequential - Whether to generate a password without any sequential numbers. Defaults to `false`.
 * @returns The generated password.
 */
export function generatePassword(
  numOfCharacters: number,
  useUpperCase?: boolean,
  useNumbers?: boolean,
  useSpecialCharacters?: boolean,
  useStandardSpecialCharacters?: boolean,
  onlyNumbers?: boolean,
  noMoreThan?: number,
  nonSequential?: boolean
): string {
  let charCodes = LOWERCASE_CHARACTER_CODES

  if (onlyNumbers) {
    charCodes = []
    charCodes = charCodes.concat(NUMBERS_CHARACTERS_CODES)
  } else {
    if (useUpperCase) charCodes = charCodes.concat(UPPERCASE_CHARACTER_CODES)

    if (useNumbers) charCodes = charCodes.concat(NUMBERS_CHARACTERS_CODES)

    if (useSpecialCharacters) {
      if (useStandardSpecialCharacters)
        charCodes = charCodes.concat(STANDARD_SYMBOL_CHARACTERS_CODES)
      else charCodes = charCodes.concat(SYMBOL_CHARACTERS_CODES)
    }
  }

  const passwordCharacters = (): string[] => {
    let characters = []

    for (let i = 0; i < numOfCharacters; i++) {
      const characterCode =
        charCodes[Math.floor(Math.random() * charCodes.length)]
      characters.push(String.fromCharCode(characterCode))
    }

    return characters
  }

  return passwordCharacters().join('')
}

function arrayFromLowToHigh(low: number, high: number) {
  const array: number[] = []
  for (let i = low; i <= high; i++) array.push(i)

  return array
}
