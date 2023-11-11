/* Libraries / Packages */
import { SlOptions } from "react-icons/sl";
import { IconType } from "react-icons";
import { BsFolderFill } from "react-icons/bs";

/* Chakra UI */
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";

interface CardMenuProps {
  menuItems: {
    key: string;
    menuTitle: string;
    MenuIcon: IconType;
    action: (event: React.MouseEvent) => void;
  }[]
}

const CardMenu = ({ menuItems }: CardMenuProps) => {
  return (
    <Menu>
      <MenuButton
        bg="white"
        rounded="full"
        padding={1}
        _hover={{
          cursor: "pointer",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <SlOptions size={20} color="#08355a" />
      </MenuButton>

      <MenuList bg="brand_blue.300">
        {menuItems.map(({ key, menuTitle, MenuIcon, action }) => (
          <MenuItem
            key={key}
            display="flex"
            bg="brand_blue.300"
            onClick={(event) => action(event)}
            _hover={{ bg: "brand_blue.100" }}
          >
            <MenuIcon size={20} />
            <Text marginLeft={3}>{menuTitle}</Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default CardMenu