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
            <Link to="/mypage/userwords">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                My Words
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>My WordBooks</NavigationMenuTrigger>
            {/* <NavigationMenuContent>
              <NavigationMenuLink></NavigationMenuLink>
            </NavigationMenuContent> */}
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Search History</NavigationMenuTrigger>
            {/* <NavigationMenuContent>
              <NavigationMenuLink></NavigationMenuLink>
            </NavigationMenuContent> */}
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>

    </>
  )
}
