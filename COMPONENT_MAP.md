# Component Map - Visual Guide

A visual reference for understanding the Login Authentication Module's structure.

---

## 🗺️ Visual Component Tree

```
┌─────────────────────────────────────────────────────────────────┐
│                         App.tsx (Demo)                          │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  [Theme Toggle Button] (Top-Right)                     │    │
│  │  [Debug Console Output] (Bottom-Right - when logged in)│    │
│  └────────────────────────────────────────────────────────┘    │
│                             │                                    │
│                             ▼                                    │
│  ┌────────────────────────────────────────────────────────┐    │
│  │           LoginAuthModule (Main Component)             │    │
│  │                                                         │    │
│  │  Props:                                                │    │
│  │  • appName: "Acme Corp"                               │    │
│  │  • appTagline: "Admin Portal"                         │    │
│  │  • theme: "light" | "dark"                            │    │
│  │  • onLoginSuccess: (result) => void                   │    │
│  │  • onLogout: () => void                               │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        ▼                    ▼                    ▼
   ┌─────────┐      ┌──────────────┐      ┌─────────────┐
   │ Login   │      │   Forgot     │      │   Success   │
   │  Page   │      │  Password    │      │   Screen    │
   └─────────┘      └──────────────┘      └─────────────┘
   Screen 1         Screen 2              Screen 3
```

---

## 📱 Screen 1: Login Page

```
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│  LEFT PANEL (40%)          │    RIGHT PANEL (60%)              │
│  Dark Background           │    Theme-based Background         │
│  ┌──────────────────┐     │    ┌───────────────────────┐      │
│  │                  │     │    │  [Shield Icon]         │      │
│  │   [Security      │     │    │  Acme Corp             │      │
│  │   Illustration   │     │    │  Admin Portal          │      │
│  │   SVG]           │     │    └───────────────────────┘      │
│  │                  │     │                                     │
│  │  200x200px       │     │    ┌───────────────────────┐      │
│  │                  │     │    │  Welcome back          │      │
│  └──────────────────┘     │    │  Sign in to continue   │      │
│                            │    └───────────────────────┘      │
│  [Secure Access]           │                                     │
│  Badge                     │    [Error Banner] (if error)       │
│                            │                                     │
│  "Enterprise-grade         │    ┌───────────────────────┐      │
│  security and              │    │  EMAIL ADDRESS         │      │
│  encryption"               │    │  [input field]         │      │
│                            │    │  [inline error]        │      │
│  ○ ○ ○                     │    └───────────────────────┘      │
│  Decorative                │                                     │
│  Circles                   │    ┌───────────────────────┐      │
│                            │    │  PASSWORD        [👁]  │      │
│                            │    │  [input field]         │      │
│                            │    │  [inline error]        │      │
│                            │    └───────────────────────┘      │
│                            │                                     │
│                            │         [Forgot password?]         │
│                            │                                     │
│                            │    ┌───────────────────────┐      │
│                            │    │  [Sign In →]           │      │
│                            │    │  Full-width Button     │      │
│                            │    └───────────────────────┘      │
│                            │                                     │
│                            │    Demo: admin@company.com ·       │
│                            │          Admin@123                 │
│                            │                                     │
└────────────────────────────────────────────────────────────────┘
```

### Components Used:
- ✅ Email input with validation
- ✅ Password input with show/hide toggle
- ✅ Forgot password link (navigates to Screen 2)
- ✅ Submit button with loading state
- ✅ Error banner (conditional)
- ✅ Inline validation errors
- ✅ Demo credentials hint

### Interactions:
1. Enter email → validates on blur
2. Enter password → validates on blur
3. Click "Sign In" → validates all → shows loading → authenticates
4. Success → navigates to Screen 3
5. Failure → shows error banner
6. Click "Forgot password?" → navigates to Screen 2

---

## 📱 Screen 2: Forgot Password

