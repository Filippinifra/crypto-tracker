import { useRouter } from "next/router";

export default function NotFoundPage() {
  const router = useRouter();

  if (typeof window !== "undefined") {
    router.replace("/");
  }

  return null;
}
