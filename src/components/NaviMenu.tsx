import React from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,

} from "@/components/ui/navigation-menu"
import { Link } from 'react-router'


export default function NaviMenu() {


  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Search</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink></NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            {/* <NavigationMenuTrigger>
            </NavigationMenuTrigger> */}
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link to="/words">
                My Words
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            {/* <NavigationMenuTrigger>
            </NavigationMenuTrigger> */}
            <NavigationMenuContent>
              <NavigationMenuLink asChild>
                <Link to="/wordbooks">
                  My WordBooks
                </Link>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            {/* <NavigationMenuTrigger>
            </NavigationMenuTrigger> */}
            <NavigationMenuContent>
              <NavigationMenuLink asChild>
                <Link to="/history">
                  Search History
                </Link>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>

    </>
  )
}
