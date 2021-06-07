import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { MakeGET } from "../../helper/Request";

const useUser = () => {
  const [data, setData] = useState({
    loading: true,
  });

  const userData = Cookies.get("user-data");

  useEffect(() => {
    if (!userData)
      MakeGET("users/me").then((user) => {
        Cookies.set("user-data", JSON.stringify(user));
        setData({
          loading: false,
          ...user,
        });
      });
    else
      setData({
        loading: false,
        ...JSON.parse(Cookies.get("user-data")),
      });
  }, []);

  return data;
};

export { useUser };
