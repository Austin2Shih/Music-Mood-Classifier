import { useState } from 'react';

export default function useToggle(initState: boolean) {
  const [state, setState] = useState(initState);
  const toggleState = () => {
    setState((prev) => !prev);
  };

  const setOn = () => setState(true);
  const setOff = () => setState(false);
  return [state, toggleState, setOn, setOff] as const;
}
