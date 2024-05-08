import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import { CopyIcon } from '@radix-ui/react-icons'
import { Provider } from '@/components/providers'
import { Typography } from '@/components/Typography'
import { AppHeader } from '@/components/app-header'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { generatePassword } from '@/lib/generation'

function App() {
  const [isAlphanumeric, setIsAlphanumeric] = useState(true)
  const [isNumeric, setIsNumeric] = useState(false)
  const [numOfCharacters, setNumOfCharacters] = useState(12)
  const [uppercase, setUppercase] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(true)
  const [nonSequential, setNonSequential] = useState(false)
  const [noMoreThan, setNoMoreThan] = useState(0)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const handlePasswordGeneration = () => {
    setCopied(false)
    if (numOfCharacters === 0) return

    if (isAlphanumeric) {
      const p = generatePassword(numOfCharacters, uppercase, numbers, symbols)

      setPassword(p)
    }

    if (isNumeric) {
      const p = generatePassword(
        numOfCharacters,
        uppercase,
        numbers,
        symbols,
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

  const passwordTypeChange = (e: string) => {
    switch (e) {
      case 'isAlphanumeric':
        setIsNumeric(false)
        setNumbers(true)
        setUppercase(true)
        setSymbols(true)
        setIsAlphanumeric(true)
        break
      case 'isNumberOnly':
        setIsAlphanumeric(false)
        setNumbers(true)
        setUppercase(false)
        setSymbols(false)
        setIsNumeric(true)
        break
    }
  }

  return (
    <Provider.Theme
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <AppHeader />
      <main className='flex flex-col justify-center items-center min-h-screen antialiased gap-1 font-sans'>
        <Typography.H1>Generate your Password</Typography.H1>
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
                    checked={uppercase}
                    onCheckedChange={(e) => setUppercase(!uppercase)}
                  />
                  <Label className='text-xl' htmlFor='numbers'>
                    Include Numbers
                  </Label>
                  <Checkbox
                    id='numbers'
                    checked={numbers}
                    onCheckedChange={(e) => setNumbers(!numbers)}
                  />
                  <Label className='text-xl' htmlFor='symbols'>
                    Include Symbols
                  </Label>
                  <Checkbox
                    id='symbols'
                    checked={symbols}
                    onCheckedChange={(e) => setSymbols(!symbols)}
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
                    <CopyIcon />
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
      </main>
    </Provider.Theme>
  )
}

const domNode = document.getElementById('app')

const root = createRoot(domNode, {})

root.render(<App />)
