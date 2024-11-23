import { useCallback, useState } from "react";

export default function useToggleState(defaultValue?: boolean) {
  const [state, setState] = useState(defaultValue || false);

  const toggle = useCallback(() => {
    setState((cur) => !cur);
  }, []);

  return [state, toggle] satisfies [boolean, () => void];
}
