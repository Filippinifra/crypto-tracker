import { useAuth } from "hooks/useAuth";
import { useRouter } from "next/router";
import { LoadErrorHandler } from "components/LoadErrorHandler";
import { FC } from "react";

const PublicAndPrivateRouter: FC = ({ children }) => {
  const router = useRouter();
  const { currentUser, isLoadingUser } = useAuth();

  const publicRoutes = ["/login", "/registration"];
  const isPublicRoute = publicRoutes.some((r) => r === router.pathname);
  const isConfirmationPath = router.pathname === "/confirmation";

  if (isLoadingUser) {
    return <LoadErrorHandler data={null} error={null} />;
  }

  if (!currentUser && !isPublicRoute) {
    if (typeof window !== "undefined") {
      router.replace("/login");
    }
    return <LoadErrorHandler data={null} error={null} />;
  }

  if (currentUser && !currentUser?.emailVerified && !isConfirmationPath) {
    if (typeof window !== "undefined") {
      router.replace("/confirmation");
    }
    return <LoadErrorHandler data={null} error={null} />;
  }

  if (
    (currentUser && isPublicRoute) ||
    (currentUser?.emailVerified && isConfirmationPath)
  ) {
    if (typeof window !== "undefined") {
      router.replace("/");
    }
    return <LoadErrorHandler data={null} error={null} />;
  }

  return (
    <LoadErrorHandler data={currentUser !== undefined} error={null}>
      {children}
    </LoadErrorHandler>
  );
};

export const RoutesHandler: FC = ({ children }) => {
  return <PublicAndPrivateRouter>{children}</PublicAndPrivateRouter>;
};
