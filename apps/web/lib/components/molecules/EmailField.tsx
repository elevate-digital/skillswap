import { Input } from "@/lib/components";

// Geef alle Input props door behalve type omdat wij die zelf vastzetten.
export function EmailField(props: Omit<React.ComponentProps<typeof Input>, "type">) {
  return (
    <Input type="email" required autoComplete="email" {...props} />
  );
}