import { useAuth } from "hooks/useAuth";
import { LoadErrorHandler } from "components/LoadErrorHandler";
import { FC } from "react";
import { waitingRegistration, homePath, logAndUnlogPaths, loginPath, unloggedPaths, registrationConfirmingPath, loggedPaths } from "utils/paths";
import { useClientRouter } from "hooks/useClientRouter";
import { useLanguage } from "hooks/useLanguage";

const PublicAndPrivateRouter: FC = ({ children }) => {
  const router = useClientRouter();
  const { currentUser, isLoadingUser } = useAuth();
  const { language } = useLanguage();

  const currentPath = router.pathname;

  const isLoggedPath = loggedPaths.includes(currentPath);
  const isUnloggedPath = unloggedPaths.includes(currentPath);
  const isLogAndUnlogPath = logAndUnlogPaths.includes(currentPath);

  const isWaitingConfirmationPath = currentPath === waitingRegistration;
  const isConfirmingRegistrationPath = currentPath === registrationConfirmingPath;

  if (isLoadingUser || !language) {
    return <LoadErrorHandler data={null} error={null} />;
  }

  if (!currentUser && isLoggedPath) {
    router.replace(loginPath);
    return <LoadErrorHandler data={null} error={null} />;
  }

  if (currentUser && isUnloggedPath) {
    router.replace(homePath);

    return <LoadErrorHandler data={null} error={null} />;
  }

  if (currentUser?.verified && (isWaitingConfirmationPath || isConfirmingRegistrationPath)) {
    router.replace(homePath);

    return <LoadErrorHandler data={null} error={null} />;
  }

  if (currentUser && !currentUser.verified && !isLogAndUnlogPath && !isWaitingConfirmationPath) {
    router.replace(waitingRegistration);

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
