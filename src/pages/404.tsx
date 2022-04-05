import { LoadErrorHandler } from "components/LoadErrorHandler";
import { useClientRouter } from "hooks/useClientRouter";
import { homePath } from "utils/paths";

export default function NotFoundPage() {
  const { replace } = useClientRouter();

  replace(homePath);

  return <LoadErrorHandler data={null} error={null} />;
}
