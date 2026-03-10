import { Input } from "@/lib/components";

// Geef alle Input props door behalve type omdat wij die zelf vastzetten.
export function PasswordField(props: Omit<React.ComponentProps<typeof Input>, "type">) {
  return (
    <Input type="password" required autoComplete="current-password" {...props} />
  );
}