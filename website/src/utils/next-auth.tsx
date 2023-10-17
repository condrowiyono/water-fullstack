import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  theme: {
    colorScheme: "light",
    logo: "/image/pu.png",
    buttonText: "Masuk",
  },
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Kata Sandi" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.API_URL}/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
        });

        const user = await res.json();

        if (res.ok && user) {
          return {
            ...user.data.user,
            token: user.data.token,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.river_id = user.river_id || undefined;
        token.river_type = user.river_type || undefined;
        token.user_type = user.user_type;
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.river_id = token.river_id as number;
      session.river_type = token.river_type as string;
      session.user_type = token.user_type as string;

      return session;
    },

    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? Promise.resolve(url) : Promise.resolve(baseUrl);
    },
  },
};
