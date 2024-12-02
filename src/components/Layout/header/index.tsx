import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";
import { useUser } from "@/context/UserContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@iconify/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import UseLogout from "@/hooks/useLogout";
import DialogEditProfile from "./components/DialogEditProfile";
import Image from "next/image";

export default function Header() {
  const { user, loading, error } = useUser();

  const { isLoading, handleLogout } = UseLogout();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="backdrop-blur-sm fixed w-full flex bg-[#4393F5] bg-opacity-10 flex-row justify-between items-center  lg:px-[2vw] z-50">
      <div className="container mx-auto px-6">
        <header className="flex h-20 w-full items-center justify-between">
          {/* Mobile Menu (Sheet) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="sky" size="icon" className="lg:hidden">
                <Menu color="black" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" prefetch={false} className="flex">
                    <Image
                      src="/logo.webp"
                      alt="Logo"
                      width={160}
                      height={30}
                      priority
                    />
                  </Link>
                </SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>

              <div className="grid gap-2 py-6">
                <Link
                  href="/"
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  prefetch={false}
                >
                  Home
                </Link>
                <Link
                  href="/activity"
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  prefetch={false}
                >
                  Activity
                </Link>
                <Link
                  href="/contact-us"
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  prefetch={false}
                >
                  Contact Us
                </Link>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="mr-6 hidden lg:flex" prefetch={false}>
            <Image
              src="/logo.webp"
              alt="Logo"
              width={160}
              height={40}
              priority
            />
          </Link>

          {/* Navigation Menu - Centered */}
          <NavigationMenu className="hidden lg:flex mx-auto">
            <NavigationMenuList className="flex justify-center">
              <NavigationMenuLink asChild>
                <Link
                  href="/"
                  className="group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm font-semibold transition-all hover:border-b-2 hover:border-black focus:border-b-2 focus:border-black dark:hover:border-white dark:focus:border-white outline-none"
                  prefetch={false}
                >
                  Home
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link
                  href="/activity"
                  className="group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm font-semibold transition-all hover:border-b-2 hover:border-black focus:border-b-2 focus:border-black dark:hover:border-white dark:focus:border-white outline-none"
                  prefetch={false}
                >
                  Activity
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link
                  href="/contact-us"
                  className="group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm font-semibold transition-all hover:border-b-2 hover:border-black focus:border-b-2 focus:border-black dark:hover:border-white dark:focus:border-white outline-none"
                  prefetch={false}
                >
                  Contact Us
                </Link>
              </NavigationMenuLink>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Auth Buttons */}
          <div className="flex">
            {loading && <div></div>}
            {error && <div>Error: {error}</div>}

            {!user ? (
              <div className="flex items-end space-x-4">
                <Link href="/login">
                  <Button variant="sky" size="sky">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="outlineSecondary" size="sky">
                    Register
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/user/cart" className="pr-4">
                  <Icon icon="mdi:cart-outline" fontSize={28} />
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="flex justify-center items-center gap-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.profilePictureUrl} alt="#" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <h1 className="font-semibold">{user.name}</h1>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setDialogOpen(true)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/user/transaksi">Transaksi</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsAlertOpen(true)}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DialogEditProfile
                  isOpen={isDialogOpen}
                  onOpenChange={setDialogOpen}
                />
                <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmation Logout</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to log out of your account?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel disabled={isLoading}>
                        Batal
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleLogout}
                        disabled={isLoading}
                        className={
                          isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }
                      >
                        {isLoading ? "Logging out..." : "Logout"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>
        </header>
      </div>
    </div>
  );
}
