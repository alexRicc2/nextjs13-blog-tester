"use client"
import { ReactNode, useState } from "react";
import s from "./LineButton.module.css";
import cn from "clsx";
import Link from "next/link";
interface LineButtonProps {
  onClick?: any;
  children?: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  href?: any;
  aria?: string | undefined;
}

const LineButton = ({
  onClick,
  children,
  className,
  variant = "primary",
  href,
  type,
  aria = undefined
}: LineButtonProps) => {
  const [hovered, setHovered] = useState(false);
  const mouseEnter = () => {
    setHovered(true);
    setTimeout(() => setHovered(false), 1200);
  };

  const lineStyle = cn(s.line, {
    [s.primary]: variant === "primary",
    [s.secondary]: variant === "secondary",
  });
  
  //if href is not null it means the line button must return a link component
  if (href) {
    return (
      <Link
        href={href}
        className={`${s.back} ${className}`}
        onMouseEnter={mouseEnter}
        aria-label={aria}
      >
        {children}
        {/* <span className={`${lineStyle} ${hovered && s.hovered} `}></span> */}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${s.back} ${className}`}
      onMouseEnter={mouseEnter}
      type={type}
    >
      {children}
      <span className={`${lineStyle} ${hovered && s.hovered} `}></span>
    </button>
  );
};
export default LineButton;
