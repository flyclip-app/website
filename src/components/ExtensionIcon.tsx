"use client";

import { useState } from "react";

interface Props {
  icon: string;
  name?: string;
  className?: string;
  size?: number;
}

export default function ExtensionIcon({ icon, name, className = "w-5 h-5", size = 20 }: Props) {
  const [hasError, setHasError] = useState(false);

  // Case 1: Iconify string: "iconify:simple-icons:baidu" or "iconify:lucide:calculator"
  if (icon.startsWith("iconify:") && !hasError) {
    const parts = icon.replace(/^iconify:/, "").split(":");
    if (parts.length >= 2) {
      const prefix = parts[0];
      const iconName = parts.slice(1).join(":");
      const iconUrl = `https://api.iconify.design/${prefix}/${iconName}.svg?color=%2360a5fa`;

      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={iconUrl}
          alt={iconName}
          width={size}
          height={size}
          className={`${className} object-contain`}
          onError={() => setHasError(true)}
          loading="lazy"
        />
      );
    }
  }

  // Case 2: Direct URL / SVG data URI
  if ((icon.startsWith("http://") || icon.startsWith("https://") || icon.startsWith("data:image/")) && !hasError) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={icon}
        alt={name || "icon"}
        width={size}
        height={size}
        className={`${className} object-contain`}
        onError={() => setHasError(true)}
        loading="lazy"
      />
    );
  }

  // Case 3: Short text / Emoji (e.g. "ST", "⏱️", "123", "Aa", "MD", "⚡")
  if (icon.length <= 4 && !icon.includes(":")) {
    return (
      <span className="font-bold text-sm select-none leading-none flex items-center justify-center">
        {icon}
      </span>
    );
  }

  // Fallback: If Iconify failed or format is unrecognized, show clean letter badge
  const fallbackText = icon.replace(/^iconify:[^:]+:/, "").slice(0, 2).toUpperCase() || (name ? name.slice(0, 2).toUpperCase() : "⚡");

  return (
    <span className="font-bold text-xs select-none leading-none tracking-tighter text-blue-400">
      {fallbackText}
    </span>
  );
}
