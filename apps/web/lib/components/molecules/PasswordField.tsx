import { Input } from "./Input";

// Geef alle Input props door behalve type omdat wij die zelf vastzetten.
export function PasswordField(props: Omit<React.ComponentProps<typeof Input>, "type">) {
  return (
    <Input type="password" autoComplete="current-password" {...props} />
  );
}