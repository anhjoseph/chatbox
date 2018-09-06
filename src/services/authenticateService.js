import decode from 'jwt-decode';

const authService = {
  getToken: function() {
    return localStorage.getItem('token');
  },

  removeToken: function() {
    localStorage.removeItem('token');
  },

  isTokenExpired: function(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  },

  isLoggedIn: function() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
}

export default authService;
