import { dark } from "@clerk/ui/themes"

const clerkAppearance = {
  theme: dark,
  variables: {
    colorBackground: "var(--card)",
    colorDanger: "var(--destructive)",
    colorInputBackground: "var(--input)",
    colorInputText: "var(--foreground)",
    colorPrimary: "var(--primary)",
    colorText: "var(--foreground)",
    colorTextSecondary: "var(--muted-foreground)",
    borderRadius: "var(--radius)",
    fontFamily: "var(--font-sans)",
  },
  elements: {
    cardBox: {
      backgroundColor: "var(--card)",
      borderColor: "var(--border)",
      boxShadow: "var(--shadow-soft)",
      maxWidth: "30rem",
      width: "100%",
    },
    card: {
      backgroundColor: "var(--card)",
      borderColor: "var(--border)",
      padding: "2.25rem",
    },
    footer: {
      backgroundColor: "var(--card)",
      borderColor: "var(--border)",
    },
    headerTitle: {
      color: "var(--foreground)",
      fontFamily: "var(--font-sans)",
      fontSize: "1.5rem",
      fontWeight: "600",
      letterSpacing: "0",
    },
    headerSubtitle: {
      color: "var(--muted-foreground)",
      fontFamily: "var(--font-sans)",
    },
    socialButtonsBlockButton: {
      backgroundColor: "var(--card)",
      borderColor: "var(--border)",
      color: "var(--foreground)",
    },
    formButtonPrimary: {
      color: "var(--primary-foreground)",
      fontFamily: "var(--font-sans)",
      fontWeight: "600",
      minHeight: "3rem",
    },
    formFieldInput: {
      backgroundColor: "var(--input)",
      borderColor: "var(--border)",
      color: "var(--foreground)",
      minHeight: "3rem",
    },
    formFieldLabel: {
      color: "var(--foreground)",
      fontFamily: "var(--font-sans)",
      fontWeight: "600",
    },
    footerActionLink: {
      color: "var(--primary)",
      fontWeight: "600",
    },
  },
}

export { clerkAppearance }
