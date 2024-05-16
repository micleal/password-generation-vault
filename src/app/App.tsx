import { createRoot } from 'react-dom/client'
import './globals.css'
import { Button } from '@/components/ui/button'
import { CopyIcon } from 'lucide-react'
import { Provider } from '@/components/providers'
import { Typography } from '@/components/Typography'
import { AppHeader } from '@/components/app-header'
import { Generator } from '@/components/generator'
import { Menu } from '@/components/menu'
import { ThemeToggle } from '@/components/theme-toggle'
import { GitHubLogoIcon } from '@radix-ui/react-icons'

function PasswordGenerator() {
  return (
    <Provider.Theme>
      <Provider.StandardCharacters>
        <App />
      </Provider.StandardCharacters>
    </Provider.Theme>
  )
}

function App() {
  return (
    <>
      <AppHeader />
      <div className='flex flex-col justify-center items-center min-h-screen antialiased gap-1 font-sans'>
        <Menu.Settings />
        <ThemeToggle />
        <Typography.H1>Generate your Password</Typography.H1>
        <Generator />
        <Button
          className='absolute bottom-2 left-2 z-50'
          variant='outline'
          size='icon'
          asChild
        >
          <a
            href='https://github.com/micleal/password-generation-vault'
            target='_blank'
          >
            <GitHubLogoIcon className='h-[1.2rem] w-[1.2rem]' />
            <span className='sr-only'>Project GitHub</span>
          </a>
        </Button>
      </div>
      <footer className='flex justify-center items-center gap-2 p-2 text-xs text-gray-400'>
        <span>Created by</span>
        <a
          href='https://micleal.dev'
          target='_blank'
          className='flex items-center gap-1'
        >
          <span>Michael Anthony Leal Costa</span>
          <CopyIcon className='h-4 w-4' />
        </a>
      </footer>
    </>
  )
}

const domNode = document.getElementById('app')

const root = createRoot(domNode, {})

root.render(<PasswordGenerator />)
