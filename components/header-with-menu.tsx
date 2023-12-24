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
} from "@nextui-org/react";
import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { usePathname } from "next/navigation";

function HeaderWithMenu() {
  const current = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["Posts", "Tutorials", "Books", "Courses"];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className={`bg-transparent`}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className={`hidden md:block`}>
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((menu) => {
          const path = `/${menu.toLowerCase()}`;
          const isActive = current === path;
          return (
            <NavbarItem key={path} isActive={isActive}>
              <Link color={!isActive ? "foreground" : undefined} href={path}>
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

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                `/${item.toLowerCase()}` === current ? "primary" : "foreground"
              }
              className="w-full"
              href={`/${item.toLowerCase()}`}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export { HeaderWithMenu };
