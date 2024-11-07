import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Slider } from './ui/slider'
import { CopyIcon } from 'lucide-react'
import { Typography } from './Typography'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { useEffect, useState } from 'react'
import { generatePassword } from '@/lib/generation'
import { useStandardCharacters } from './providers/standard-characters-provider'

export function Generator() {
  const { standardCharacters } = useStandardCharacters()

  const [numOfCharacters, setNumOfCharacters] = useState(16)
  const [allowUppercase, setAllowUppercase] = useState(true)
  const [allowNumbers, setAllowNumbers] = useState(true)
  const [allowSymbols, setAllowSymbols] = useState(true)
  const [password, setPassword] = useState('')
  const [noMoreThan, setNoMoreThan] = useState(2)
  const [nonSequential, setNonSequential] = useState(false)
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
        standardCharacters,
      )

      setPassword(p)
    }

    if (isNumeric) {
      const p = generatePassword(
        numOfCharacters,
        allowUppercase,
        allowNumbers,
        allowSymbols,
        standardCharacters,
        isNumeric,
        noMoreThan,
        nonSequential,
      )

      setPassword(p)
    }
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'n' && (e.metaKey || e.ctrlKey)) {
      handlePasswordGeneration()
    }

    if (e.key === 'c' && (e.metaKey || e.ctrlKey)) {
      if (password !== null || password.length > 0) handleCopy()
    }
  })

  const handleCopy = () => {
    navigator.clipboard.writeText(password).then(() => setCopied(true))
  }

  return (
    <section className='flex min-w-full flex-col items-center justify-center gap-2'>
      <Typography.H1>Generate your Password</Typography.H1>
      <Card className='mx-8 my-2 w-1/3 min-w-[512px]'>
        <CardContent>
          <div className='mt-2 flex flex-col items-center justify-center space-y-2 text-center'>
            <Typography.P>
              Generate a secure password with the options below.
            </Typography.P>
            <RadioGroup
              defaultValue='isAlphanumeric'
              onValueChange={(e) => passwordTypeChange(e)}
              className='w-full items-center rounded-lg border border-border p-2'
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
          <div className='grid grid-cols-[auto_auto] items-center gap-2 px-4 py-2'>
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
            <div className='col-span-2 mt-2 flex flex-col'>
              <Button
                className='text-xl'
                size='lg'
                onClick={handlePasswordGeneration}
              >
                Generate Password
              </Button>
            </div>
          </div>
          <div className='overflow-none col-span-2 flex flex-wrap items-center justify-center gap-2 text-wrap py-2 text-center'>
            {password && (
              <>
                <Typography.P className='overflow-none text-wrap'>
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
    </section>
  )
}
