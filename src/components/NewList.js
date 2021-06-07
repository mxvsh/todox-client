import { useEffect, useRef, useState } from "react";
import { Button } from "@chakra-ui/button";
import { Box, HStack, Stack } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";

import * as Icons from "react-icons/fi";

const IconsList = Object.keys(Icons);

export default ({ onSave }) => {
  const [entry, setEntry] = useState(false);
  const [iconQuery, setIconQuery] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");
  const listName = useRef();

  const IconGenerator = () => {
    const filtered = IconsList.filter(
      (icon) => icon.toLocaleLowerCase().indexOf(iconQuery) > -1
    ).slice(0, 5);

    return (
      <HStack>
        {filtered.map((icon) => {
          const Icon = Icons[icon];
          return (
            <Box
              p={4}
              onClick={() => setSelectedIcon(icon)}
              _hover={{ bg: "gray.200", textColor: "green", cursor: "pointer" }}
              bg={selectedIcon == icon ? "gray.200" : "white"}
              textColor={selectedIcon == icon && "green"}
            >
              <Icon />
            </Box>
          );
        })}
      </HStack>
    );
  };

  useEffect(IconGenerator, [iconQuery]);

  const Save = () => {
    onSave({
      title: listName.current.value,
      icon: selectedIcon,
      items: {},
    });
    setEntry(false);
  };

  return (
    <Box>
      {entry ? (
        <Stack spacing={4}>
          <Input placeholder="Enter List Name" ref={listName} />
          <Input
            placeholder="Search Icon"
            size="sm"
            onChange={(e) => setIconQuery(e.target.value)}
          />

          <IconGenerator />

          <Button colorScheme="green" onClick={Save}>
            Save
          </Button>
        </Stack>
      ) : null}
      <Button
        w="full"
        size="sm"
        colorScheme={entry ? "red" : "green"}
        mt={5}
        onClick={() => setEntry(!entry)}
      >
        {entry ? "Cancel" : "New List"}
      </Button>
    </Box>
  );
};