```
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│  LEFT PANEL (40%)          │    RIGHT PANEL (60%)              │
│  Dark Background           │    Theme-based Background         │
│  ┌──────────────────┐     │    ┌───────────────────────┐      │
│  │                  │     │    │  [← Back to Sign In]   │      │
│  │   [Email/Lock    │     │    └───────────────────────┘      │
│  │   Illustration   │     │                                     │
│  │   SVG]           │     │    ┌───────────────────────┐      │
│  │                  │     │    │  Reset Password        │      │
│  │  200x200px       │     │    │  Enter your email...   │      │
│  │                  │     │    └───────────────────────┘      │
│  └──────────────────┘     │                                     │
│                            │    ┌───────────────────────┐      │
│  [Secure Access]           │    │  EMAIL ADDRESS         │      │
│  Badge                     │    │  [input field]         │      │
│                            │    │  [inline error]        │      │
│  "Enterprise-grade         │    └───────────────────────┘      │
│  security and              │                                     │
│  encryption"               │    ┌───────────────────────┐      │
│                            │    │  [Send Reset Link →]   │      │
│  ○ ○ ○                     │    │  Full-width Button     │      │
│  Decorative                │    └───────────────────────┘      │
│  Circles                   │                                     │
│                            │                                     │
│                            │    --- OR (after submission) ---   │
│                            │                                     │
│                            │    ┌───────────────────────┐      │
│                            │    │   [✓ Checkmark]        │      │
│                            │    │   Reset link sent!     │      │
│                            │    │   Check your inbox at  │      │
│                            │    │   admin@company.com    │      │
│                            │    │                        │      │
│                            │    │  [← Back to Sign In]   │      │
│                            │    └───────────────────────┘      │
│                            │                                     │
└────────────────────────────────────────────────────────────────┘
```

### Components Used:
- ✅ Back button (returns to Screen 1)
- ✅ Email input with validation
- ✅ Submit button with loading state
- ✅ Success state (conditional)
- ✅ Success checkmark animation
- ✅ Return to login button

### Flow:
1. Enter email → validates on blur
2. Click "Send Reset Link" → validates → shows loading → success
3. Success state appears with checkmark
4. Click "Back to Sign In" → returns to Screen 1

---

## 📱 Screen 3: Success Screen

```
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│  LEFT PANEL (40%)          │    RIGHT PANEL (60%)              │
│  Dark Background           │    Theme-based Background         │
│  ┌──────────────────┐     │    ┌───────────────────────┐      │
│  │                  │     │    │                        │      │
│  │   [Shield with   │     │    │    [✓ Checkmark]       │      │
│  │   Checkmark      │     │    │    Animated (80px)     │      │
│  │   Animated SVG]  │     │    │                        │      │
│  │                  │     │    └───────────────────────┘      │
│  │  200x200px       │     │                                     │
│  │  Green colors    │     │    ┌───────────────────────┐      │
│  │                  │     │    │  Authentication        │      │
│  └──────────────────┘     │    │  Successful            │      │
│                            │    └───────────────────────┘      │
│  [Authenticated]           │                                     │
│  Badge (green)             │    ┌───────────────────────┐      │
│                            │    │  JWT Token Issued ✓    │      │
│  "Your session is          │    │  (Green badge)         │      │
│  now active and            │    └───────────────────────┘      │
│  secure"                   │                                     │
│                            │    ┌───────────────────────┐      │
│  ○ ○ ○                     │    │  Logged in as          │      │
│  Decorative                │    │  Alex Morgan           │      │
│  Circles                   │    │  Role: Administrator   │      │
│                            │    └───────────────────────┘      │
│                            │                                     │
│                            │    ┌───────────────────────┐      │
│                            │    │  Active Token:         │      │
│                            │    │  Bearer eyJ...         │      │
│                            │    │  [JWT token active]    │      │
│                            │    │  (Monospace font)      │      │
│                            │    └───────────────────────┘      │
│                            │                                     │
│                            │    ┌───────────────────────┐      │
│                            │    │  [Sign Out] Button     │      │
│                            │    │  (Red/Error color)     │      │
│                            │    └───────────────────────┘      │
│                            │                                     │
└────────────────────────────────────────────────────────────────┘
```

