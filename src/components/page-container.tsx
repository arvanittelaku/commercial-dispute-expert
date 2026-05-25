import { cn } from "@/lib/utils";
import { PAGE_CONTAINER_CLASS } from "@/lib/ui-classes";

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
  size?: "md" | "lg";
  as?: "div" | "article" | "main";
};

const maxWidthClass = {
  md: "max-w-3xl",
  lg: "max-w-5xl",
} as const;

export function PageContainer({
  children,
  className,
  size = "md",
  as: Tag = "div",
}: PageContainerProps) {
  return (
    <Tag className={cn(PAGE_CONTAINER_CLASS, maxWidthClass[size], className)}>
      {children}
    </Tag>
  );
}
