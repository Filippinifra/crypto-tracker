import { useAuth } from "hooks/useAuth";
import { useRouter } from "next/router";
import { LoadErrorHandler } from "components/LoadErrorHandler";
import { FC } from "react";
import { isBrowser } from "utils/browser";
import { waitingRegistration, homePath, logAndUnlogPaths, loginPath, unloggedPaths, registrationConfirmingPath, loggedPaths } from "utils/paths";

const PublicAndPrivateRouter: FC = ({ children }) => {
  const router = useRouter();
  const { currentUser, isLoadingUser } = useAuth();

  const currentPath = router.pathname;

  const isLoggedPath = loggedPaths.includes(currentPath);
  const isUnloggedPath = unloggedPaths.includes(currentPath);
  const isLogAndUnlogPath = logAndUnlogPaths.includes(currentPath);

  const isWaitingConfirmationPath = currentPath === waitingRegistration;
  const isConfirmingRegistrationPath = currentPath === registrationConfirmingPath;

  if (isLoadingUser) {
    return <LoadErrorHandler data={null} error={null} />;
  }

  if (!currentUser && isLoggedPath) {
    if (isBrowser) {
      router.replace(loginPath);
    }
    return <LoadErrorHandler data={null} error={null} />;
  }

  if (currentUser && isUnloggedPath) {
    if (isBrowser) {
      router.replace(homePath);
    }
    return <LoadErrorHandler data={null} error={null} />;
  }

  if (currentUser?.verified && (isWaitingConfirmationPath || isConfirmingRegistrationPath)) {
    if (isBrowser) {
      router.replace(homePath);
    }
    return <LoadErrorHandler data={null} error={null} />;
  }

  if (currentUser && !currentUser.verified && !isLogAndUnlogPath && !isWaitingConfirmationPath) {
    if (isBrowser) {
      router.replace(waitingRegistration);
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
