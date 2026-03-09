import { Input } from "@/lib/components";

export function TextField(props: Omit<React.ComponentProps<typeof Input>, "type">) {
  return (
    <Input type="text" required {...props} />
  );
}