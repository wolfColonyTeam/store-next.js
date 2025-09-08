"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleX, PencilOff, UserPen } from "lucide-react";
import React, { useState } from "react";
import { getUserDataByEmail, updateUser } from "@/actions/users.action";
import { toast } from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { Phone } from "lucide-react";

type ProfileUserType = Awaited<ReturnType<typeof getUserDataByEmail>>;

type EditProfileType = {
  editOpen: boolean;
  onOpenEditProfile: (value: boolean) => void;
  user: ProfileUserType;
};

export function EditProfile({
  editOpen,
  onOpenEditProfile,
  user,
}: EditProfileType) {
  if (!user) {
    return <div>Loading ...</div>;
  }

  const [formData, setFormData] = useState({
    name: user?.name || user?.profile?.name || "",
    surname: user?.profile?.surname || "",
    middleName: user?.profile?.middleName || "",
    biography: user?.profile?.biography || "",
    phone: user?.profile?.phone || "",
    gender: user?.profile?.gender || "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isEditPhone, setIsEditPhone] = useState(false);

  console.log(user, " user in EditProfile");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      console.log("in return handleSubmit");
      return;
    }

    try {
      setIsLoading(true);

      const updated = await updateUser(formData, user.email);

      if (updated.success) {
        onOpenEditProfile(false);
        toast.success("Profile updated successfully.");
      }
      console.log(updated, "updated handleSubmit");
    } catch (err) {
      toast.error("Failed to edit profile.");
      console.log(err, " err in handleSubmit");
    } finally {
      setIsLoading(false);
    }

    console.log("form submitted ", formData);
  };
  console.log("EditProfile component render");

  return (
    <Dialog open={editOpen} onOpenChange={onOpenEditProfile}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="form-inline11111">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <UserPen className="size-4 mr-2" /> Edit profile
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid grid-cols-3 gap-2 mt-2">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Name</Label>
                <Input
                  id="name-1"
                  name="name"
                  defaultValue={user?.profile?.name || formData.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFormData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="name-2">Surname</Label>
                <Input
                  id="name-2"
                  name="surname"
                  defaultValue={user?.profile?.surname || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFormData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="name-2">Mid name</Label>
                <Input
                  id="name-3"
                  name="middleName"
                  defaultValue={user?.profile?.middleName || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFormData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <div className="grid gap-3 w-full">
                <Label htmlFor="biography">Biography</Label>
                <Textarea
                  name="biography"
                  defaultValue={user?.profile?.biography || ""}
                  className="w-full"
                  placeholder="Type your biography here."
                  id="biography"
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setFormData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
            <div className="grid gap-2 grid-cols-2">
              <div className="flex gap-1 items-center">
                <Phone className="size-4" color="#7fa267" />
                <span className="text-md">{user?.profile?.phone || ""}</span>
                {isEditPhone ? (
                  <CircleX
                    onClick={() => setIsEditPhone(false)}
                    className="size-5 ml-3 cursor-pointer"
                    color="#7fa267"
                  />
                ) : (
                  <PencilOff
                    onClick={() => setIsEditPhone(true)}
                    className="size-4 ml-3 cursor-pointer"
                    color="#ee1717"
                  />
                )}
              </div>
              {isEditPhone && (
                <Input
                  id="phone"
                  name="phone"
                  defaultValue={user?.profile?.phone || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFormData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                />
              )}
            </div>
            <div className="grid gap-2 grid-cols-3 mb-2">
              <div className="flex gap-1 items-center">
                <Label className="mr-1">Gender</Label>
                <Select
                  defaultValue={user?.profile?.gender || ""}
                  name="gender"
                  onValueChange={(value) => {
                    setFormData((prev) => ({ ...prev, ["gender"]: value }));
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Genders</SelectLabel>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
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
        </form>
      </DialogContent>
    </Dialog>
  );
}
