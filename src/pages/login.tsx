import { KeyboardEvent, useState } from "react";
import { useAuth } from "hooks/useAuth";
import { auth, analytics } from "utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { Input } from "components/Input";
import { Spacer } from "components/Spacer";
import { useClientRouter } from "hooks/useClientRouter";
import { useToast } from "hooks/useToast";
import { getCorrectPasswordErrorKey, validateMail, validatePassword } from "utils/validation";
import { recoverPasswordPath, registrationPath } from "utils/paths";
import { toUser } from "mappers/toUser";
import { InfoButton } from "components/InfoButton";
import { CenteredBoxPageLayout } from "components/CenteredBoxPageLayout";
import { logEvent, setUserId as setAnalyticsUserId } from "firebase/analytics";
import { useTranslation } from "react-i18next";
import { ChangeLanguageButton } from "components/ChangeLanguageButton";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser } = useAuth();
  const router = useClientRouter();
  const { showToast } = useToast();
  const disabled = !validateMail(email) || !validatePassword(password);
  const { t } = useTranslation();

  const onConfirm = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(toUser(response.user));
      if (analytics) {
        setAnalyticsUserId(analytics, response.user.uid);
        logEvent(analytics, "login", response.user);
      }
    } catch (error) {
      showToast(t("login.errorLogin"), "error");
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
              router.push(registrationPath);
            }}
          >
            <Typography variant="body2">{t("login.signinButton")}</Typography>
          </Button>
        </>
      }
    >
      <form>
        <Typography variant="title">{t("login.login")}</Typography>
        <Spacer size={40} />
        <Typography variant="body">{t("login.email")}</Typography>
        <Spacer size={10} />
        <Input
          type="text"
          placeholder={t("login.insertEmailPlaceholder")}
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
        <Typography variant="body">{t("login.password")}</Typography>
        <Spacer size={10} />
        <Input
          type="password"
          value={password}
          placeholder={t("login.insertPasswordPlaceholder")}
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
        <Spacer size={20} />
        <div
          onClick={() => {
            router.push(recoverPasswordPath);
          }}
        >
          <Typography variant="body2" style={{ cursor: "pointer", textDecoration: "underline" }}>
            {t("login.recoverPassword")}
          </Typography>
        </div>
        <Spacer size={30} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={onConfirm} disabled={disabled}>
            <Typography variant="body2">{t("login.confirm")}</Typography>
          </Button>
        </div>
      </form>
    </CenteredBoxPageLayout>
  );
};

export default LoginPage;
