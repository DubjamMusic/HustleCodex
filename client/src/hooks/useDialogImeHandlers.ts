import { useDialogComposition } from "@/components/ui/dialog";
import { useComposition } from "@/hooks/useComposition";
import * as React from "react";

type ShouldBlockEnter<T extends HTMLInputElement | HTMLTextAreaElement> = (
  event: React.KeyboardEvent<T>,
  isComposing: boolean
) => boolean;

interface UseDialogImeHandlersOptions<
  T extends HTMLInputElement | HTMLTextAreaElement,
> {
  onKeyDown?: React.KeyboardEventHandler<T>;
  onCompositionStart?: React.CompositionEventHandler<T>;
  onCompositionEnd?: React.CompositionEventHandler<T>;
  shouldBlockEnter: ShouldBlockEnter<T>;
}

export function useDialogImeHandlers<
  T extends HTMLInputElement | HTMLTextAreaElement,
>({
  onKeyDown,
  onCompositionEnd,
  onCompositionStart,
  shouldBlockEnter,
}: UseDialogImeHandlersOptions<T>) {
  const dialogComposition = useDialogComposition();

  return useComposition<T>({
    onKeyDown: e => {
      const isComposing =
        (e.nativeEvent as any).isComposing ||
        dialogComposition.justEndedComposing();

      if (e.key === "Enter" && shouldBlockEnter(e, isComposing)) {
        return;
      }

      onKeyDown?.(e);
    },
    onCompositionStart: e => {
      dialogComposition.setComposing(true);
      onCompositionStart?.(e);
    },
    onCompositionEnd: e => {
      dialogComposition.markCompositionEnd();
      setTimeout(() => {
        dialogComposition.setComposing(false);
      }, 100);
      onCompositionEnd?.(e);
    },
  });
}
