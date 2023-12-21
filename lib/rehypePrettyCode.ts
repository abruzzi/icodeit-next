import {type LineElement, type Options} from "rehype-pretty-code"

export const rehypePrettyCodeOptions: Partial<Options> = {
  theme: {
    light: "solarized-light",
    dark: "github-dark-dimmed"
  },
  keepBackground: false
}