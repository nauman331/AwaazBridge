import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

const Toaster = ({ ...props }: React.ComponentProps<typeof Sonner>) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as React.ComponentProps<typeof Sonner>["theme"]}
      className="toaster group"
      {...props}
    />
  )
}

export { Toaster }
