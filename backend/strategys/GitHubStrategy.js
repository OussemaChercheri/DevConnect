import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import dotenv from 'dotenv';
import User from '../models/user.model.js';

dotenv.config();

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      // Check if the user already exists
      let user = await User.findOne({ username: profile.username });

      if (!user) {
        // Create a new user if one does not exist
        user = new User({
          name: profile.displayName || "GitHub User",
          username: profile.username,
          email: profile.emails?.[0]?.value || "No public email",
          profilePicture: profile.photos?.[0]?.value || "",
          password: "github-auth", // Placeholder; adjust if necessary
        });

        await user.save();
      }
      

      return done(null, user);
    } catch (error) {
      console.error("Error during GitHub authentication:", error);
      return done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id); // Store user ID in session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;