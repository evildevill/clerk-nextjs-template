"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import LoadingBar from "react-top-loading-bar"
import { Menu, Moon, Sun, LogIn, LogOut, ChevronRight } from "lucide-react"
import { 
  useUser,
  useClerk,
  SignInButton,
  SignOutButton,
  UserButton
} from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const { user, isSignedIn, isLoaded } = useUser()
  const { signOut } = useClerk()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle route change for loading bar
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    setProgress(30)

    setTimeout(() => {
      setProgress(70)
    }, 100);

    setTimeout(() => {
      setProgress(100)
    }, 500);
  }, [pathname])

  useEffect(() => {
    setTimeout(() => {
      setProgress(0)
    }, 700);
  }, [])

  // Determine if a link should be prefetched
  const shouldPrefetch = (path: string) => {
    // Only prefetch if not the current page and not in a loading state
    return pathname !== path && !isLoaded
  }

  return (
    <>
      <LoadingBar color="#3b82f6" progress={progress} onLoaderFinished={() => setProgress(0)} />
      <header
        className={`fixed top-0 z-50 w-full dark:bg-slate-950/50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm dark:bg-slate-950/90" : "bg-transparent"
          }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" prefetch={shouldPrefetch("/")}>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r  overflow-hidden">
              <Image
                src="/logo.png"
                alt="Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">Waseem Akram</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-6">
            <NavLink href="/" label="Home" currentPath={pathname} prefetch={shouldPrefetch("/")} />
            <NavLink href="/about" label="About" currentPath={pathname} prefetch={shouldPrefetch("/about")} />
            <NavLink href="/resume" label="Resume" currentPath={pathname} prefetch={shouldPrefetch("/resume")} />
            <NavLink href="/blog" label="Blog" currentPath={pathname} prefetch={shouldPrefetch("/blog")} />
            <NavLink href="/contact" label="Contact" currentPath={pathname} prefetch={shouldPrefetch("/contact")} />
            <NavLink href="/store" label="Store" currentPath={pathname} prefetch={shouldPrefetch("/store")} />

            {isSignedIn && (
              <NavLink
                href="/dashboard"
                label="Dashboard"
                currentPath={pathname}
                prefetch={shouldPrefetch("/dashboard")}
              />
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="rounded-full"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {!isLoaded ? (
              <div className="h-9 w-24 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
            ) : isSignedIn ? (
              <div className="flex items-center gap-3">
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "h-8 w-8",
                      userButtonPopoverCard: "dark:bg-slate-900 dark:border-slate-800"
                    }
                  }}
                />
                <Button variant="outline" size="sm" className="gap-2" onClick={() => signOut()}>
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <SignInButton mode="modal">
                <Button size="sm" className="gap-2 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-500">
                  <LogIn className="h-4 w-4" />
                  <span>Sign Up</span>
                </Button>
              </SignInButton>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="rounded-full"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="fixed bottom-0 left-0 right-0 max-h-[85vh] rounded-t-xl">
                <DrawerHeader>
                  <DrawerTitle className="text-center text-xl"></DrawerTitle>
                  <DrawerDescription className="text-center"></DrawerDescription>
                </DrawerHeader>

                <div className="grid gap-1 px-4">
                  <MobileNavLink href="/" label="Home" currentPath={pathname} onClick={() => setIsDrawerOpen(false)} />
                  <MobileNavLink
                    href="/about"
                    label="About"
                    currentPath={pathname}
                    onClick={() => setIsDrawerOpen(false)}
                  />
                  <MobileNavLink
                    href="/resume"
                    label="Resume"
                    currentPath={pathname}
                    onClick={() => setIsDrawerOpen(false)}
                  />
                  <MobileNavLink
                    href="/blog"
                    label="Blog"
                    currentPath={pathname}
                    onClick={() => setIsDrawerOpen(false)}
                  />
                  <MobileNavLink
                    href="/contact"
                    label="Contact"
                    currentPath={pathname}
                    onClick={() => setIsDrawerOpen(false)}
                  />
                  <MobileNavLink
                    href="/store"
                    label="Store"
                    currentPath={pathname}
                    onClick={() => setIsDrawerOpen(false)}
                  />

                  {isSignedIn && (
                    <MobileNavLink
                      href="/dashboard"
                      label="Dashboard"
                      currentPath={pathname}
                      onClick={() => setIsDrawerOpen(false)}
                    />
                  )}
                </div>

                <DrawerFooter className="mt-2">
                  {!isLoaded ? (
                    <div className="h-10 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                  ) : isSignedIn ? (
                    <div className="grid gap-3">
                      <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 dark:border-slate-800">
                        <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-700">
                          <AvatarImage src={user?.imageUrl} alt={user?.firstName || "User"} />
                          <AvatarFallback>
                            {(user?.firstName?.charAt(0)) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 truncate">
                          <p className="text-sm font-medium">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                            {user?.primaryEmailAddress?.emailAddress}
                          </p>
                        </div>
                      </div>
                      <Button className="w-full gap-2" onClick={() => signOut()}>
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </Button>
                    </div>
                  ) : (
                    <SignInButton mode="modal">
                      <Button className="w-full gap-2 bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500">
                        <LogIn className="h-4 w-4" />
                        <span>Sign Up</span>
                      </Button>
                    </SignInButton>
                  )}
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from being hidden under the navbar */}
      <div className="h-16" />
    </>
  )
}

// Desktop navigation link
function NavLink({
  href,
  label,
  currentPath,
  prefetch = false,
}: {
  href: string
  label: string
  currentPath: string
  prefetch?: boolean
}) {
  const isActive = currentPath === href

  return (
    <Link
      href={href}
      prefetch={prefetch}
      className={`relative px-1 py-2 text-sm font-medium transition-colors ${isActive
        ? "text-blue-600 dark:text-blue-400"
        : "text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
        }`}
    >
      {label}
      {isActive && <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-blue-600 dark:bg-blue-400" />}
    </Link>
  )
}

// Mobile navigation link
function MobileNavLink({
  href,
  label,
  currentPath,
  onClick,
}: {
  href: string
  label: string
  currentPath: string
  onClick: () => void
}) {
  const isActive = currentPath === href

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center justify-between rounded-lg p-3 text-sm font-medium transition-colors ${isActive
        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
        : "hover:bg-slate-100 dark:hover:bg-slate-800"
        }`}
    >
      <span>{label}</span>
      <ChevronRight className="h-4 w-4" />
      {isActive && (
        <Badge className="ml-auto mr-2 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">Active</Badge>
      )}
    </Link>
  )
}