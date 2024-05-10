import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Slider } from './ui/slider'
import { CopyIcon } from 'lucide-react'
import { Typography } from './Typography'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Input } from './ui/input'
import { useState } from 'react'
import { generatePassword } from '@/lib/generation'
import { usePassword } from './providers/password-provider'

export function Generator() {
  const {
    numOfCharacters,
    setNumOfCharacters,
    allowUppercase,
    setAllowUppercase,
    allowNumbers,
    setAllowNumbers,
    allowSymbols,
    setAllowSymbols,
    useStandardCharacters,
    noMoreThan,
    setNoMoreThan,
    nonSequential,
    setNonSequential,
    password,
    setPassword,
  } = usePassword()

  const [isAlphanumeric, setIsAlphanumeric] = useState(true)
  const [isNumeric, setIsNumeric] = useState(false)
  const [copied, setCopied] = useState(false)

  const passwordTypeChange = (e: string) => {
    switch (e) {
      case 'isAlphanumeric':
        setIsNumeric(false)
        setAllowUppercase(true)
        setAllowNumbers(true)
        setAllowSymbols(true)
        setIsAlphanumeric(true)
        break
      case 'isNumberOnly':
        setIsAlphanumeric(false)
        setAllowNumbers(true)
        setAllowUppercase(false)
        setAllowSymbols(false)
        setIsNumeric(true)
        break
    }
  }

  const handlePasswordGeneration = () => {
    setCopied(false)
    if (numOfCharacters === 0) return

    if (isAlphanumeric) {
      const p = generatePassword(
        numOfCharacters,
        allowUppercase,
        allowNumbers,
        allowSymbols,
        useStandardCharacters
      )

      setPassword(p)
    }

    if (isNumeric) {
      const p = generatePassword(
        numOfCharacters,
        allowUppercase,
        allowNumbers,
        allowSymbols,
        useStandardCharacters,
        isNumeric,
        noMoreThan,
        nonSequential
      )

      setPassword(p)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(password).then(() => setCopied(true))
  }

  return (
    <>
      <Card className='mx-8 my-2 w-1/3 min-w-[456px]'>
        <CardContent>
          <div className='mt-2 flex justify-center space-y-2 items-center flex-col text-center'>
            <Typography.P>
              Generate a secure password with the options below.
            </Typography.P>
            <RadioGroup
              defaultValue='isAlphanumeric'
              onValueChange={(e) => passwordTypeChange(e)}
              className='border rounded-lg border-border w-full items-center p-2'
            >
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='isAlphanumeric' id='is-alphanumeric' />
                <Label htmlFor='is-alphanumeric'>Alphanumeric</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='isNumberOnly' id='is-numeric' />
                <Label htmlFor='is-numeric'>Numeric</Label>
              </div>
            </RadioGroup>
          </div>
          <div className='grid-cols-[auto_auto] items-center gap-2 grid px-4 py-2'>
            <Label className='text-xl'>Number of Characters</Label>
            <div className='flex gap-2'>
              <Slider
                min={1}
                max={50}
                step={1}
                value={[numOfCharacters]}
                onValueChange={(e) => setNumOfCharacters(e.pop())}
              />
              <Input
                className='text-center text-lg'
                type='number'
                min={1}
                max={50}
                value={numOfCharacters}
                onChange={(e) => setNumOfCharacters(e.target.valueAsNumber)}
              />
            </div>
            {isAlphanumeric && (
              <>
                <Label className='text-xl' htmlFor='uppercase'>
                  Include Uppercase
                </Label>
                <Checkbox
                  id='uppercase'
                  checked={allowUppercase}
                  onCheckedChange={(e) => setAllowUppercase(!allowUppercase)}
                />
                <Label className='text-xl' htmlFor='numbers'>
                  Include Numbers
                </Label>
                <Checkbox
                  id='numbers'
                  checked={allowNumbers}
                  onCheckedChange={(e) => setAllowNumbers(!allowNumbers)}
                />
                <Label className='text-xl' htmlFor='symbols'>
                  Include Symbols
                </Label>
                <Checkbox
                  id='symbols'
                  checked={allowSymbols}
                  onCheckedChange={(e) => setAllowSymbols(!allowSymbols)}
                />
              </>
            )}
            {isNumeric && (
              <>
                <Label className='text-xl' htmlFor='non-sequential'>
                  Non-sequential numbers
                </Label>
                <Checkbox
                  id='non-sequential'
                  checked={nonSequential}
                  onCheckedChange={(e) => setNonSequential(!nonSequential)}
                />
                <Label className='text-xl' htmlFor='no-more-than'>
                  No more than (n) of the same character
                </Label>
                <div className='flex gap-2'>
                  <Slider
                    min={0}
                    max={numOfCharacters - 1}
                    step={1}
                    value={[noMoreThan]}
                    onValueChange={(e) => setNoMoreThan(e.pop())}
                  />
                  <Input
                    className='text-center text-lg'
                    type='number'
                    min={0}
                    max={numOfCharacters - 1}
                    value={noMoreThan}
                    onChange={(e) => setNoMoreThan(e.target.valueAsNumber)}
                  />
                </div>
              </>
            )}
            <div className='flex flex-col col-span-2 mt-2'>
              <Button
                className='text-xl'
                size='lg'
                onClick={handlePasswordGeneration}
              >
                Generate Password
              </Button>
            </div>
          </div>
          <div className='py-2 text-center col-span-2 text-wrap overflow-none flex-wrap flex gap-2 items-center justify-center'>
            {password && (
              <>
                <Typography.P className='text-wrap overflow-none'>
                  {password}
                </Typography.P>
                <Button size='icon' onClick={handleCopy}>
                  <CopyIcon className='h-[1.2rem] w-[1.2rem]' />
                </Button>
              </>
            )}
          </div>
          {copied && (
            <Typography.Blockquote>
              Copied to the Clipboard!
            </Typography.Blockquote>
          )}
        </CardContent>
      </Card>
    </>
  )
}
