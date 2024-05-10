import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { CopyIcon } from 'lucide-react'
import { Provider } from '@/components/providers'
import { Typography } from '@/components/Typography'
import { AppHeader } from '@/components/app-header'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { generatePassword } from '@/lib/generation'
import { Generator } from '@/components/generator'

function PasswordGenerator() {
  return (
    <Provider.Theme>
      <Provider.Password>
        <App />
      </Provider.Password>
    </Provider.Theme>
  )
}

function App() {
  return (
    <>
      <AppHeader />
      <main className='flex flex-col justify-center items-center min-h-screen antialiased gap-1 font-sans'>
        <Typography.H1>Generate your Password</Typography.H1>
        <Generator />
      </main>
    </>
  )
}

const domNode = document.getElementById('app')

const root = createRoot(domNode, {})

root.render(<PasswordGenerator />)
