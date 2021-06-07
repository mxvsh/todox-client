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
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const toast = useToast();

  const Register = () => {
    let name = nameRef.current.value;
    let email = emailRef.current.value;
    let password = passwordRef.current.value;

    axios
      .post("http://localhost:1337/auth/local/register", {
        username: name,
        email,
        password,
      })
      .then(({ data }) => {
        if (data.jwt) {
          Cookies.set("jwt", data.jwt);
          toast({
            status: "success",
            title: "Successfully Registerd",
          });
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
          <Heading>Register</Heading>
          <Stack spacing={4} mt={4}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input ref={nameRef} type="text" />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input ref={emailRef} type="email" />
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input ref={passwordRef} type="password" />
            </FormControl>
            <Button onClick={Register}>Register</Button>
            <Button mt={4} as="a" href="/login" variant="link">
              Already have an account?
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
