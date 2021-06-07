import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Box, Flex } from "@chakra-ui/layout";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import { Redirect } from "react-router-dom";
import { MakeGET, MakePOST, MakePUT } from "./helper/Request";
import { useUser } from "./components/Auth/useUser";

function App({ match }) {
  const user = useUser();
  let activeList = match.params.list;

  const [lists, setLists] = useState({
    all: {
      title: "All",
      icon: "FiBox",
      items: {},
    },
  });

  useEffect(() => {
    MakeGET("lists").then((response) => {
      const final = {};
      response.map((item) => {
        final[item.title] = item;
      });
      setLists({ ...lists, ...final });
    });
  }, []);

  if (!lists[activeList]) {
    return <Redirect to="/all" />;
  }

  return (
    <div>
      <Header />
      <Flex p={6}>
        <Box w="20%">
          <Sidebar
            onNewList={(list) => {
              MakePOST("lists", {
                ...list,
                user: user.id,
              }).then((response) => console.log(response));
              setLists({
                ...lists,
                [list.title]: list,
              });
            }}
            activeList={activeList}
            lists={lists}
          />
        </Box>
        <Box w="80%">
          <Content
            onItemDelete={(date) => {
              console.log("date", date);
              const _list = lists[activeList];
              delete _list.items[date];
              MakePUT("lists/" + _list.id, {
                items: _list.items,
              });
              setLists({
                ...lists,
                [activeList]: _list,
              });
            }}
            onItemAdd={(item) => {
              const _list = lists[activeList];
              _list.items[new Date()] = {
                value: item,
              };
              MakePUT("lists/" + _list.id, {
                items: _list.items,
              });
              setLists({
                ...lists,
                [activeList]: _list,
              });
            }}
            list={lists[activeList]}
          />
        </Box>
      </Flex>
    </div>
  );
}

export default App;
