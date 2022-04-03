import { useRouter } from "next/router";
import { isBrowser } from "utils/browser";

export const useClientRouter = () => {
  const router = useRouter();

  const pushOnClient = (path: string) => {
    if (isBrowser) {
      router.push(path);
    }
  };

  const replaceOnClient = (path: string) => {
    if (isBrowser) {
      router.replace(path);
    }
  };

  return {
    ...router,
    push: pushOnClient,
    replace: replaceOnClient,
  };
};
