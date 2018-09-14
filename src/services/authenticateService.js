import decode from 'jwt-decode';

const authService = {
  setToken(token) {
    localStorage.setItem('token', token);
  },

  removeToken() {
    localStorage.removeItem('token');
  },

  getToken() {
    return localStorage.getItem('token');
  },

  getUser() {
    const payload = decode(this.getToken());
    return payload.username;
  },

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  },

  isAuthenticated() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  },
};

export default authService;
