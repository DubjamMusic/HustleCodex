import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { createMenuComponents } from "./menu-shared";

const {
  Root: ContextMenu,
  Trigger: ContextMenuTrigger,
  Content: ContextMenuContent,
  SubTrigger: ContextMenuSubTrigger,
  SubContent: ContextMenuSubContent,
  Item: ContextMenuItem,
  CheckboxItem: ContextMenuCheckboxItem,
  RadioItem: ContextMenuRadioItem,
  Label: ContextMenuLabel,
  Separator: ContextMenuSeparator,
  Shortcut: ContextMenuShortcut,
  Group: ContextMenuGroup,
  Portal: ContextMenuPortal,
  Sub: ContextMenuSub,
  RadioGroup: ContextMenuRadioGroup,
} = createMenuComponents("context-menu", ContextMenuPrimitive, {
  transformOriginVar: "--radix-context-menu-content-transform-origin",
  availableHeightVar: "--radix-context-menu-content-available-height",
  chevronClassName: "ml-auto",
});

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};
