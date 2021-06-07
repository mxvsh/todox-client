import { useEffect, useState } from "react";
import {
  Box,
  Center,
  Text,
  Heading,
  Spacer,
  Stack,
  Flex,
} from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import axios from "axios";
import moment from "moment";

export default ({ match }) => {
  const id = match.params.id;
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState({});

  useEffect(() => {
    axios.get("http://localhost:1337/lists/" + id).then(({ data }) => {
      setList(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Center mt={14}>
        <Spinner />
      </Center>
    );
  }

  return (
    <Box p={12}>
      <Flex>
        <Heading>{list.title}</Heading>
        <Spacer />
        <Text textColor="gray.500">by {list.user.username}</Text>
      </Flex>
      <Stack mt={4} spacing={4}>
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
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};
