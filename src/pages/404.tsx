import { LoadErrorHandler } from "components/LoadErrorHandler";
import Router from "next/router";
import { isBrowser } from "utils/browser";
import { homePath } from "utils/paths";

export default function NotFoundPage() {
  if (isBrowser) {
    Router.replace(homePath);
  }

  return <LoadErrorHandler data={null} error={null} />;
}
