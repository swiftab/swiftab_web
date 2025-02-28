import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader, Plus} from "lucide-react";
import { useAddMenu } from "@/hooks/restauranthook/addmenuhook";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";

// Define the type for a menu item
interface MenuItem {
  name: string;
  description: string;
  cost: number;
  rate: number;
  //category: "breakfast" | "lunch" | "dinner";
  image: string;
}

type categoryprop = {
  category: "breakfast" | "lunch" | "dinner";
};

export default function CreateItemDialog() {
  const [isOpen, setIsOpen] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [adminId, setAdminId] = React.useState("");
  const [useFileUpload, setUseFileUpload] = React.useState(true);
  const [imageFile, setImageFile] = React.useState<File | null>(null);


  // State to manage the new item
  const [newItem, setNewItem] = React.useState<MenuItem>({
    name: "",
    description: "",
    cost: 0,
    rate: 0,
    image: "",
  });

  const [category, setCategory] = React.useState<categoryprop>({
    category: "breakfast",
  });

  // Use the `useAddMenu` hook for the mutation
  const { mutate: addMenuItem, isPending } = useAddMenu();

  // Handle form submission
  // const handleSubmit = (e: React.FormEvent) => {
    
  //   e.preventDefault();
  //   setImageFile(file);

  //   // Transform `newItem` to match your API expectations
  //   const menuData: MenuData = {
  //     name: newItem.name,
  //     description: newItem.description,
  //     cost: newItem.cost,
  //     rate: newItem.rate,
  //     image: newItem.image,
  //   };

  //   console.log(menuData)

  //   addMenuItem(
  //     { data: menuData, menuType: category.category },
  //     {
  //       onSuccess: () => {
  //         console.log("Menu item added successfully");
  //         setIsOpen(false);
  //         // Reset form
  //         setNewItem({
  //           name: "",
  //           description: "",
  //           cost: 0,
  //           image: "",
  //           rate: 0,
  //         });
  //       },
  //       onError: (error) => {
  //         console.error("Failed to add menu item:", error);
  //       },
  //     }
  //   );
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", newItem.name);
    formData.append("description", newItem.description);
    formData.append("cost", newItem.cost.toString());
    formData.append("rate", newItem.rate.toString());
    formData.append("category", category.category);
  
    if (imageFile) {
      formData.append("image", imageFile); // Append file
    } else if (newItem.image) {
      formData.append("image", newItem.image); // Append URL if provided
    }
  
    addMenuItem(
      { data: formData, menuType: category.category},
      {
        onSuccess: () => {
          console.log("Menu item added successfully");
          setIsOpen(false);
          setNewItem({ name: "", description: "", cost: 0, rate: 0, image: "" });
          setImageFile(null);
        },
        onError: (error) => {
          console.error("Failed to add menu item:", error);
        },
      }
    );
  };
  

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log(storedUser);

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      if (parsedUser.restaurantId) {
        const id = parsedUser.restaurantId;
        setAdminId(id);
      }
    }
  }, []);

  // return (
  //   <Dialog open={isOpen} onOpenChange={setIsOpen}>
  //     <DialogTrigger asChild>
  //       <Button className="bg-gray-200 hover:bg-gray-300 text-black">
  //         <Plus className="mr-2 h-4 w-4" />
  //         Create New Item
  //       </Button>
  //     </DialogTrigger>
  //     <DialogContent className="sm:max-w-[425px]">
  //       <DialogHeader>
  //         <DialogTitle>Create New Menu Item</DialogTitle>
  //         <DialogDescription>
  //           Add a new item to your restaurant menu. Click save when you're done.
  //         </DialogDescription>
  //       </DialogHeader>
  //       <form onSubmit={handleSubmit} className="grid gap-4 py-4">
  //         {/* <div className="grid grid-cols-4 items-center gap-4">
  //           <Label htmlFor="code" className="text-right">
  //             Code
  //           </Label>
  //           <Input
  //             id="code"
  //             value={newItem.code}
  //             onChange={(e) =>
  //               setNewItem({ ...newItem, code: e.target.value })
  //             }
  //             className="col-span-3"
  //           />
  //         </div> */}
  //         <div className="grid grid-cols-4 items-center gap-4">
  //           <Label htmlFor="menu" className="text-right">
  //             Menu Item
  //           </Label>
  //           <Input
  //             id="name"
  //             value={newItem.name}
  //             onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
  //             className="col-span-3"
  //           />
  //         </div>
  //         <div className="grid grid-cols-4 items-center gap-4">
  //           <Label htmlFor="description" className="text-right">
  //             Description
  //           </Label>
  //           <Input
  //             id="description"
  //             value={newItem.description}
  //             onChange={(e) =>
  //               setNewItem({ ...newItem, description: e.target.value })
  //             }
  //             className="col-span-3"
  //           />
  //         </div>
  //         <div className="grid grid-cols-4 items-center gap-4">
  //           <Label htmlFor="price" className="text-right">
  //             Price
  //           </Label>
  //           <Input
  //             id="cost"
  //             type="number"
  //             value={newItem.cost}
  //             onChange={(e) =>
  //               setNewItem({
  //                 ...newItem,
  //                 cost: parseFloat(e.target.value) || 0,
  //               })
  //             }
  //             className="col-span-3"
  //           />
  //         </div>
  //         <div className="grid grid-cols-4 items-center gap-4">
  //           <Label htmlFor="category" className="text-right">
  //             Category
  //           </Label>
  //           <select
  //             id="category"
  //             value={category.category}
  //             onChange={(e) =>
  //               setCategory({
  //                 ...newItem,
  //                 category: e.target.value as "breakfast" | "lunch" | "dinner",
  //               })
  //             }
  //             className="col-span-3 flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
  //           >
  //             <option value="breakfast">Breakfast</option>
  //             <option value="lunch">Lunch</option>
  //             <option value="dinner">Dinner</option>
  //           </select>
  //         </div>
  //         <div className="grid grid-cols-4 items-center gap-4">
  //           <Label htmlFor="imageToggle" className="text-right">
  //             Use File Upload
  //           </Label>
  //           <input
  //             id="imageToggle"
  //             type="checkbox"
  //             checked={useFileUpload}
  //             onChange={() => setUseFileUpload(!useFileUpload)}
  //             className="col-span-3"
  //           />
  //         </div>
  //         {useFileUpload ? (
  //           <div className="grid grid-cols-4 items-center gap-4">
  //             <Label htmlFor="imageFile" className="text-right">
  //               Upload Image
  //             </Label>
  //             <Input
  //               id="imageFile"
  //               type="file"
  //               accept="image/*"
  //               onChange={(e) => {
  //                 const file = e.target.files?.[0];
  //                 if (file) {
  //                   const reader = new FileReader();
  //                   reader.onload = () => {
  //                     if (reader.result) {
  //                       setNewItem({
  //                         ...newItem,
  //                         image: reader.result as string,
  //                       });
  //                     }
  //                   };
  //                   reader.readAsDataURL(file);
  //                 }
  //               }}
  //               className="col-span-3"
  //             />
  //           </div>
  //         ) : (
  //           <div className="grid grid-cols-4 items-center gap-4">
  //             <Label htmlFor="imageUrl" className="text-right">
  //               Image URL
  //             </Label>
  //             <Input
  //               id="imageUrl"
  //               type="text"
  //               value={newItem.image}
  //               onChange={(e) =>
  //                 setNewItem({
  //                   ...newItem,
  //                   image: e.target.value,
  //                 })
  //               }
  //               className="col-span-3"
  //             />
  //           </div>
  //         )}
  //         {newItem.image && (
  //           <div className="mt-4">
  //             <Label>Image Preview:</Label>
  //             <img
  //               src={newItem.image}
  //               alt="Selected Menu Item"
  //               className="w-32 h-32 object-cover rounded"
  //             />
  //           </div>
  //         )}
  //         <DialogFooter>
  //           <Button type="submit" disabled={isPending}>
  //             {isPending ? (
  //               <span>
  //                 save changes <Loader className="animate-spin" />
  //               </span>
  //             ) : (
  //               "Save changes"
  //             )}
  //           </Button>
  //         </DialogFooter>
  //       </form>
  //     </DialogContent>
  //   </Dialog>
  // );
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gray-200 hover:bg-gray-300 text-black">
          <Plus className="mr-2 h-4 w-4" />
          Create New Item
        </Button>
      </DialogTrigger>
      <DialogContent className="fixed z-50 flex flex-col items-center justify-center">
      <DialogHeader>
          <DialogTitle>Add Menu</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-4">
            <div className="flex flex-row justify-between items-center gap-2">
            <div className=" items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Menu Item
              </Label>
              <Input
                id="name"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
                className="col-span-3"
                placeholder="Enter item name"
              />
            </div>
            <div className=" items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="cost"
                type="number"
                value={newItem.cost}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    cost: parseFloat(e.target.value) || 0,
                  })
                }
                className="col-span-3"
                placeholder="0.00"
              />
            </div>
            </div>
            <div className=" items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <textarea
                id="description"
                value={newItem.description}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
                className="col-span-3 flex h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Describe the menu item"
              />
            </div>
            
            <div className=" items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <select
                id="category"
                value={category.category}
                onChange={(e) =>
                  setCategory({
                    ...newItem,
                    category: e.target.value as
                      | "breakfast"
                      | "lunch"
                      | "dinner",
                  })
                }
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="imageToggle">Image Upload Method</Label>
              <div className="flex items-center space-x-2">
                <Label htmlFor="imageToggle" className="text-sm">
                  URL
                </Label>
                <Switch
                  id="imageToggle"
                  checked={useFileUpload}
                  onCheckedChange={setUseFileUpload}
                />
                <Label htmlFor="imageToggle" className="text-sm">
                  File
                </Label>
              </div>
            </div>

            {useFileUpload ? (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageFile" className="text-right">
                  Upload Image
                </Label>
                <Input
                  id="imageFile"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImageFile(file);
                      const reader = new FileReader();
                      reader.onload = () => {
                        if (reader.result) {
                          setNewItem({
                            ...newItem,
                            image: reader.result as string,
                          });
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="col-span-3"
                />
              </div>
            ) : (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageUrl" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="imageUrl"
                  type="text"
                  value={newItem.image}
                  onChange={(e) =>
                    setNewItem({ ...newItem, image: e.target.value })
                  }
                  className="col-span-3"
                  //placeholder="https://example.com/image.jpg"
                />
              </div>
            )}
          </div>

          {newItem.image && (
            <div className="mt-4">
              <Label>Image Preview:</Label>
              <div className="mt-2 border rounded-md overflow-hidden">
                <Image
                  src={newItem.image}
                  alt="Selected Menu Item"
                  className="w-full h-24 object-cover"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? (
                <span className="flex items-center justify-center">
                  <Loader className="animate-spin mr-2" />
                  Saving...
                </span>
              ) : (
                "Save Item"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
