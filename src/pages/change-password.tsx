import { KeyboardEvent, useState } from "react";
import { auth } from "utils/firebase";
import { confirmPasswordReset } from "firebase/auth";
import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { Input } from "components/Input";
import { Spacer } from "components/Spacer";
import { useToast } from "hooks/useToast";
import { getCorrectPasswordErrorKey, validatePassword } from "utils/validation";
import { homePath, loginPath } from "utils/paths";
import { InfoButton } from "components/InfoButton";
import { CenteredBoxPageLayout } from "components/CenteredBoxPageLayout";
import { useClientRouter } from "hooks/useClientRouter";
import { useTranslation } from "react-i18next";
import { ChangeLanguageButton } from "components/ChangeLanguageButton";

const ChangePasswordPage = () => {
  const [password, setPassword] = useState("");
  const router = useClientRouter();
  const { showToast } = useToast();
  const disabled = !validatePassword(password);
  const oobCodeQuery = router.query.oobCode;
  const oobCode = typeof oobCodeQuery === "string" ? oobCodeQuery : oobCodeQuery?.[0] || "";
  const { t } = useTranslation();

  const onPasswordReset = async () => {
    try {
      await confirmPasswordReset(auth, oobCode, password);
      showToast(t("changePassword.passwordCorreclyChanged"), "success");
      router.push(loginPath);
    } catch (error) {
      showToast(t("changePassword.errorChangingPassword"), "error");
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !disabled) {
      onPasswordReset();
    }
  };

  if (!oobCode) {
    router.push(homePath);
  }

  return (
    <CenteredBoxPageLayout
      headerButtons={
        <>
          <ChangeLanguageButton />
          <InfoButton />
          <Button
            onClick={() => {
              router.push(loginPath);
            }}
          >
            <Typography variant="body2">{t("changePassword.goLoginPageButton")}</Typography>
          </Button>
        </>
      }
    >
      <Typography variant="title">{t("changePassword.changePassword")}</Typography>
      <Spacer size={40} />
      <Typography variant="body">{t("changePassword.newPassword")}</Typography>
      <Spacer size={10} />
      <Input
        type="password"
        placeholder={t("changePassword.insertNewPassword")}
        name="password"
        value={password}
        onChange={(e) => {
          setPassword(e.currentTarget.value);
        }}
        autocomplete={"password"}
        onKeyDown={handleKeyPress}
      />
      <Spacer size={5} />
      <Typography variant="error" style={{ height: 10 }}>
        {!password || validatePassword(password) ? "" : t(`validation.${getCorrectPasswordErrorKey(password)}`)}
      </Typography>
      <Spacer size={25} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={onPasswordReset} disabled={disabled}>
          <Typography variant="body2">{t("changePassword.confirmPassword")}</Typography>
        </Button>
      </div>
    </CenteredBoxPageLayout>
  );
};

export default ChangePasswordPage;
