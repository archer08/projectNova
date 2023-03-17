import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request } from 'express';
import { User, UserDocument } from '../models/user.model';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';


interface JwtPayload {
  userId: string;
}

export const generateAuthToken = (user: UserDocument): string => {
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY!);
  return token;
};

export const authenticate = async (req: Request): Promise<UserDocument | null> => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return null;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;
    const user = await User.findById(decoded.userId);
    return user;
  } catch (error) {
    return null;
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};



// Define the local strategy for authenticating with a username and password
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // Use the email field as the username field
    },
    async (email, password, done) => {
      try {
        // Find the user with the provided email address
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
          // If the user doesn't exist, return a failure message
          return done(null, false, { message: 'Incorrect email or password' });
        }
        // Compare the provided password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          // If the password doesn't match, return a failure message
          return done(null, false, { message: 'Incorrect email or password' });
        }
        // If authentication succeeds, return the authenticated user
        return done(null, user);
      } catch (err) {
        // If there's an error, return the error
        return done(err);
      }
    },
  ),
);

// Define the JWT strategy for authenticating with JSON Web Tokens
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET as string,
    },
    async (payload, done) => {
      try {
        // Find the user with the provided user ID in the JWT payload
        const user = await User.findById(payload.userId);
        if (!user) {
          // If the user doesn't exist, return a failure message
          return done(null, false, { message: 'Invalid token' });
        }
        // If authentication succeeds, return the authenticated user
        return done(null, user);
      } catch (err) {
        // If there's an error, return the error
        return done(err);
      }
    },
  ),
);

// Serialize and deserialize the user
passport.serializeUser((user: UserDocument, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;

