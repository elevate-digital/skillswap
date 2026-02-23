import { Input } from "./Input";

// Geef alle Input props door behalve type omdat wij die zelf vastzetten.
export function NameField(props: Omit<React.ComponentProps<typeof Input>, "type">) {
  return ( 
    <Input type="text" autoComplete="name" {...props} />
  );
}