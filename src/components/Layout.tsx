import React from "react"
import Link from "next/link"

export const Layout: React.FC = ({ children }) => (
  <div>
    <header>
      <p>
        <Link href="/">This is a header</Link>
      </p>
      <p>
        <Link href="/about">About</Link>
      </p>
    </header>
    <main>{children}</main>
  </div>
)
