import { LoadErrorHandler } from "components/LoadErrorHandler";
import Router from "next/router";

export default function NotFoundPage() {
  if (typeof window !== "undefined") {
    Router.replace("/");
  }

  return <LoadErrorHandler data={null} error={null} />;
}
