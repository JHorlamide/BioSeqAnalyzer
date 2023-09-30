/* Libraries / Packages */
import { SlOptions } from "react-icons/sl";
import { BiEditAlt } from "react-icons/bi";
import { RiSurroundSoundLine } from "react-icons/ri";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IconType } from "react-icons";

/* Chakra UI */
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";

/* Application Modules / Components */
import useNavigation from "../../hooks/useNavigation";
import { APP_PREFIX_PATH } from "../../config/AppConfig";

interface CardMenuProps {
  projectId: string;
  onOpen: () => void;
}

interface MenuItem {
  key: string;
  menuTitle: string;
  MenuIcon: IconType;
  action: (event: React.MouseEvent) => void;
}

const CardMenu = ({ projectId, onOpen }: CardMenuProps) => {
  const { handleNavigate } = useNavigation();

  const navigate = (event: React.MouseEvent, path: string) => {
    event.stopPropagation();
    handleNavigate(path)
  }

  const menuItems: MenuItem[] = [
    {
      key: "invite-member",
      menuTitle: "Invite Member",
      MenuIcon: RiSurroundSoundLine, // Change the Icon to a user Icon
      action: (event) => navigate(event, `${APP_PREFIX_PATH}/invite-member/${projectId}`)
    },

    {
      key: "edit-project",
      menuTitle: "Edit Project details",
      MenuIcon: BiEditAlt,
      action: (event) => navigate(event, `${APP_PREFIX_PATH}/project/update/${projectId}`)
    },

    {
      key: "delete-project",
      menuTitle: "Delete Project",
      MenuIcon: MdOutlineDeleteOutline,
      action: (event) => {
        event.stopPropagation();
        onOpen();
      }
    },
  ];


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
            onClick={action}
            bg="brand_blue.300"
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