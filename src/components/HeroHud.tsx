import type { ComponentType } from "react";

type TechBadge = {
  label: string;
  icon: ComponentType<{ className?: string }>;
  left: string;
  top: string;
  delay: string;
};

type HeroHudProps = {
  badges: TechBadge[];
};

export default function HeroHud({ badges }: HeroHudProps) {
  return (
    <div className="hud-layer">
      <div className="badge-orbit" aria-hidden="true">
        {badges.map((badge) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.label}
              className="tech-badge"
              style={{
                left: badge.left,
                top: badge.top,
                animationDelay: badge.delay,
              }}
            >
              <Icon className="tech-badge-icon" />
              <span>{badge.label}</span>
            </div>
          );
        })}
      </div>

      <div className="hero-bio">
        <span>Full stack developer</span>
        <span>AI enthusiast</span>
      </div>
    </div>
  );
}
