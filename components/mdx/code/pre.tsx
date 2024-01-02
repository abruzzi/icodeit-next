import { CopyButton } from "./copy-code";

interface PrePropsType extends React.HTMLAttributes<HTMLPreElement> {
  raw?: string;
  children?: React.ReactNode;
}

export const Pre = ({ children, raw, ...rest }: PrePropsType) => {
  return (
    <pre {...rest} className={`relative p-0`}>
      <div className={`top-[1.25rem] right-[1.25rem] absolute`}>
        <CopyButton text={raw ?? ""} />
      </div>
      {children}
    </pre>
  );
};
