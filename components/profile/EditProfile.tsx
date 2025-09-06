"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPen } from "lucide-react";
import React, { useState } from "react";
import { updateUser } from "@/actions/users.action";
import { toast } from "react-hot-toast";

type EditProfileType = {
  editOpen: boolean;
  onOpenEditProfile: (value: boolean) => void;
  userData: { name: string; email: string };
};

export function EditProfile({
  editOpen,
  onOpenEditProfile,
  userData,
}: EditProfileType) {
  const [formData, setFormData] = useState({ name: userData.name });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.name === userData.name) {
      return;
    }

    try {
      setIsLoading(true);
      const updated = await updateUser(formData, userData.email);

      if (updated.success) {
        onOpenEditProfile(false);
        toast.success("Profile updated successfully.");
      }
      console.log(updated, "updated handleSubmit");
    } catch (err) {
      console.log(err, " err in handleSubmit");
    } finally {
      setIsLoading(false);
    }

    console.log("form submited ", formData);
  };
  return (
    <Dialog open={editOpen} onOpenChange={onOpenEditProfile}>
      <form onClick={handleSubmit} className="form-inline11111">
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <UserPen className="size-4 mr-2" /> Edit profile
            </DialogTitle>
            <DialogDescription>
              Make changes to your profile here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                name="name"
                defaultValue={userData.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={isLoading} type="submit">
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
