import { ThemeProvider } from "../components/provider/theme-provider";
import { cn } from "../lib/utils";
import { ModalProvider } from "../components/provider/modal-provider";
import { Mobile } from "../components/mobile";

export default function DefaultLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return(
        <body className={cn(
            "  h-screen dark:bg-neutral-900 "
            )}>
            <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={true}
            storageKey="discord-theme"
            >
              <ModalProvider/>
              <Mobile/>
            {children}
            </ThemeProvider>
            
             
            </body>
    )
}