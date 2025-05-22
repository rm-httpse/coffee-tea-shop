export const getCurrentUser = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('luven_user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem('luven_user');
  window.location.reload(); // ✅ forces Navbar to re-read localStorage
};
