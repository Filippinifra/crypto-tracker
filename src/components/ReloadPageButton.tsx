import { FC } from "react";
import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { useClientRouter } from "hooks/useClientRouter";

export const ReloadPageButton: FC = () => {
  const { reload } = useClientRouter();

  return (
    <Button
      onClick={() => {
        reload();
      }}
    >
      <Typography variant="body2">Ricarica</Typography>
    </Button>
  );
};
