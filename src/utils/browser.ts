export const isBrowser = typeof window !== "undefined";
export const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
