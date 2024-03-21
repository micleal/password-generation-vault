import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { generatePassword } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import { CopyIcon } from '@radix-ui/react-icons'
import { Provider } from '@/components/providers'
import { Typography } from '@/components/Typography'
import { AppHeader } from '@/components/app-header'

function App() {
  const [numOfCharacters, setNumOfCharacters] = useState(10)
  const [uppercase, setUppercase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const handlePasswordGeneration = () => {
    setCopied(false)
    if (numOfCharacters === 0) return

    const p = generatePassword(numOfCharacters, uppercase, numbers, symbols)

    setPassword(p)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(password).then(() => setCopied(true))
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
            <div className='grid-cols-[auto_auto] gap-2 grid px-4 py-2'>
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
