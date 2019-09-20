import React, { useRef } from "react";
import { useEscape, useClickOutside } from "./hooks";

type Props = {
  onClickOutside: () => void;
  onEscape: () => void;
  children: React.ReactChild;
};

const InterfaceBoundary = ({ onClickOutside, onEscape, children }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, onClickOutside);
  useEscape(onEscape);

  return <div ref={containerRef}>{children}</div>;
};

export default InterfaceBoundary;
