"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import { Logo } from "@/components/design-system/logo";
import { ModeToggle } from "@/components/supporting/mode-toggle";
import { usePathname } from "next/navigation";

function HeaderWithMenu() {
  const current = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["Posts", "Tutorials", "Books", "Courses"];

  return (
    <header className="sticky top-0 z-40 -mx-4 border-b border-slate-200/60 bg-slate-100/85 px-4 py-2 backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/85 sm:-mx-6 sm:px-6">
      <div className="w-full">
        <Navbar 
          onMenuOpenChange={setIsMenuOpen} 
          className="bg-transparent"
          maxWidth="full"
          height="auto"
        >
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
            />
            <NavbarBrand>
              <Logo />
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent className="hidden sm:flex gap-x-5 md:gap-x-6" justify="center">
            {menuItems.map((menu) => {
              const path = `/${menu.toLowerCase()}`;
              const isActive = current === path;
              return (
                <NavbarItem key={path} isActive={isActive}>
                  <Link 
                    href={path}
                    className={`rounded-md px-1 py-1.5 text-[0.9375rem] font-medium no-underline transition-colors duration-200 ${
                      isActive 
                        ? "text-brand" 
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                    }`}
                  >
                    {menu}
                  </Link>
                </NavbarItem>
              );
            })}
          </NavbarContent>

          <NavbarContent justify="end">
            <NavbarItem>
              <ModeToggle />
            </NavbarItem>
          </NavbarContent>

        <NavbarMenu className="border-t border-slate-200/80 pt-2 dark:border-slate-800/80">
          {menuItems.map((item, index) => {
            const path = `/${item.toLowerCase()}`;
            const isActive = path === current;
            return (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  href={path}
                  className={`w-full rounded-md px-2 py-3 text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-slate-200/80 text-brand dark:bg-slate-800/80"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/50"
                  }`}
                  size="lg"
                >
                  {item}
                </Link>
              </NavbarMenuItem>
            );
          })}
        </NavbarMenu>
        </Navbar>
      </div>
    </header>
  );
}

export { HeaderWithMenu };
