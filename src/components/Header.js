import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { Box, Heading, Spacer } from "@chakra-ui/layout";
import { FiMoon, FiSun } from "react-icons/fi";

export default () => {
  const colorMode = useColorMode();

  return (
    <Box p={4} shadow="md" d="flex">
      <Heading>TodoX</Heading>
      <Spacer />
      <Button
        leftIcon={colorMode.colorMode === "dark" ? <FiSun /> : <FiMoon />}
        onClick={() => {
          if (colorMode.colorMode == "dark") {
            colorMode.setColorMode("light");
          } else {
            colorMode.setColorMode("dark");
          }
        }}
      >
        {colorMode.colorMode == "dark" ? "Light Mode" : "Dark Mode"}
      </Button>
    </Box>
  );
};
