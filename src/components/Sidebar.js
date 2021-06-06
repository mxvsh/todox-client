import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { Link } from "react-router-dom";

export default ({ activeList, lists }) => {
  return (
    <Box>
      {Object.keys(lists).map((key) => {
        const list = lists[key];
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
              <Box mr={2}>{list.icon}</Box>
              <Heading size="md">{list.title}</Heading>
            </Box>
          </Link>
        );
      })}
    </Box>
  );
};
