import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { Navigation } from "../MenuItem/MenuItem";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav = ({ isOpen, onClose }: Props) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left">
      <DrawerOverlay />

      <DrawerContent bg="brand_blue.300">
        <DrawerCloseButton color="white"/>
        <DrawerHeader
          color="white"
          fontSize="24"
          fontWeight="bold"
        >
          ProteinAnalyzer
        </DrawerHeader>

        <DrawerBody>
          <Navigation />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNav;
