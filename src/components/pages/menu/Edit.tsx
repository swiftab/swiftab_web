import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Define the type for the 'item' prop
interface MenuItem {
  id: string;
  menu: string;
  description: string;
  price: number;
  category: "breakfast" | "lunch" | "dinner";
  image: string;
  code: string;
}

// Define the type for the props
interface EditItemDialogProps {
  item: MenuItem; // Use MenuItem if that's what you expect
  onEditItem: (item: MenuItem) => void;
}

export default function EditItemDialog({
  item,
  onEditItem,
}: EditItemDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [editedItem, setEditedItem] = React.useState<MenuItem>(item);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEditItem(editedItem);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit {item.menu}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Menu Item</DialogTitle>
          <DialogDescription>
            Make changes to the menu item here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-menu" className="text-right">
              Menu Item
            </Label>
            <Input
              id="edit-menu"
              value={editedItem.menu}
              onChange={(e) =>
                setEditedItem({ ...editedItem, menu: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-description" className="text-right">
              Description
            </Label>
            <Input
              id="edit-description"
              value={editedItem.description}
              onChange={(e) =>
                setEditedItem({ ...editedItem, description: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-price" className="text-right">
              Price
            </Label>
            <Input
              id="edit-price"
              value={editedItem.price}
              onChange={(e) => {
                const value = e.target.value;
                if (!isNaN(Number(value)) || value === "") { // Allow clearing the input as well
                  setEditedItem({
                    ...editedItem,
                    price: Number(value),
                  });
                }
              }}
              className="col-span-3"
            />
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
