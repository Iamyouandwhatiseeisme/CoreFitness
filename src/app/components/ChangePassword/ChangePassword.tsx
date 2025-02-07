import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@components/components/ui/button";
import useDebounce from "src/app/hooks/useDebounce";
import { toast, Toaster } from "sonner";
import { useLocale } from "../providers/LanguageContext";

export default function ChangePassword() {
  const [showPasswordFields, setShowPasswordFields] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [userAuthenticated, setUserAuthenticated] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false);
  const debouncedValue = useDebounce(currentPassword, 2500);
  const {
    dictionary: { profile },
  } = useLocale();

  useEffect(() => {
    async function checkAuthentication() {
      const response = await fetch("/api/checkPassword", {
        headers: {
          currentPassword: debouncedValue,
        },
      });

      if (response.status === 200) {
        const responseData = await response.json();
        if (responseData.status === 200) {
          setUserAuthenticated(true);
          setError("");
        } else {
          setError(responseData.code);
        }
      }
    }
    checkAuthentication();
  }, [debouncedValue]);
  async function handlePasswordChange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (newPassword === confirmPassword && newPassword.length > 5) {
      const response = await fetch("/api/changePassword", {
        headers: {
          newPassword: confirmPassword,
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.status === 200) {
          toast("Password has been changed!");
          setShowPasswordFields(false);
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        } else {
          toast("Something went wrong.");
        }
      }
    }
  }
  useEffect(() => {
    if (newPassword !== confirmPassword) {
      setError("Your passwords do not match!");
    }
    if (newPassword === confirmPassword && newPassword.length > 5) {
      setError("");
      setPasswordsMatch(true);
    }
  }, [confirmPassword]);

  return (
    <Dialog open={showPasswordFields} onOpenChange={setShowPasswordFields}>
      <DialogTrigger asChild>
        <div className="flex flex-row gap-2 justify-start items-center">
          <div className="flex flex-col">
            <div
              className="underline cursor-pointer w-40"
              onClick={() => setShowPasswordFields(!showPasswordFields)}
            >
              {profile.ChangePassword}
            </div>
          </div>
          <Toaster />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[580px] h-120 m-20 p-5 absolute top-0 right-96 bg-slate-900 rounded-2xl text-white  ">
        <DialogHeader className="flex flex-col items-start justify-start">
          <DialogTitle>{profile.ChangePassword}</DialogTitle>
          <DialogClose
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
            }}
            onClick={() => setShowPasswordFields(false)}
            className=" justify-end rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
          </DialogClose>

          <DialogDescription>
            Your password must be at least 6 characters long
            {error && <div className="text-red-600">{error}</div>}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handlePasswordChange}>
          <div className="flex flex-col gap-5">
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => {
                setError("Please wait...");
                setCurrentPassword(e.target.value);
              }}
              className="border rounded p-2 bg-slate-800 "
            ></input>
            <div className="flex flex-col gap-2">
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                disabled={!userAuthenticated}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`border rounded p-2 ${
                  userAuthenticated ? "bg-slate-800" : "bg-slate-900"
                } `}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                disabled={!userAuthenticated}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`border rounded p-2 ${
                  userAuthenticated ? "bg-slate-800" : "bg-slate-900"
                } `}
              />
            </div>
          </div>
          <DialogFooter className="flex flex-row items-center justify-center m-10">
            <Button
              disabled={!passwordsMatch}
              type="submit"
              className="rounded-2xl bg-slate-400 w-40 h-10"
            >
              {profile.ChangePassword}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
