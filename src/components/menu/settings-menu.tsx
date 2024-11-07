import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { SettingsIcon } from 'lucide-react'
import { useStandardCharacters } from '../providers/standard-characters-provider'

export function SettingsMenu() {
  const { standardCharacters, setStandardCharacters } = useStandardCharacters()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <SettingsIcon className='h-[1.2rem] w-[1.2rem] transition-all' />
          <span className='sr-only'>Settings Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start'>
        <DropdownMenuCheckboxItem
          className={cn(
            standardCharacters === true ? 'text-primary' : 'text-foreground'
          )}
          checked={standardCharacters}
          onClick={() => setStandardCharacters(!standardCharacters)}
        >
          Standard Characters
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
