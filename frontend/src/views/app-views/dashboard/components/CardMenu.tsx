import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { SlOptions } from "react-icons/sl";
import { BiEditAlt } from "react-icons/bi";
import { TbLayout2 } from "react-icons/tb";
import { RiSurroundSoundLine } from "react-icons/ri";
import { MdOutlineDeleteOutline } from "react-icons/md";
import useNavigation from "../../../../hooks/useNavigation";
import { APP_PREFIX_PATH } from "../../../../config/AppConfig";
import { IconType } from "react-icons";

interface Props {
  projectId: string;
  onOpen: () => void;
}

interface MenuItem {
  key: string;
  menuTitle: string;
  MenuIcon: IconType;
  action: () => void;
}

const CardMenu = ({ projectId, onOpen }: Props) => {
  const { handleNavigate } = useNavigation();

  const navigate = (path: string) => {
    handleNavigate(path)
  }

  const menuItems: MenuItem[] = [
    {
      key: "project-overview",
      menuTitle: "Project Overview",
      MenuIcon: TbLayout2,
      action: () => navigate(`${APP_PREFIX_PATH}/project-overview/${projectId}`)
    },

    {
      key: "project-rounds",
      menuTitle: "Project Rounds",
      MenuIcon: RiSurroundSoundLine,
      action: () => navigate(`${APP_PREFIX_PATH}/project/rounds/${projectId}`)
    },

    {
      key: "edit-project",
      menuTitle: "Edit details",
      MenuIcon: BiEditAlt,
      action: () => navigate(`${APP_PREFIX_PATH}/project/update/${projectId}`)
    },

    {
      key: "delete-project",
      menuTitle: "Delete Project",
      MenuIcon: MdOutlineDeleteOutline,
      action: onOpen
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
            _hover={{ bg: "brand_blue.100"}}
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