import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { useClientRouter } from "hooks/useClientRouter";
import { infoPath } from "utils/paths";

export const InfoButton = () => {
  const router = useClientRouter();

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
