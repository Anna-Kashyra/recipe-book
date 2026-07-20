import { FC } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem, NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';

export const Header: FC = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} text-lg font-medium transition duration-300 hover:underline`}>
            <Link href={"/"}>Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} text-lg font-medium transition duration-300 hover:underline`}>
            <Link href={"/recipe"}>All Recipes</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} text-lg font-medium transition duration-300 hover:underline`}>
            <Link href={`/recommended`}>Recipe of the Day</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <a href="/recommended">
            Recipe of the Day
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}