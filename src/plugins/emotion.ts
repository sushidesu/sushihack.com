import EmStyled, { CreateStyled } from "@emotion/styled"

export type Theme = {
  color: {
    primary: string
    secondary: string
    accent: string
  }
}

export const styled = EmStyled as CreateStyled<Theme>
