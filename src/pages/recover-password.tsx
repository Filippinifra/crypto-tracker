import { KeyboardEvent, useState } from "react";
import { auth } from "utils/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { Input } from "components/Input";
import { Spacer } from "components/Spacer";
import { useClientRouter } from "hooks/useClientRouter";
import { useToast } from "hooks/useToast";
import { validateMail } from "utils/validation";
import { loginPath } from "utils/paths";
import { InfoButton } from "components/InfoButton";
import { CenteredBoxPageLayout } from "components/CenteredBoxPageLayout";
import { useTranslation } from "react-i18next";
import { ChangeLanguageButton } from "components/ChangeLanguageButton";

const RecoverPasswordPage = () => {
  const [email, setEmail] = useState("");
  const router = useClientRouter();
  const { showToast } = useToast();
  const disabled = !validateMail(email);
  const { t } = useTranslation();

  const onPasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      showToast(t("recoverPassword.mailHasBeenSent", { email }), "success");
      router.push(loginPath);
    } catch (error) {
      showToast(t("recoverPassword.errorSendingEmail"), "error");
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !disabled) {
      onPasswordReset();
    }
  };

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
            <Typography variant="body2">{t("recoverPassword.goRegistrationPageButton")}</Typography>
          </Button>
        </>
      }
    >
      <Typography variant="title">{t("recoverPassword.recoverPassword")}</Typography>
      <Spacer size={40} />
      <Typography variant="body">{t("recoverPassword.email")}</Typography>
      <Spacer size={10} />
      <Input
        type="text"
        placeholder={t("recoverPassword.insertEmailPlaceholder")}
        name="email"
        value={email}
        onChange={(e) => {
          setEmail(e.currentTarget.value);
        }}
        autocomplete={"email"}
        onKeyDown={handleKeyPress}
      />
      <Spacer size={5} />
      <Typography variant="error" style={{ height: 10 }}>
        {!email || validateMail(email) ? "" : t("validation.notValidEmail")}
      </Typography>
      <Spacer size={25} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={onPasswordReset} disabled={disabled}>
          <Typography variant="body2">{t("recoverPassword.sendRecoverEmail")}</Typography>
        </Button>
      </div>
    </CenteredBoxPageLayout>
  );
};

export default RecoverPasswordPage;
