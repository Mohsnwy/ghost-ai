import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

function toPathname(url: string) {
  if (url.startsWith("/")) {
    return url
  }

  return new URL(url).pathname
}

const signInUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "/sign-in"
const signUpUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || "/sign-up"
const signInPath = toPathname(signInUrl)
const signUpPath = toPathname(signUpUrl)

const isPublicRoute = createRouteMatcher([
  `${signInPath}(.*)`,
  `${signUpPath}(.*)`,
])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
}, {
  signInUrl,
  signUpUrl,
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
