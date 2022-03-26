import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { useRouter } from "next/router";
import { infoPath } from "utils/paths";

export const InfoButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        router.push(infoPath);
      }}
    >
      <Typography variant="body2" style={{ marginLeft: 2 }}>
        ?
      </Typography>
    </Button>
  );
};
