"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import {
  BoldIcon,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  ListRestart,
  Pilcrow,
  RemoveFormatting,
  Strikethrough,
  Underline as UnderlineIcon,
} from "lucide-react";
import React, { useRef, useEffect } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import "~/styles/tiptap.css";
import { cn } from "~/utils/cn";

const Separator = () => {
  return (
    <div className="inline-flex items-center">
      <div className="mx-1 h-3/4 w-px bg-gray-300"></div>
    </div>
  );
};

const BtnGroup = ({
  shouldHide,
  showSeparator = true,
  className,
  children,
}: {
  shouldHide?: boolean;
  showSeparator?: boolean;
  className?: string;
  children: React.ReactNode;
}) => {
  if (shouldHide === false) {
    return (
      <>
        <div className={cn("flex flex-row flex-nowrap gap-1", className)}>
          {children}
        </div>
        {showSeparator && <Separator />}
      </>
    );
  }
};

interface Props {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  disabledMenuItems?: string[];
  children?: React.ReactNode;
  resetToValue?: string;
}

// Creates a Tiptap editor instance
const Tiptap = ({
  value,
  onChange,
  className,
  disabledMenuItems = [],
  children,
  resetToValue,
}: Props) => {
  //Create a ref to the editor wrapper so we can focus on the editor when the component mounts
  const editorWrapper = useRef<HTMLDivElement>(null);

  const inactiveMenuItems = {
    formatting: false,
    headings: false,
    lists: false,
  };

  if (disabledMenuItems.length > 0) {
    disabledMenuItems.forEach((item) => {
      const key = item as keyof typeof inactiveMenuItems;
      inactiveMenuItems[key] = true;
    });
  }

  //Setup a TipTap editor instance with the StarterKit
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    editable: true,
    content: value ?? resetToValue,
    onUpdate() {
      onChange(editor?.getHTML() ?? "");
    },
  });

  //If the ref exists, focus on the editor when the component mounts so the users can start typing right away
  useEffect(() => {
    const proseMirrorDiv = editorWrapper.current?.querySelector(
      ".ProseMirror",
    ) as HTMLElement | null;
    proseMirrorDiv?.focus();
  }, [editorWrapper]);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-gray-300",
        className,
      )}
    >
      {/* On Hover Editor Toolbar */}
      {editor && (
        <div className="editor-toolbar">
          <BtnGroup shouldHide={inactiveMenuItems.formatting}>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={cn(
                      "trigger-bold",
                      editor.isActive("bold") && "is-active",
                    )}
                  >
                    <BoldIcon />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {/* <span>This designator will autofill and cannot be modified</span> */}
                  <div className="max-w-sm">{`Bold`}</div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={cn(
                      "trigger-italic",
                      editor.isActive("italic") && "is-active",
                    )}
                  >
                    <Italic />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {/* <span>This designator will autofill and cannot be modified</span> */}
                  <div className="max-w-sm">{`italic`}</div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={cn(
                      "trigger-strike",
                      editor.isActive("strike") && "is-active",
                    )}
                  >
                    <Strikethrough />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {/* <span>This designator will autofill and cannot be modified</span> */}
                  <div className="max-w-sm">{`Strike`}</div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => editor.commands.toggleUnderline()}
                    className={cn(
                      "trigger-underline",
                      editor.isActive("underline") && "is-active",
                    )}
                  >
                    <UnderlineIcon />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {/* <span>This designator will autofill and cannot be modified</span> */}
                  <div className="max-w-sm">{`Underline`}</div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </BtnGroup>

          <BtnGroup shouldHide={inactiveMenuItems.headings}>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() =>
                      editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                    className={cn(
                      "trigger-h1",
                      editor.isActive("heading", { level: 1 }) && "is-active",
                    )}
                  >
                    <Heading1 />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {/* <span>This designator will autofill and cannot be modified</span> */}
                  <div className="max-w-sm">{`H1`}</div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() =>
                      editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    className={cn(
                      "trigger-h2",
                      editor.isActive("heading", { level: 2 }) && "is-active",
                    )}
                  >
                    <Heading2 />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {/* <span>This designator will autofill and cannot be modified</span> */}
                  <div className="max-w-sm">{`H2`}</div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() =>
                      editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    className={cn(
                      "trigger-h3",
                      editor.isActive("heading", { level: 3 }) && "is-active",
                    )}
                  >
                    <Heading3 />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {/* <span>This designator will autofill and cannot be modified</span> */}
                  <div className="max-w-sm">{`H3`}</div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </BtnGroup>

          <BtnGroup shouldHide={inactiveMenuItems.lists}>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className="trigger-paragraph"
                  >
                    <Pilcrow />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {/* <span>This designator will autofill and cannot be modified</span> */}
                  <div className="max-w-sm">{`Convert to Paragraph`}</div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() =>
                      editor.chain().focus().toggleBulletList().run()
                    }
                    className={cn(
                      "trigger-bullet-list",
                      editor.isActive("bulletList", { level: 2 }) &&
                        "is-active",
                    )}
                  >
                    <List />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {/* <span>This designator will autofill and cannot be modified</span> */}
                  <div className="max-w-sm">{`Bulleted List`}</div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() =>
                      editor.chain().focus().toggleOrderedList().run()
                    }
                    className={cn(
                      "trigger-ordered-list",
                      editor.isActive("orderedList") && "is-active",
                    )}
                  >
                    <ListOrdered />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {/* <span>This designator will autofill and cannot be modified</span> */}
                  <div className="max-w-sm">{`Ordered List`}</div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </BtnGroup>

          <BtnGroup
            className="flex-1 justify-end"
            shouldHide={false}
            showSeparator={false}
          >
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().unsetAllMarks().run()}
                    className="trigger-clear-formatting"
                  >
                    <RemoveFormatting />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {/* <span>This designator will autofill and cannot be modified</span> */}
                  <div className="max-w-sm">{`Clear Formatting`}</div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {resetToValue && (
              <>
                <Separator />
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={() =>
                          editor?.commands.setContent(resetToValue ?? "")
                        }
                        className="trigger-clear-formatting"
                      >
                        <ListRestart />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {/* <span>This designator will autofill and cannot be modified</span> */}
                      <div className="max-w-sm">{`Reset to Default`}</div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            )}
          </BtnGroup>
        </div>
      )}

      {/* TipTap Input */}
      <div className="relative p-4">
        {children}
        <EditorContent className="[&_div]:inline" editor={editor} />
      </div>
    </div>
  );
};

export default Tiptap;
