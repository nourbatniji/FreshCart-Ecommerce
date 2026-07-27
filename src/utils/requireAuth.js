import toast from 'react-hot-toast'

// Guards guest-triggered actions (add to cart / wishlist) that need a logged-in user.
// Returns true if the action may proceed, otherwise redirects to login and returns false.
export function requireAuth(token, navigate) {
  if (token) return true

  toast.error('Please sign in to continue', {
    icon: '🔒',
    style: { borderRadius: '10px', background: '#333', color: '#fff' }
  })
  navigate('/login')
  return false
}