### Components Used:
- ✅ Animated checkmark (Motion library)
- ✅ Success message
- ✅ JWT badge (green)
- ✅ User information card
- ✅ Token display (monospace)
- ✅ Sign out button

### Flow:
1. Screen mounts with animations (fade in, slide up)
2. Checkmark animates (scale + rotate)
3. All information displayed
4. Click "Sign Out" → calls onLogout → returns to Screen 1

---

## 🎨 Theme Comparison

### Light Theme
```
┌────────────────────────────────┐
│  LEFT PANEL                    │
│  Always Dark (#1A1A2E)         │
│  Golden Accent (#E8B86D)       │
│                                │
│  RIGHT PANEL                   │
│  White Background (#FFFFFF)    │
│  Dark Text (#1A1A2E)           │
│  Warm Input BG (#F5F3EF)       │
│  Dark Button (#1A1A2E)         │
└────────────────────────────────┘
```

### Dark Theme
```
┌────────────────────────────────┐
│  LEFT PANEL                    │
│  Darker Background (#0A0A14)   │
│  Golden Accent (#E8B86D)       │
│                                │
│  RIGHT PANEL                   │
│  Dark Blue BG (#16162A)        │
│  Light Text (#F0EDE8)          │
│  Darker Input BG (#1E1E32)     │
│  Golden Button (#E8B86D)       │
└────────────────────────────────┘
```

---

## 📐 Responsive Breakpoints

### Desktop (> 1024px)
```
┌─────────────────────────────────────────┐
│ [40% Left Panel] │ [60% Right Panel]    │
│                  │                       │
│  Illustration    │  Full form with       │
│  + Description   │  optimal spacing      │
│                  │                       │
└─────────────────────────────────────────┘
```

### Tablet (768px - 1024px)
```
┌─────────────────────────────────────────┐
│ [35% Left]      │ [65% Right]           │
│                 │                        │
│ Slightly        │ Adjusted form          │
│ narrower        │ spacing                │
│                 │                        │
└─────────────────────────────────────────┘
```

### Mobile (< 768px)
```
┌───────────────────────────┐
│   LEFT PANEL (40vh)       │
│   Becomes header          │
│   Illustration centered   │
├───────────────────────────┤
│   RIGHT PANEL (60vh)      │
│   Full width              │
│   Stacked vertically      │
│   Optimized spacing       │
│   Touch-friendly inputs   │
└───────────────────────────┘
```

---

## 🔄 State Flow Diagram

```
┌─────────────┐
│   Initial   │
│   State     │
└──────┬──────┘
       │
       ▼
┌─────────────┐     Forgot Password?     ┌──────────────┐
│   Login     │ ──────────────────────→  │   Forgot     │
│   Screen    │                          │   Password   │
│  (Screen 1) │ ←──────────────────────  │  (Screen 2)  │
└──────┬──────┘     Back to Sign In      └──────────────┘
       │                                          │
       │ Valid Login                              │
       ▼                                          │
┌─────────────┐                                  │
│  Loading    │                                  │
│  State      │                                  │
│  (1.5s)     │                                  │
└──────┬──────┘                                  │
       │                                          │
       ├─→ Success ──→ ┌──────────────┐         │
       │               │   Success     │         │
       │               │   Screen      │         │
       │               │  (Screen 3)   │         │
       │               └───────┬───────┘         │
       │                       │                  │
       │                       │ Sign Out         │
       │                       ▼                  │
       │               ┌──────────────┐          │
       └─→ Error ────→ │   Login      │ ←────────┘
                       │   (Error     │   Reset Success
                       │   Banner)    │
                       └──────────────┘
```

---

## 🎯 Component Interaction Map

