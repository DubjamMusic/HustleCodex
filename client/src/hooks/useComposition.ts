import { useRef, useEffect } from "react";
import { usePersistFn } from "./usePersistFn";

export interface UseCompositionReturn<
  T extends HTMLInputElement | HTMLTextAreaElement,
> {
  onCompositionStart: React.CompositionEventHandler<T>;
  onCompositionEnd: React.CompositionEventHandler<T>;
  onKeyDown: React.KeyboardEventHandler<T>;
  isComposing: () => boolean;
}

export interface UseCompositionOptions<
  T extends HTMLInputElement | HTMLTextAreaElement,
> {
  onKeyDown?: React.KeyboardEventHandler<T>;
  onCompositionStart?: React.CompositionEventHandler<T>;
  onCompositionEnd?: React.CompositionEventHandler<T>;
}

type TimerResponse = ReturnType<typeof setTimeout>;

export function useComposition<
  T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement,
>(options: UseCompositionOptions<T> = {}): UseCompositionReturn<T> {
  const {
    onKeyDown: originalOnKeyDown,
    onCompositionStart: originalOnCompositionStart,
    onCompositionEnd: originalOnCompositionEnd,
  } = options;

  const isComposingRef = useRef(false);
  const firstTimeoutRef = useRef<TimerResponse | null>(null);
  const safariWorkaroundTimerRef = useRef<TimerResponse | null>(null);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (firstTimeoutRef.current) {
        clearTimeout(firstTimeoutRef.current);
      }
      if (safariWorkaroundTimerRef.current) {
        clearTimeout(safariWorkaroundTimerRef.current);
      }
    };
  }, []);

  const onCompositionStart = usePersistFn((e: React.CompositionEvent<T>) => {
    if (firstTimeoutRef.current) {
      clearTimeout(firstTimeoutRef.current);
      firstTimeoutRef.current = null;
    }
    if (safariWorkaroundTimerRef.current) {
      clearTimeout(safariWorkaroundTimerRef.current);
      safariWorkaroundTimerRef.current = null;
    }
    isComposingRef.current = true;
    originalOnCompositionStart?.(e);
  });

  const onCompositionEnd = usePersistFn((e: React.CompositionEvent<T>) => {
    // 使用两层 setTimeout 来处理 Safari 浏览器中 compositionEnd 先于 onKeyDown 触发的问题
    firstTimeoutRef.current = setTimeout(() => {
      safariWorkaroundTimerRef.current = setTimeout(() => {
        isComposingRef.current = false;
      });
    });
    originalOnCompositionEnd?.(e);
  });

  const onKeyDown = usePersistFn((e: React.KeyboardEvent<T>) => {
    // 在 composition 状态下，阻止 ESC 和 Enter（非 shift+Enter）事件的冒泡
    if (
      isComposingRef.current &&
      (e.key === "Escape" || (e.key === "Enter" && !e.shiftKey))
    ) {
      e.stopPropagation();
      return;
    }
    originalOnKeyDown?.(e);
  });

  const isComposing = usePersistFn(() => {
    return isComposingRef.current;
  });

  return {
    onCompositionStart,
    onCompositionEnd,
    onKeyDown,
    isComposing,
  };
}
