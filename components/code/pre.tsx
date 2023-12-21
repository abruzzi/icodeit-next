import { CopyButton } from "./copy-code";

interface PrePropsType extends React.HTMLAttributes<HTMLPreElement> {
  raw: string;
  children: React.ReactNode;
  'data-language'?: string;
}
export const Pre = ({ children, raw, ...rest }: PrePropsType) => {
  console.log(raw);
  const lang = rest["data-language"] || "shell";
  return (
    <pre {...rest} className={"p-0"}>
      <div className={"code-header"}>
        {lang}
        <CopyButton text={raw} />
      </div>
      {children}
    </pre>
  );
};
