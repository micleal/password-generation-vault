import { createRoot } from 'react-dom/client'
import './globals.css'
import { Button } from '@/components/ui/button'
import { CircleHelpIcon } from 'lucide-react'
import { Provider } from '@/components/providers'
import { Typography } from '@/components/Typography'
import { AppHeader } from '@/components/app-header'
import { Generator } from '@/components/generator'
import { Menu } from '@/components/menu'
import { ThemeToggle } from '@/components/theme-toggle'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import pkg from '../../package.json'

const { version } = pkg

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
      <div className='flex-1 grid grid-rows-[40px_1fr_40px] items-center antialiased gap-1 font-sans'>
        <div className='flex flex-0 min-w-full justify-between h-10 p-2'>
          <Menu.Settings />
          <ThemeToggle />
        </div>
        <Generator />
        <div className='flex justify-between p-2 py-4 mb-2'>
          <Button variant='outline' size='icon' asChild>
            <a
              href='https://github.com/micleal/password-generation-vault'
              target='_blank'
            >
              <GitHubLogoIcon className='h-[1.2rem] w-[1.2rem]' />
              <span className='sr-only'>Project GitHub</span>
            </a>
          </Button>
          <div className='flex justify-center items-center text-primary font-semibold'>
            <Typography.P>v{version}</Typography.P>
          </div>
          <Button variant='outline' size='icon' asChild>
            <a href='https://micleal.dev' target='_blank'>
              <CircleHelpIcon className='h-[1.2rem] w-[1.2rem]' />
            </a>
          </Button>
        </div>
      </div>
    </>
  )
}

const domNode = document.getElementById('app')

const root = createRoot(domNode, {})

root.render(<PasswordGenerator />)
