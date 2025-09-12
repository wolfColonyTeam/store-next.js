"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DataPickerProps = {
  onHandleSetDate: (date: Date) => void;
  dayOfBirth: Date | null | undefined;
};

export function DataPicker({ onHandleSetDate, dayOfBirth }: DataPickerProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(dayOfBirth);

  const handleSetDate = (date: Date | undefined) => {
    onHandleSetDate(date!);
    setDate(date);
  };

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="date" className="px-1">
        Date of birth
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date ?? undefined}
            defaultMonth={dayOfBirth ?? undefined}
            captionLayout="dropdown"
            onSelect={(date) => {
              handleSetDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
