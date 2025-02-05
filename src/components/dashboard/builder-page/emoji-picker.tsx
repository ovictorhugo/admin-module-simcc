"use client";

import { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Smile } from "lucide-react";
import { Button } from "../../ui/button";

interface EmojiPickerProps {
    onSelect: (emoji: string) => void;
  }
  export function EmojiPicker({ onSelect }: EmojiPickerProps) {
    const [open, setOpen] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
      <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 flex min-w-8"
                     
                     
                    >
                     {selectedEmoji ? <span className="text-lg">{selectedEmoji}</span> : <Smile size={16} />}
                    </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-0">
      <Picker
          data={data}
          onEmojiSelect={(emoji: any) => {
            onSelect(emoji.native); // Corrigido: usa 'emoji.native' corretamente
            setSelectedEmoji(emoji.native);
            setOpen(false);
          }}
          theme="light"
        />
      </PopoverContent>
    </Popover>
  );
}
