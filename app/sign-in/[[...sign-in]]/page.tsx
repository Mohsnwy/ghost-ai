import { SignIn } from "@clerk/nextjs"

import { AuthPanel } from "@/components/auth/auth-panel"
import { clerkAppearance } from "@/lib/clerk-appearance"

export default function SignInPage() {
  return (
    <AuthPanel mode="sign-in">
      <SignIn
        appearance={clerkAppearance}
        fallbackRedirectUrl="/editor"
        signUpUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || "/sign-up"}
      />
    </AuthPanel>
  )
}
