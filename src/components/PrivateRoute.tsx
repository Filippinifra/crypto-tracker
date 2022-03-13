import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { FC } from "react";

export const PrivateRoute: FC = ({ children }) => {
  const user = getAuth().currentUser;
  const router = useRouter();

  if (!user) {
    router.push("/signin");
  }
  console.log(user);

  return <>{children}</>;
};
