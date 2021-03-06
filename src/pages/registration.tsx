import { KeyboardEvent, useState } from "react";
import { useAuth } from "hooks/useAuth";
import { analytics, auth } from "utils/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { Input } from "components/Input";
import { Spacer } from "components/Spacer";
import { useClientRouter } from "hooks/useClientRouter";
import { useToast } from "hooks/useToast";
import { getCorrectPasswordErrorKey, validateMail, validatePassword } from "utils/validation";
import { loginPath } from "utils/paths";
import { toUser } from "mappers/toUser";
import { InfoButton } from "components/InfoButton";
import { CenteredBoxPageLayout } from "components/CenteredBoxPageLayout";
import { setUserId as setAnalyticsUserId } from "firebase/analytics";
import { useTranslation } from "react-i18next";
import { ChangeLanguageButton } from "components/ChangeLanguageButton";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setCurrentUser } = useAuth();
  const router = useClientRouter();
  const { showToast } = useToast();
  const { t } = useTranslation();

  const passwordAndConfirmOneEqual = password === confirmPassword;

  const disabled = !validateMail(email) || !validatePassword(password) || !passwordAndConfirmOneEqual;

  const onConfirm = async () => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      if (analytics) {
        setAnalyticsUserId(analytics, response.user.uid);
      }
      setCurrentUser(toUser(response.user));
      sendEmailVerification(response.user);
    } catch (error) {
      showToast(t("registration.errorRegistration"), "error");
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !disabled) {
      onConfirm();
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
            <Typography variant="body2">{t("registration.loginButton")}</Typography>
          </Button>
        </>
      }
    >
      <form>
        <Typography variant="title">{t("registration.registration")}</Typography>
        <Spacer size={40} />
        <Typography variant="body">{t("registration.email")}</Typography>
        <Spacer size={10} />
        <Input
          type="text"
          placeholder={t("registration.insertEmailPlaceholder")}
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
        <Typography variant="body">{t("registration.password")}</Typography>
        <Spacer size={10} />
        <Input
          type="password"
          value={password}
          placeholder={t("registration.insertPasswordPlaceholder")}
          name="psw"
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
        <Typography variant="body">{t("registration.confirmPassword")}</Typography>
        <Spacer size={10} />
        <Input
          type="password"
          value={confirmPassword}
          placeholder={t("registration.confirmPasswordPlaceholder")}
          name="confirmpsw"
          onChange={(e) => {
            setConfirmPassword(e.currentTarget.value);
          }}
          onKeyDown={handleKeyPress}
        />
        <Spacer size={5} />
        <Typography variant="error" style={{ height: 10 }}>
          {!confirmPassword || passwordAndConfirmOneEqual ? "" : t(`validation.passwordsNoMatch`)}
        </Typography>
        <Spacer size={40} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={onConfirm} disabled={disabled}>
            <Typography variant="body2">{t("registration.confirm")}</Typography>
          </Button>
        </div>
      </form>
    </CenteredBoxPageLayout>
  );
};

export default SignupPage;
