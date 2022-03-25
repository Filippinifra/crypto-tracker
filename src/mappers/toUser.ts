import { User as FirebaseUser } from "firebase/auth";
import { User } from "types/user";

export const toUser = (firebaseUser: FirebaseUser): User => {
  return { email: firebaseUser.email, uid: firebaseUser.uid, verified: firebaseUser.emailVerified };
};
