import { cn } from "@/lib/utils";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import * as React from "react";
import type * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import type * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

type MenuPrimitiveSet =
  | typeof ContextMenuPrimitive
  | typeof DropdownMenuPrimitive;

interface MenuFactoryOptions {
  transformOriginVar: string;
  availableHeightVar: string;
  defaultContentProps?: Record<string, unknown>;
  chevronClassName?: string;
}

const subTriggerClass =
  "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";
const itemClass =
  "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";
const checkboxItemClass =
  "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";
const labelClass = "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8";
const separatorClass = "bg-border -mx-1 my-1 h-px";
const shortcutClass = "text-muted-foreground ml-auto text-xs tracking-widest";

const menuContentClass = (
  transformOriginVar: string,
  availableHeightVar: string
) =>
  `bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(${availableHeightVar}) min-w-[8rem] origin-(${transformOriginVar}) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md`;

const menuSubContentClass = (transformOriginVar: string) =>
  `bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(${transformOriginVar}) overflow-hidden rounded-md border p-1 shadow-lg`;

function withSlot(
  Component: React.ComponentType<any>,
  slot: string
) {
  return function WithSlot(props: any) {
    return <Component data-slot={slot} {...props} />;
  };
}

function createMenuContent(
  PortalComponent: React.ComponentType<any>,
  ContentComponent: React.ComponentType<any>,
  slot: string,
  transformOriginVar: string,
  availableHeightVar: string,
  defaultContentProps?: Record<string, unknown>
) {
  return function MenuContent({ className, ...props }: any) {
    return (
      <PortalComponent data-slot={`${slot}-portal`}>
        <ContentComponent
          data-slot={slot}
          className={cn(
            menuContentClass(transformOriginVar, availableHeightVar),
            className
          )}
          {...defaultContentProps}
          {...props}
        />
      </PortalComponent>
    );
  };
}

function createMenuSubTrigger(
  Component: React.ComponentType<any>,
  slot: string,
  chevronClassName: string
) {
  return function MenuSubTrigger({
    className,
    inset,
    children,
    ...props
  }: any) {
    return (
      <Component
        data-slot={slot}
        data-inset={inset}
        className={cn(subTriggerClass, className)}
        {...props}
      >
        {children}
        <ChevronRightIcon className={chevronClassName} />
      </Component>
    );
  };
}

function createMenuSubContent(
  Component: React.ComponentType<any>,
  slot: string,
  transformOriginVar: string
) {
  return function MenuSubContent({ className, ...props }: any) {
    return (
      <Component
        data-slot={slot}
        className={cn(
          menuSubContentClass(transformOriginVar),
          className
        )}
        {...props}
      />
    );
  };
}

function createMenuItem(
  Component: React.ComponentType<any>,
  slot: string
) {
  return function MenuItem({
    className,
    inset,
    variant = "default",
    ...props
  }: any) {
    return (
      <Component
        data-slot={slot}
        data-inset={inset}
        data-variant={variant}
        className={cn(itemClass, className)}
        {...props}
      />
    );
  };
}

function createMenuCheckboxItem(
  Component: React.ComponentType<any>,
  IndicatorComponent: React.ComponentType<any>,
  slot: string
) {
  return function MenuCheckboxItem({
    className,
    children,
    checked,
    ...props
  }: any) {
    return (
      <Component
        data-slot={slot}
        className={cn(checkboxItemClass, className)}
        checked={checked}
        {...props}
      >
        <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
          <IndicatorComponent>
            <CheckIcon className="size-4" />
          </IndicatorComponent>
        </span>
        {children}
      </Component>
    );
  };
}

function createMenuRadioItem(
  Component: React.ComponentType<any>,
  IndicatorComponent: React.ComponentType<any>,
  slot: string
) {
  return function MenuRadioItem({
    className,
    children,
    ...props
  }: any) {
    return (
      <Component
        data-slot={slot}
        className={cn(checkboxItemClass, className)}
        {...props}
      >
        <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
          <IndicatorComponent>
            <CircleIcon className="size-2 fill-current" />
          </IndicatorComponent>
        </span>
        {children}
      </Component>
    );
  };
}

function createMenuLabel(
  Component: React.ComponentType<any>,
  slot: string
) {
  return function MenuLabel({
    className,
    inset,
    ...props
  }: any) {
    return (
      <Component
        data-slot={slot}
        data-inset={inset}
        className={cn(labelClass, className)}
        {...props}
      />
    );
  };
}

function createMenuSeparator(
  Component: React.ComponentType<any>,
  slot: string
) {
  return function MenuSeparator({ className, ...props }: any) {
    return (
      <Component
        data-slot={slot}
        className={cn(separatorClass, className)}
        {...props}
      />
    );
  };
}

function createMenuShortcut(slot: string) {
  return function MenuShortcut({ className, ...props }: any) {
    return (
      <span
        data-slot={slot}
        className={cn(shortcutClass, className)}
        {...props}
      />
    );
  };
}

export function createMenuComponents(
  slotPrefix: string,
  primitive: MenuPrimitiveSet,
  options: MenuFactoryOptions
) {
  const Root = withSlot(primitive.Root, slotPrefix);
  const Trigger = withSlot(
    primitive.Trigger,
    `${slotPrefix}-trigger`
  );
  const Group = withSlot(primitive.Group, `${slotPrefix}-group`);
  const Portal = withSlot(primitive.Portal, `${slotPrefix}-portal`);
  const Sub = withSlot(primitive.Sub, `${slotPrefix}-sub`);
  const RadioGroup = withSlot(
    primitive.RadioGroup,
    `${slotPrefix}-radio-group`
  );

  const SubTrigger = createMenuSubTrigger(
    primitive.SubTrigger,
    `${slotPrefix}-sub-trigger`,
    options.chevronClassName ?? "ml-auto size-4"
  );

  const SubContent = createMenuSubContent(
    primitive.SubContent,
    `${slotPrefix}-sub-content`,
    options.transformOriginVar
  );

  const Content = createMenuContent(
    primitive.Portal,
    primitive.Content,
    `${slotPrefix}-content`,
    options.transformOriginVar,
    options.availableHeightVar,
    options.defaultContentProps
  );

  const Item = createMenuItem(
    primitive.Item,
    `${slotPrefix}-item`
  );

  const CheckboxItem = createMenuCheckboxItem(
    primitive.CheckboxItem,
    primitive.ItemIndicator,
    `${slotPrefix}-checkbox-item`
  );

  const RadioItem = createMenuRadioItem(
    primitive.RadioItem,
    primitive.ItemIndicator,
    `${slotPrefix}-radio-item`
  );

  const Label = createMenuLabel(
    primitive.Label,
    `${slotPrefix}-label`
  );

  const Separator = createMenuSeparator(
    primitive.Separator,
    `${slotPrefix}-separator`
  );

  const Shortcut = createMenuShortcut(
    `${slotPrefix}-shortcut`
  );

  return {
    Root,
    Trigger,
    Group,
    Portal,
    Sub,
    RadioGroup,
    Content,
    SubTrigger,
    SubContent,
    Item,
    CheckboxItem,
    RadioItem,
    Label,
    Separator,
    Shortcut,
  };
}
