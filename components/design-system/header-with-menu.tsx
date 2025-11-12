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
    <div className="sticky top-0 z-50 w-full bg-slate-50/80 dark:bg-slate-950/80 border-b border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm">
      <div className="max-w-sm md:max-w-3xl lg:max-w-4xl mx-auto px-4 py-2">
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

          <NavbarContent className="hidden sm:flex gap-6" justify="center">
            {menuItems.map((menu) => {
              const path = `/${menu.toLowerCase()}`;
              const isActive = current === path;
              return (
                <NavbarItem key={path} isActive={isActive}>
                  <Link 
                    href={path}
                    className={`text-base font-medium transition-colors duration-200 ${
                      isActive 
                        ? "text-brand dark:text-brand" 
                        : "text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand"
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

        <NavbarMenu className="pt-4">
          {menuItems.map((item, index) => {
            const path = `/${item.toLowerCase()}`;
            const isActive = path === current;
            return (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  href={path}
                  className={`w-full text-base font-medium py-2 transition-colors duration-200 ${
                    isActive
                      ? "text-brand dark:text-brand"
                      : "text-slate-700 dark:text-slate-300"
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
    </div>
  );
}

export { HeaderWithMenu };
