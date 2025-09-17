import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import AppleProvider from "next-auth/providers/apple";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import connect from "@/db/dbconnect";
import User from "@/models/User";
import Payment from "@/models/Payment"; // (not used in this code, but imported)

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    async redirect({ url, baseUrl }) {
      return "/dashboard";
    },

    async jwt({ token, profile }) {
      if (profile) {
        token.email = profile.email;
      }
      return token;
    },

    async session({ session, token }) {
      await connect(); // ✅ Ensure DB is connected
      const dbUser = await User.findOne({ email: session.user.email });

      if (dbUser) {
        session.user.name = dbUser.username;
      }

      return session;
    },

    async signIn({ user, account, profile, email, credentials }) {
      await connect(); // ✅ Connect to DB

      if (account.provider === "github") {
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          const username = user.email.split("@")[0];
          const newUser = await User.create({
            email: user.email,
            username,
          });

          await newUser.save();
        }
      }

      return true;
    },
  },
});

export { handler as GET, handler as POST };
