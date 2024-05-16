import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from './providers/theme-provider'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <SunIcon className='h-[1.2rem] w-[1.2rem] transition-all dark:scale-0' />
          <MoonIcon className='absolute h-[1.2rem] w-[1.2rem] transition-all rotate-100 scale-0 dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          className={cn(theme === 'light' ? 'text-primary' : 'text-foreground')}
          onClick={() => setTheme('light')}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(theme === 'dark' ? 'text-primary' : 'text-foreground')}
          onClick={() => setTheme('dark')}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(
            theme === 'system' ? 'text-primary' : 'text-foreground'
          )}
          onClick={() => setTheme('system')}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
