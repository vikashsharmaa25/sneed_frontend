"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";


const Autocomplete = ({
    value,
    onChange,
    options = [],
    placeholder = "Select option...",
    className = "",
    buttonClass = "",
}: any) => {
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");

    // filter options based on search (CommandInput handles it visually)
    const selectedLabel =
        value?.label || options.find((o: any) => o.value === value)?.label;

    return (
        <div className={cn("w-full", className)}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn("w-full justify-between", buttonClass)}
                    >
                        {selectedLabel || placeholder}
                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0">
                    <Command className="w-full">
                        <CommandInput
                            placeholder={`Search...`}
                            onInput={(e: any) => setQuery(e.target.value)}
                        />

                        <CommandList className="w-full">
                            <CommandEmpty>No results found.</CommandEmpty>

                            <CommandGroup className="w-full">
                                {options
                                    .filter((item: any) =>
                                        item.label.toLowerCase().includes(query.toLowerCase())
                                    )
                                    .map((item: any) => (
                                        <CommandItem
                                            key={item.value}
                                            value={item.value + ""}
                                            onSelect={() => {
                                                onChange(item);
                                                setOpen(false);
                                                setQuery("");
                                            }}
                                            className="w-full"
                                        >
                                            <CheckIcon
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    value?.value === item.value
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />

                                            {item.label}
                                        </CommandItem>
                                    ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default Autocomplete;
