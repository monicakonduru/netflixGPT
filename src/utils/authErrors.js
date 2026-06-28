// Turn Firebase auth error codes into messages we can show the user.
export const authErrorMessage = (code) => {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Incorrect email or password.'
    case 'auth/email-already-in-use':
      return 'An account already exists with this email. Try signing in.'
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.'
    case 'auth/account-exists-with-different-credential':
      return 'This email is already linked to a different sign-in method.'
    case 'auth/operation-not-allowed':
      return 'This sign-in method is disabled. Enable it in the Firebase console.'
    default:
      return 'Something went wrong. Please try again.'
  }
}
