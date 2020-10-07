import React from "react"

export const Layout: React.FC = ({ children }) => (
  <div>
    <header>
      <p>this is a header</p>
    </header>
    <main>{children}</main>
  </div>
)
