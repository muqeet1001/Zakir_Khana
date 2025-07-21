import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="h-9 w-9 rounded-full bg-transparent hover:bg-primary/20 dark:hover:bg-accent/20 transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4 text-gray-700 hover:text-primary transition-colors duration-300" />
      ) : (
        <Sun className="h-4 w-4 text-orange-300 hover:text-accent transition-colors duration-300" />
      )}
    </Button>
  );
}