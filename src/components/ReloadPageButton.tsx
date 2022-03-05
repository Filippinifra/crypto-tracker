import { useRouter } from "next/router";
import { FC } from "react";
import { Button } from "components/Button";
import { Typography } from "components/Typography";

export const ReloadPageButton: FC = () => {
  const { reload } = useRouter();

  return (
    <Button
      onClick={() => {
        reload();
      }}
    >
      <Typography variant="body">Ricarica</Typography>
    </Button>
  );
};
