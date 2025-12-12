import NextAuth, { NextAuthOptions, getServerSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth as firebaseAuth, db } from "@/lib/firebase/firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        isRegister: { label: "Register", type: "text" },
      },
      async authorize(credentials) {
        try {
          const name = credentials?.name as string;
          const email = credentials?.email as string;
          const password = credentials?.password as string;
          const isRegister = credentials?.isRegister === "true";

          let userCredential;

          if (isRegister) {
            userCredential = await createUserWithEmailAndPassword(
              firebaseAuth,
              email,
              password
            );
            await updateProfile(userCredential.user, {
              displayName: name,
            });
            // Create user document in Firestore
            try {
              await setDoc(doc(db, "users", userCredential.user.uid), {
                uid: userCredential.user.uid,
                name: name,
                email: email,
                role: "user",
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
              });
            } catch (e) {
              console.error("Error creating user doc:", e);
            }
          } else {
            userCredential = await signInWithEmailAndPassword(
              firebaseAuth,
              email,
              password
            );
          }

          const user = userCredential.user;
          let role = "user";
          try {
            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);
            if (!userDoc.exists()) {
              await setDoc(userRef, {
                uid: user.uid,
                name: user.displayName || name || "",
                email: user.email,
                role: "user",
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
              });
              role = "user";
            } else {
              const data = userDoc.data() as any;
              role = data?.role || "user";
            }
          } catch (e) {
            console.warn("Error ensuring/reading user doc:", e);
          }

          return {
            id: user.uid,
            name: user.displayName || name || "",
            email: user.email,
            role,
          };
        } catch (error: any) {
          console.error("Auth error:", error.message);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = (user as any).id;
        token.name = (user as any).name;
        token.role = (user as any).role || "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.uid) {
        (session.user as any).uid = token.uid as string;
        session.user.name = token.name as string;
        
        // Read role from Firestore to ensure it's up-to-date
        try {
          const userDoc = await getDoc(doc(db, "users", token.uid as string));
          if (userDoc.exists()) {
            const data = userDoc.data() as any;
            (session.user as any).role = data?.role || "user";
          } else {
            (session.user as any).role = "user";
          }
        } catch (e) {
          console.warn("Error reading role from Firestore in session:", e);
          (session.user as any).role = token.role as string || "user";
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export const auth = () => getServerSession(authOptions);
export { handler as GET, handler as POST };
