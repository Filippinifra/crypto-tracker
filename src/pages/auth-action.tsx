import { LoadErrorHandler } from "components/LoadErrorHandler";
import { useClientRouter } from "hooks/useClientRouter";
import { changePasswordPath, homePath, registrationConfirmingPath } from "utils/paths";

const AuthActionPage = () => {
  const router = useClientRouter();
  const modeQuery = router.query.mode;
  const mode = typeof modeQuery === "string" ? modeQuery : modeQuery?.[0] || "";

  const queryParamsString = Object.entries(router.query)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  if (!mode) {
    router.push(homePath);
  }

  if (mode === "verifyEmail") {
    router.push(`${registrationConfirmingPath}?${queryParamsString}`);
  }

  if (mode === "resetPassword") {
    router.push(`${changePasswordPath}?${queryParamsString}`);
  }

  return <LoadErrorHandler data={null} error={null} />;
};

export default AuthActionPage;
