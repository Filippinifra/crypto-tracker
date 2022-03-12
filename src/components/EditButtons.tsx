import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { FC } from "react";

export const EditButtons: FC<{ isEditing: boolean; onEdit: () => void; onSave: () => void; onCancel: () => void }> = ({ isEditing, onEdit, onSave, onCancel }) => {
  return (
    <div style={{ display: "flex", gap: 20 }}>
      {isEditing && (
        <>
          <Button onClick={() => onCancel()}>
            <Typography variant="body2">{"Cancella"}</Typography>
          </Button>
          <Button onClick={() => onSave()}>
            <Typography variant="body2">{"Salva"}</Typography>
          </Button>
        </>
      )}
      {!isEditing && (
        <Button onClick={() => onEdit()}>
          <Typography variant="body2">{"Modifica"}</Typography>
        </Button>
      )}
    </div>
  );
};
