import { Input } from "@chakra-ui/input";
import { Box, Center, Container, Heading, Stack } from "@chakra-ui/layout";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";

import axios from "axios";
import Cookies from "js-cookie";

export default () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const toast = useToast();

  const Login = () => {
    let email = emailRef.current.value;
    let password = passwordRef.current.value;

    axios
      .post("http://localhost:1337/auth/local", {
        identifier: email,
        password,
      })
      .then(({ data }) => {
        if (data.jwt) {
          Cookies.set("jwt", data.jwt);
          toast({
            status: "success",
            title: "Successfully Logged in",
          });
          setTimeout(() => (window.location = "/home"), 1200);
          return;
        }
      })
      .catch((err) => {
        toast({
          status: "error",
          title: "An error occurred",
        });
      });
  };

  return (
    <Box p={12}>
      <Container>
        <Box mt={12} borderWidth="1px" borderRadius="lg" p={4}>
          <Heading>Login</Heading>
          <Stack spacing={4} mt={4}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input ref={emailRef} type="email" />
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input ref={passwordRef} type="password" />
            </FormControl>
            <Button onClick={Login}>Login</Button>

            <Button mt={4} as="a" href="/register" variant="link">
              Don't have an account?
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
