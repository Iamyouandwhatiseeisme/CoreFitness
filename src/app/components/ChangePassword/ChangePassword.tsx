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
  const [open, setOpen] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [userAuthenticated, setUserAuthenticated] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false);
  const debouncedValue = useDebounce(currentPassword, 2500);
  const {
    dictionary: { profile, toast: toastDict },
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
          toast(toastDict.PasswordChanged);
          setShowPasswordFields(false);
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        } else {
          toast(toastDict.SomethingWrong);
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
              className="underline cursor-pointer w-[250px]"
              onClick={() => setShowPasswordFields(!showPasswordFields)}
            >
              {profile.ChangePassword}
            </div>
          </div>
          <Toaster />
        </div>
      </DialogTrigger>
      <div
        className={`${
          open &&
          "fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50 backdrop:blur-lg"
        }`}
        onClick={() => setShowPasswordFields(false)}
      >
        <DialogContent
          onClick={(e) => e.stopPropagation()}
          className="fixed inset-0 w-[90vw] sm:w-[70vw] md:w-[50vw] lg:w-[40vw] ml-auto mr-auto mt-10 h-[60vh] min-h-[300px] min-w-[300px] max-w-none max-h-none bg-white dark:bg-gray-900 p-4 sm:p-6 md:p-10 backdrop-blur-2xl overflow-y-auto"
        >
          {" "}
          <DialogHeader className="flex flex-col items-start justify-start">
            <DialogTitle>{profile.ChangePassword}</DialogTitle>
            <DialogClose
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
              }}
              onClick={() => setShowPasswordFields(false)}
              className="justify-end rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              <X className="h-4 w-4" />
            </DialogClose>

            <DialogDescription>
              Your password must be at least 6 characters long
              {error && <div className="text-red-600">{error}</div>}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePasswordChange}>
            <div className="flex flex-col gap-5 items-center justify-center">
              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => {
                  setError("Please wait...");
                  setCurrentPassword(e.target.value);
                }}
                className="border rounded p-2 bg-white w-[250px]"
              ></input>
              <div className="flex flex-col gap-2">
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  disabled={!userAuthenticated}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`border rounded p-2 w-[250px] ${
                    userAuthenticated
                      ? "bg-white dark:bg-white"
                      : "bg-slate-900 dark:bg-gray-600"
                  } `}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  disabled={!userAuthenticated}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`border rounded p-2 w-[250px] ${
                    userAuthenticated
                      ? "bg-white dark:bg-white"
                      : "bg-slate-900 dark:bg-gray-600"
                  } `}
                />
              </div>
            </div>
            <DialogFooter className="flex flex-row items-center justify-center m-4">
              <Button
                disabled={!passwordsMatch}
                type="submit"
                className="rounded-2xl bg-slate-400 dark:bg-gray-500 w-[250px] h-10"
              >
                {profile.ChangePassword}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  );
}
