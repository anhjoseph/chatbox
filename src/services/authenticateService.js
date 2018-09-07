import decode from 'jwt-decode';

const authService = {
  setToken: function(token) {
    localStorage.setItem('token', token);
  },
  
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

  isAuthenticated: function() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
}

export default authService;
