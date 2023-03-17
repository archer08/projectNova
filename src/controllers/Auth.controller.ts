import { authenticateUser } from "../services/Auth.service";



export const login = (req, res) => {
    const { username, password } = req.body;
    const user = authenticateUser(username, password);
    if (!user) {
      res.status(401).send('Invalid username or password');
    } else {
      req.session.user = user;
      res.redirect('/dashboard');
    }
  }

export const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
  }