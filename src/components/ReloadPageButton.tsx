import { FC } from "react";
import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { useClientRouter } from "hooks/useClientRouter";
import { useTranslation } from "react-i18next";

export const ReloadPageButton: FC = () => {
  const { reload } = useClientRouter();
  const { t } = useTranslation();

  return (
    <Button
      onClick={() => {
        reload();
      }}
    >
      <Typography variant="body2">{t("general.reload")}</Typography>
    </Button>
  );
};
