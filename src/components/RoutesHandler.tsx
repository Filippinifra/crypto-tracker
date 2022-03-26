import { useAuth } from "hooks/useAuth";
import { useRouter } from "next/router";
import { LoadErrorHandler } from "components/LoadErrorHandler";
import { FC } from "react";
import { isBrowser } from "utils/browser";
import { confirmationPath, homePath, logAndUnlogPaths, loginPath, unloggedPaths } from "utils/paths";

const PublicAndPrivateRouter: FC = ({ children }) => {
  const router = useRouter();
  const { currentUser, isLoadingUser } = useAuth();

  const isPublicRoute = [...logAndUnlogPaths, ...unloggedPaths].some((r) => r === router.pathname);
  const isConfirmationPath = router.pathname === confirmationPath;

  if (isLoadingUser) {
    return <LoadErrorHandler data={null} error={null} />;
  }

  if (!currentUser && !isPublicRoute) {
    if (isBrowser) {
      router.replace(loginPath);
    }
    return <LoadErrorHandler data={null} error={null} />;
  }

  if (currentUser && !currentUser?.verified && !isConfirmationPath) {
    if (isBrowser) {
      router.replace(confirmationPath);
    }
    return <LoadErrorHandler data={null} error={null} />;
  }

  if ((currentUser && isPublicRoute) || (currentUser?.verified && isConfirmationPath)) {
    if (isBrowser) {
      router.replace(homePath);
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
