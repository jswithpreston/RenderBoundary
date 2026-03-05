import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import { CopyButton } from "@/components/ui/CopyButton";

function Pre(props: React.ComponentProps<"pre">) {
  return (
    <pre {...props} className={`${props.className ?? ""} group relative`}>
      <CopyButton />
      {props.children}
    </pre>
  );
}

function CustomLink(
  props: React.AnchorHTMLAttributes<HTMLAnchorElement>
) {
  const href = props.href ?? "";

  if (href.startsWith("/")) {
    return <Link href={href} {...props} />;
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props: React.ComponentProps<typeof Image>) {
  return <Image className="rounded-lg" {...props} />;
}

function Callout({
  children,
  type = "info",
}: {
  children: React.ReactNode;
  type?: "info" | "warning" | "error";
}) {
  const styles = {
    info: "border-blue-500/30 bg-blue-50 dark:bg-blue-950/30",
    warning: "border-yellow-500/30 bg-yellow-50 dark:bg-yellow-950/30",
    error: "border-red-500/30 bg-red-50 dark:bg-red-950/30",
  };

  return (
    <div
      className={`my-6 rounded-lg border-l-4 p-4 text-sm ${styles[type]}`}
      role="note"
    >
      {children}
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  pre: Pre,
  a: CustomLink as never,
  img: RoundedImage as never,
  Image: RoundedImage,
  Callout,
};
