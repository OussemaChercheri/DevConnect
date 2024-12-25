import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import passport from "passport";
import "../strategys/GoogleStrategy.js";
import "../strategys/GitHubStrategy.js";

export const signup = async (req, res) => {
	try {
		const { name, username, email, password } = req.body;

		if (!name || !username || !email || !password) {
			return res.status(400).json({ message: "All fields are required" });
		}
		const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			return res.status(400).json({ message: "Email already exists" });
		}

		const existingUsername = await User.findOne({ username });
		if (existingUsername) {
			return res.status(400).json({ message: "Username already exists" });
		}

		if (password.length < 6) {
			return res.status(400).json({ message: "Password must be at least 6 characters" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = new User({
			name,
			email,
			password: hashedPassword,
			username,
		});

		await user.save();

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });

		res.cookie("jwt-linkedin", token, {
			httpOnly: true, // prevent XSS attack
			maxAge: 3 * 24 * 60 * 60 * 1000,
			sameSite: "strict", // prevent CSRF attacks,
			secure: process.env.NODE_ENV === "production", // prevents man-in-the-middle attacks
		});

		res.status(201).json({ message: "User registered successfully" });

		const profileUrl = process.env.CLIENT_URL + "/profile/" + user.username;

		try {
			await sendWelcomeEmail(user.email, user.name, profileUrl);
		} catch (emailError) {
			console.error("Error sending welcome Email", emailError);
		}
	} catch (error) {
		console.log("Error in signup: ", error.message);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		// Check if user exists
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		// Check password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		// Create and send token
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
		await res.cookie("jwt-linkedin", token, {
			httpOnly: true,
			maxAge: 3 * 24 * 60 * 60 * 1000,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production",
		});

		res.json({ message: "Logged in successfully" });
	} catch (error) {
		console.error("Error in login controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const logout = (req, res) => {
	res.clearCookie("jwt-linkedin");
	res.json({ message: "Logged out successfully" });
};

export const getCurrentUser = async (req, res) => {
	try {
		res.json(req.user);
	} catch (error) {
		console.error("Error in getCurrentUser controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};
export const githubLogin = passport.authenticate("github", { scope: ["user:email"] });

export const githubCallback = (req, res, next) => {
    passport.authenticate("github", async (err, user, info) => {
        if (err || !user) {
            console.error("GitHub authentication error:", err || "No user found");
            return res.status(400).json({ message: "GitHub authentication failed" });
        }

        try {
            // Generate a JWT token for the authenticated user
            const token = jwt.sign({ userId: user.githubId }, process.env.JWT_SECRET, { expiresIn: "3d" });

            // Set the cookie for authentication
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
            });

            // Use dynamic redirection if a `redirectUrl` query param exists
            const redirectUrl = req.query.redirectUrl || "/";
            const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

            // Redirect to the dynamic or default route
            res.redirect(`${clientUrl}${redirectUrl}`);
        } catch (error) {
            console.error("Error during GitHub callback:", error.message);
            res.status(500).json({ message: "Internal server error" });
        }
    })(req, res, next);
};

export const googleLogin = passport.authenticate("google", { scope: ["profile", "email"] });

export const googleCallback = (req, res, next) => {
    passport.authenticate("google", async (err, user, info) => {
        if (err || !user) {
            console.error("Google authentication error:", err || "No user found");
            return res.status(400).json({ message: "Google authentication failed" });
        }

        try {
            // Generate a JWT token for the authenticated user
            const token = jwt.sign({ userId: user.googleId }, process.env.JWT_SECRET, { expiresIn: "3d" });

            // Set the cookie for authentication
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
            });

            // Use dynamic redirection if a `redirectUrl` query param exists
            const redirectUrl = req.query.redirectUrl || "/";
            const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

            // Redirect to the dynamic or default route
            res.redirect(`${clientUrl}${redirectUrl}`);
        } catch (error) {
            console.error("Error during Google callback:", error.message);
            res.status(500).json({ message: "Internal server error" });
        }
    })(req, res, next);
}