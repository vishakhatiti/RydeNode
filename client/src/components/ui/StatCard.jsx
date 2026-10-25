import React from "react";

import GlassCard from "../GlassCard";
import Icon from "./Icon";

function StatCard({ icon, label, value, hint }) {
  return (
    <GlassCard className="flex items-center gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand/25 to-accent/25 text-brand">
        <Icon name={icon} size={22} />
      </span>
      <div className="min-w-0">
        <p className="text-sm text-muted">{label}</p>
        <p className="truncate text-2xl font-bold text-fg">{value}</p>
        {hint && <p className="text-xs text-subtle">{hint}</p>}
      </div>
    </GlassCard>
  );
}

export default StatCard;
