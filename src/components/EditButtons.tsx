import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const EditButtons: FC<{ isEditing: boolean; onEdit: () => void; onSave: () => void; onCancel: () => void }> = ({ isEditing, onEdit, onSave, onCancel }) => {
  const { t } = useTranslation();

  return (
    <div style={{ display: "flex", gap: 20 }}>
      {isEditing && (
        <>
          <Button onClick={() => onCancel()}>
            <Typography variant="body2">{t("home.cancelButton")}</Typography>
          </Button>
          <Button onClick={() => onSave()}>
            <Typography variant="body2">{t("home.saveButton")}</Typography>
          </Button>
        </>
      )}
      {!isEditing && (
        <Button onClick={() => onEdit()}>
          <Typography variant="body2">{t("home.editButton")}</Typography>
        </Button>
      )}
    </div>
  );
};
