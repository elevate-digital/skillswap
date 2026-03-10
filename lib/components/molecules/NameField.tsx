import { Input } from "@/lib/components";

// Geef alle Input props door behalve type omdat wij die zelf vastzetten.
export function NameField(props: Omit<React.ComponentProps<typeof Input>, "type">) {
  return ( 
    <Input type="text" required autoComplete="name" {...props} />
  );
}