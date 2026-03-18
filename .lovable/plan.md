

## Plan: Full-screen Onboarding Chat + Chat-driven Navigation

### Problem
1. The chat panel only takes 50% width (flex-1 basis-0) -- it should be full screen when on the welcome step (step 0)
2. When the user types in the chat, it should trigger the same navigation behavior as clicking the "Start Setup" button (advance to step 1, show chat alongside content)

### Changes

**`src/pages/Onboarding.tsx`**
- On step 0 without having started: show OnboardingChat full-screen (no split layout), hide the welcome content
- When user sends first message in chat at step 0, auto-advance to step 1 (same as clicking "Start Setup")
- Pass an `onUserMessage` callback to OnboardingChat that calls `setStep(1)` when on step 0
- On step >= 1: keep current split layout (chat left, content right)
- Adjust the welcome screen: clicking "Start Setup" still works as before (setStep(1) + setShowChat(true))
- Clicking "AI Help" on welcome opens the full-screen chat (setShowChat(true), stay on step 0)

**`src/components/onboarding/OnboardingChat.tsx`**
- Accept new prop `onUserMessage?: () => void`
- Call `onUserMessage()` when the user sends their first message (in the `send` function, before streaming)
- This triggers step advancement from the parent

### Layout Logic Summary

```text
step=0, showChat=false  → Welcome screen (full width)
step=0, showChat=true   → Chat full screen (no split)
step>=1, showChat=true  → Chat left (50%) | Content right (50%)
```

### Technical Details
- In Onboarding.tsx, conditionally render: if `step === 0 && showChat`, render only the chat div with `flex-1` (no basis-0 split). Otherwise keep current split.
- The `onUserMessage` callback in Onboarding: `() => { if (step === 0) setStep(1); }`
- OnboardingChat calls `onUserMessage?.()` once inside `send()` before streaming starts

