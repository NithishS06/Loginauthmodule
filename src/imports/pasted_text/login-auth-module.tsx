Build a reusable Login Authentication Module in React + TypeScript.

This is NOT a one-time screen. This is a reusable component/module 
that can be dropped into any application by passing props.

=== COMPONENT NAME ===
Main exported component name: LoginAuthModule

=== PROPS THE COMPONENT ACCEPTS ===
- appName: string (company name, e.g. "Acme Corp")
- appTagline: string (app subtitle, e.g. "Admin Portal")
- theme: "light" | "dark"
- onLoginSuccess: (result: { user, token }) => void
- onLogout: () => void

=== LAYOUT STRUCTURE ===
Split screen layout — two panels side by side:

LEFT PANEL (40% width):
- Dark background always (regardless of theme)
- A security-themed SVG illustration in the center
- Below illustration: small badge text "Secure Access"
- Below badge: short description "Enterprise-grade security and encryption"
- Decorative subtle circular patterns in background

RIGHT PANEL (60% width):
- Background changes based on theme prop
- TOP: Company logo placeholder (shield icon) + appName + appTagline
- HEADING: "Welcome back" (large) + "Sign in to your account to continue" (small)
- FORM FIELDS (described below)
- LOGIN BUTTON
- DEMO HINT at bottom

=== SCREENS INSIDE THE MODULE ===
Screen 1 — Login Screen (default)
Screen 2 — Forgot Password Screen
Screen 3 — Success Screen (after login)

=== SCREEN 1: LOGIN FORM ===
Fields:
1. Email Address input
   - Label: "EMAIL ADDRESS" (uppercase, small)
   - Placeholder: "admin@company.com"
   - Validation: required, must be valid email format
   - Show inline error below field if invalid

2. Password input
   - Label: "PASSWORD" (uppercase, small)
   - Placeholder: "••••••••"
   - Show/Hide password toggle button (eye icon) on right side
   - Validation: required, minimum 6 characters
   - Show inline error below field if invalid

3. Forgot Password link
   - Right-aligned below password field
   - Text: "Forgot password?"
   - On click: navigate to Screen 2 (Forgot Password)

4. Login Button
   - Full width
   - Text: "Sign In →"
   - On click: run validation first
   - If validation passes: show loading spinner + text "Authenticating..."
   - Simulate 1.5 second API delay
   - After delay: check credentials

5. Demo hint text at bottom:
   - Small muted text: "Demo: admin@company.com · Admin@123"

=== AUTHENTICATION LOGIC ===
Use a custom hook called useAuth()

Valid credentials (hardcoded for demo):
- Email: admin@company.com
- Password: Admin@123

On valid login:
- Generate a mock JWT token using btoa() encoding
- Token payload: { sub: email, name: "Alex Morgan", role: "Administrator", iat: Date.now() }
- Call onLoginSuccess prop with { user: { name, email, role }, token }
- Navigate to Screen 3 (Success Screen)

On invalid login:
- Show error banner above the form fields
- Error message: "Invalid credentials. Please check your email and password."
- Do NOT clear the form fields

=== SCREEN 2: FORGOT PASSWORD ===
- Back button top left: "← Back to Sign In" — navigates back to Screen 1
- Heading: "Reset Password"
- Subtext: "Enter your email and we'll send you a secure reset link."
- Email input field with validation
- Submit button: "Send Reset Link →" with loading state
- After 1.2 second delay: show success state
- Success state: green checkmark icon + "Reset link sent!" + "Check your inbox at {email}"
- "Back to Sign In" button in success state

=== SCREEN 3: SUCCESS SCREEN ===
- Centered layout
- Large success checkmark animation
- Heading: "Authentication Successful"
- Green badge: "JWT Token Issued ✓"
- User info: "Logged in as Alex Morgan · Role: Administrator"
- Token display box (monospace font, truncated): "Bearer eyJ... [JWT token active]"
- "Sign Out" button — on click: navigate back to Screen 1, call onLogout prop

=== THEME SYSTEM ===
Define all colors as CSS variables.

Light theme variables:
--bg: #F5F3EF
--panel-bg: #FFFFFF
--left-bg: #1A1A2E
--accent: #E8B86D
--text: #1A1A2E
--text-muted: #7A7A8C
--input-bg: #F5F3EF
--input-border: #DDD8D0
--btn-bg: #1A1A2E
--btn-text: #F5F3EF
--error: #C0392B
--success: #1A7A4A

Dark theme variables:
--bg: #0D0D1A
--panel-bg: #16162A
--left-bg: #0A0A14
--accent: #E8B86D
--text: #F0EDE8
--text-muted: #8A8AA0
--input-bg: #1E1E32
--input-border: #2E2E4A
--btn-bg: #E8B86D
--btn-text: #0D0D1A
--error: #E74C3C
--success: #2ECC71

=== TYPOGRAPHY ===
Import from Google Fonts:
- "DM Serif Display" — for headings
- "DM Sans" — for body, labels, inputs, buttons

=== ANIMATIONS ===
- On screen mount: fade in + slide up (opacity 0→1, translateY 20px→0, 0.5s ease)
- Login button hover: slight background darken
- Input focus: border color changes to accent + soft glow shadow
- Loading spinner: rotating border animation

=== FILE STRUCTURE ===
Organize into these files:
- src/types/index.ts — all TypeScript interfaces
- src/hooks/useAuth.ts — authentication hook
- src/components/LoginPage.tsx — Screen 1
- src/components/ForgotPassword.tsx — Screen 2  
- src/components/SuccessScreen.tsx — Screen 3
- src/index.ts — exports LoginAuthModule as default export
- src/App.tsx — demo wrapper that shows LoginAuthModule with controls

=== DEMO WRAPPER (App.tsx) ===
The App.tsx should demonstrate reusability by showing:
- A theme toggle button (Light / Dark)
- The LoginAuthModule component being used with props:
  appName="Acme Corp"
  appTagline="Admin Portal"
  theme={currentTheme}