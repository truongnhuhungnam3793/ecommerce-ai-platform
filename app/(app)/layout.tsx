import { ClerkProvider } from "@clerk/nextjs"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <main>{children}</main>
    </ClerkProvider>
  )
}
export default layout
