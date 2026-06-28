// Validates sign-in form fields.
// Returns an error message string, or null when the input is valid.
export const validateForm = (email, password) => {
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password)

  if (!isEmailValid) return 'Please enter a valid email address.'
  if (!isPasswordValid)
    return 'Password must be at least 8 characters and include a letter and a number.'

  return null
}
