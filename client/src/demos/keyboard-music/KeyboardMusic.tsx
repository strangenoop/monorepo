import React, { useEffect, useState } from "react";

const KeyboardMusic = () => {
  const [keys, setKeys] = useState<string[]>([]);
  useEffect(() => {
    const addKey = (e: KeyboardEvent) => {
      console.log("keydown");
      const newKey = e.key;
      if (!keys.includes(newKey)) {
        setKeys([...keys, newKey]);
      }
    };
    const removeKey = (e: KeyboardEvent) => {
      const oldKey = e.key;
      setKeys(keys.filter(key => key !== oldKey));
    };
    window.addEventListener("keydown", addKey);
    window.addEventListener("keyup", removeKey);
    return () => {
      window.removeEventListener("keydown", addKey);
      window.removeEventListener("keyup", removeKey);
    };
  });
  return <div>{keys}</div>;
};

export default KeyboardMusic;
