import React, { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
  onContentEndVisible: () => void;
}

class Options {
  constructor(
    public rootMargin: string,
    public threshold: number,
    public root: HTMLElement | null
  ) {}
}

export function Observer({ children, onContentEndVisible }: Props) {
  const endContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options: Options = new Options("0px", 1.0, null);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
}
