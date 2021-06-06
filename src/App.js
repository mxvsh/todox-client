import { useState } from "react";
import Header from "./components/Header";
import { FiBook, FiBriefcase, FiHome } from "react-icons/fi";
import { Box, Flex } from "@chakra-ui/layout";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";

function App({ match }) {
  const activeList = match.params.list;

  const [lists, setLists] = useState({
    home: {
      title: "Home",
      icon: <FiHome />,
      items: {},
    },
    work: {
      title: "Work",
      icon: <FiBriefcase />,
      items: {},
    },
    school: {
      title: "School Projects",
      icon: <FiBook />,
      items: {},
    },
  });

  return (
    <div>
      <Header />
      <Flex p={6}>
        <Box w="20%">
          <Sidebar activeList={activeList} lists={lists} />
        </Box>
        <Box>
          <Content
            onItemAdd={(item) => {
              const _list = lists[activeList];
              _list.items[new Date()] = {
                value: item,
              };
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
