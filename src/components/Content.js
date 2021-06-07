import {
  Box,
  Button,
  Checkbox,
  Heading,
  IconButton,
  Input,
  Spacer,
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
import { FiDelete, FiTrash } from "react-icons/fi";

export default ({ list, onItemAdd, onItemDelete }) => {
  const modal = useDisclosure();
  const input = useRef(null);

  return (
    <Box ml={4}>
      <Heading>{list.title}</Heading>

      <Stack mt={4} spacing={2}>
        {Object.keys(list.items).map((key, index) => {
          const item = list.items[key];
          return (
            <Box d="flex" borderWidth="1px" borderRadius="lg" p={4}>
              {index + 1}.
              <Box ml={2}>
                <Text fontWeight="bold" size="sm">
                  {item.value}
                </Text>
                <Text>added {moment(key).fromNow()}</Text>
              </Box>
              <Spacer />
              <IconButton
                icon={<FiTrash />}
                onClick={() => {
                  onItemDelete(key);
                }}
              />
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
