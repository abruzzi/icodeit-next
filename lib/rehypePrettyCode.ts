import {type LineElement, type Options} from "rehype-pretty-code"

export const rehypePrettyCodeOptions: Partial<Options> = {
  onVisitHighlightedLine(element: LineElement) {
    element.properties.className?.push("line--highlighted")
  }
}