```
┌────────────────────────────────────────────────────────┐
│                    LoginAuthModule                     │
│                                                         │
│  ┌────────────────────────────────────────────────┐  │
│  │           useAuth() Custom Hook                │  │
│  │                                                 │  │
│  │  State:                                        │  │
│  │  • isAuthenticated: boolean                   │  │
│  │  • user: User | null                          │  │
│  │  • token: string | null                       │  │
│  │  • isLoading: boolean                         │  │
│  │  • error: string | null                       │  │
│  │                                                 │  │
│  │  Methods:                                      │  │
│  │  • login(credentials): Promise<boolean>       │  │
│  │  • logout(): void                             │  │
│  │  • clearError(): void                         │  │
│  └──────────────────┬─────────────────────────────┘  │
│                     │                                  │
│        ┌────────────┼───────────────┐                │
│        ▼            ▼               ▼                 │
│  ┌─────────┐ ┌──────────┐ ┌──────────────┐         │
│  │ Login   │ │ Forgot   │ │   Success    │         │
│  │ Page    │ │ Password │ │   Screen     │         │
│  └────┬────┘ └────┬─────┘ └───────┬──────┘         │
│       │           │                │                  │
│       └───────────┴────────────────┘                 │
│                   │                                    │
│                   ▼                                    │
│         onLoginSuccess(result)                        │
│         onLogout()                                    │
│                   │                                    │
└───────────────────┼────────────────────────────────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │   Parent App (App.tsx) │
        │   • Stores result      │
        │   • Handles navigation │
        │   • Manages theme      │
        └───────────────────────┘
```

---

## 📦 File Dependencies

```
index.ts (Main Export)
  │
  ├─→ types/index.ts (Interfaces)
  │
  ├─→ hooks/useAuth.ts
  │     └─→ types/index.ts
  │
  ├─→ components/LoginPage.tsx
  │     ├─→ types/index.ts
  │     └─→ lucide-react (icons)
  │
  ├─→ components/ForgotPassword.tsx
  │     ├─→ types/index.ts
  │     └─→ lucide-react (icons)
  │
  ├─→ components/SuccessScreen.tsx
  │     ├─→ types/index.ts
  │     ├─→ motion/react (animations)
  │     └─→ lucide-react (icons)
  │
  └─→ styles/auth.css
        └─→ Google Fonts (external)
```

---

## 🎨 Animation Timeline

### Login Page Entry
```
0ms    │ Component mounts
       │
100ms  │ fadeInUp animation starts
       │ • opacity: 0 → 1
       │ • translateY: 20px → 0
       │
500ms  │ Animation complete
       │
       │ Illustration floating animation (continuous)
       │ • translateY: 0 → -10px → 0 (3s loop)
```

### Login Button Click
```
0ms    │ Button clicked
       │
0ms    │ Validation runs (synchronous)
       │ ├─→ Valid: Continue
       │ └─→ Invalid: Show errors, stop
       │
10ms   │ Loading state activates
       │ • Spinner appears
       │ • Text changes to "Authenticating..."
       │ • Button disabled
       │
1500ms │ Mock API response
       │ ├─→ Success: Navigate to success screen
       │ └─→ Error: Show error banner, enable button
```

### Success Screen Entry
```
0ms    │ Component mounts
       │
300ms  │ Content reveal delay
       │
300ms  │ Animations start
       │ • Checkmark: scale 0 → 1, rotate -180° → 0°
       │ • Content: fadeInUp
       │ • Shield SVG: path drawing animation
       │
900ms  │ All animations complete
```

---

## 🔍 Quick Reference

### Props
```typescript
appName: string          // "Acme Corp"
appTagline: string       // "Admin Portal"
theme: "light" | "dark"  // Visual theme
onLoginSuccess: fn       // Called with { user, token }
onLogout: fn             // Called when user signs out
```

### Demo Credentials
```
Email:    admin@company.com
Password: Admin@123
```

### Key Files
```
Main Export:    /src/index.ts
Auth Hook:      /src/hooks/useAuth.ts
Login Screen:   /src/components/LoginPage.tsx
Styles:         /src/styles/auth.css
Types:          /src/types/index.ts
```

### Important Classes
```css
.auth-split-container     // Main container
.auth-left-panel          // Left side (40%)
.auth-right-panel         // Right side (60%)
.auth-button              // All buttons
.auth-input               // All inputs
.auth-error-banner        // Error display
```

---

**Navigate the codebase with confidence using this visual guide!**
