import { Button, IconButton } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Center, Heading } from "@chakra-ui/layout";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useUser } from "./Auth/useUser";
import NewList from "./NewList";
import * as Icons from "react-icons/fi";

export default ({ activeList, lists, onNewList }) => {
  const user = useUser();
  return (
    <Box>
      {Object.keys(lists).map((key) => {
        const list = lists[key];
        const Icon = Icons[list.icon];
        return (
          <Link to={key}>
            <Box
              mb={2}
              bg={
                activeList == key
                  ? useColorModeValue("gray.100", "gray.400")
                  : useColorModeValue("white", "none")
              }
              p={4}
              css={{ userSelect: "none" }}
              d="flex"
              alignItems="center"
              borderRadius="lg"
              _hover={{
                bg: useColorModeValue("gray.100", "gray.900"),
                cursor: "pointer",
              }}
            >
              <Box mr={2}>
                <Icon />
              </Box>
              <Heading size="md">{list.title}</Heading>
            </Box>
          </Link>
        );
      })}
      <NewList
        onSave={(data) => {
          onNewList(data);
        }}
      />
      {!user.loading && (
        <Box position="fixed" bottom="10" w="20%">
          <Center>
            <Heading mb={2}>Hi, {user.username}</Heading>
          </Center>
          <Button
            w="full"
            onClick={() => {
              Cookies.remove("jwt");
              Cookies.remove("user-data");
              window.location = "/";
            }}
          >
            Logout
          </Button>
        </Box>
      )}
    </Box>
  );
};
