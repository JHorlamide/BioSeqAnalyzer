import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { SlOptions } from "react-icons/sl";
import { BiEditAlt } from "react-icons/bi";
import { GrOverview } from "react-icons/gr";
import { RiSurroundSoundLine } from "react-icons/ri";
import { MdOutlineDeleteOutline } from "react-icons/md";
import useNavigation from "../../../../hooks/useNavigation";
import { APP_PREFIX_PATH } from "../../../../config/AppConfig";

interface Props {
  projectId: string;
  onOpen: () => void;
}

const CardMenu = ({ projectId, onOpen }: Props) => {
  const { handleNavigate } = useNavigation();

  const menuItems = [
    {
      menuTitle: "Edit details",
      MenuIcon: BiEditAlt,
      action: handleNavigate(`${APP_PREFIX_PATH}/project/update/${projectId}`)
    },

    {
      menuTitle: "Project Overview",
      MenuIcon: GrOverview,
      action: handleNavigate(`${APP_PREFIX_PATH}/project/overview/${projectId}`)
    },

    {
      menuTitle: "Project Rounds",
      MenuIcon: RiSurroundSoundLine,
      action: handleNavigate(`${APP_PREFIX_PATH}/project/rounds/${projectId}`)
    },

    {
      menuTitle: "Delete Project",
      MenuIcon: MdOutlineDeleteOutline,
      action: onOpen
    },
  ]
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
        <SlOptions size={20} color="black" />
      </MenuButton>

      <MenuList>
        {menuItems.map((menuItem) => (
          <MenuItem display="flex" onClick={() => menuItem.action}>
            <menuItem.MenuIcon size={20} />
            <Text marginLeft={3}>{menuItem.menuTitle}</Text>
          </MenuItem>
        ))}

        {/* <MenuItem display="flex" onClick={() => handleNavigate(`${APP_PREFIX_PATH}/project/update/${projectId}`)}>
        <BiEditAlt size={20} />
        <Text marginLeft={3}>Edit details</Text>
      </MenuItem>

      <MenuItem display="flex" onClick={() => handleNavigate(`${APP_PREFIX_PATH}/project/overview/${projectId}`)}>
        <GrOverview size={20} />
        <Text marginLeft={3}>Overview</Text>
      </MenuItem>

      <MenuItem display="flex" onClick={() => handleNavigate(`${APP_PREFIX_PATH}/project/rounds/${projectId}`)}>
        <RiSurroundSoundLine size={20} />
        <Text marginLeft={3}>Rounds</Text>
      </MenuItem>

      <MenuItem display="flex" onClick={onOpen}>
        <MdOutlineDeleteOutline size={20} />
        <Text marginLeft={3}>Delete project</Text>
      </MenuItem> */}
      </MenuList>
    </Menu>
  )
}

export default CardMenu