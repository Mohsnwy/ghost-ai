import { SignUp } from "@clerk/nextjs"

import { AuthPanel } from "@/components/auth/auth-panel"
import { clerkAppearance } from "@/lib/clerk-appearance"

export default function SignUpPage() {
  return (
    <AuthPanel mode="sign-up">
      <SignUp
        appearance={clerkAppearance}
        fallbackRedirectUrl="/editor"
        signInUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "/sign-in"}
      />
    </AuthPanel>
  )
}
