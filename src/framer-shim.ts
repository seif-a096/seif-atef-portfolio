export const ControlType = {
  Image: "image",
  Enum: "enum",
  Color: "color",
  Number: "number",
  Boolean: "boolean",
} as const;

// Framer injects this at design-time; for local Vite preview this is a no-op.
export function addPropertyControls(_component: unknown, _controls: unknown) {
  return;
}
