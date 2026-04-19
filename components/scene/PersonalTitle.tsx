"use client";

import { memoryConfig } from "@/lib/memoryConfig";

export function PersonalTitle() {
  return (
    <div className="personal-title">
      <span className="title-kicker">for one heart only</span>
      <h1>{memoryConfig.titleText}</h1>
      <p>{memoryConfig.subtitleText}</p>
    </div>
  );
}
