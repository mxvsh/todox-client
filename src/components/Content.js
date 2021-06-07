import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useRef } from "react";
import moment from "moment";

export default ({ list, onItemAdd }) => {
  const modal = useDisclosure();
  const input = useRef(null);

  return (
    <Box ml={4}>
      <Heading>{list.title}</Heading>

      <Stack mt={4} spacing={2}>
        {Object.keys(list.items).map((key, index) => {
          const item = list.items[key];
          return (
            <Box d="flex">
              {index + 1}.
              <Box ml={2}>
                <Text fontWeight="bold" size="sm">
                  {item.value}
                </Text>
                <Text>Added on {moment(key).format("LLL")}</Text>
              </Box>
            </Box>
          );
        })}
      </Stack>

      <Button size="sm" colorScheme="green" mt={12} onClick={modal.onOpen}>
        New Item
      </Button>

      <Modal isOpen={modal.isOpen} onClose={modal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input ref={input} placeholder="New Item" />
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                onItemAdd(input.current.value);
              }}
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
