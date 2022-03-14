import { useAuth } from "contexts/AuthContext";
import { useRouter } from "next/router";
import { LoadErrorHandler } from "components/LoadErrorHandler";

export const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const { currentUser } = useAuth();

  const publicRoutes = ["/signin", "/signup"];
  const isPublicRoute = publicRoutes.some((r) => r === router.pathname);

  if (!currentUser && !isPublicRoute) {
    router.replace("/signin");
    return null;
  }

  if (currentUser && isPublicRoute) {
    router.replace("/");
    return null;
  }

  return <LoadErrorHandler data={currentUser !== undefined}>{children}</LoadErrorHandler>;
};
