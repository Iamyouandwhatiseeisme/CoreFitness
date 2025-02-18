"use client";
import React, { useState } from "react";
import { toast, Toaster } from "sonner";
import { useLocale } from "src/app/components/providers/LanguageContext";

export default function Contact() {
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const {
    dictionary: { contact, toast: toastDict },
  } = useLocale();
  async function handleEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    if (formData) {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        body: formData,
      });
      if (response) {
        const responseData = await response.json();
        if (responseData.status === 200) {
          toast(toastDict.EmailSent);
          setEmail("");
          setSubject("");
          setContent("");
        }
      }
    }
  }
  return (
    <div className="min-h-wrapper flex sm:flex-row flex-col items-start pt-20 gap-5 sm:justify-evenly sm:pt-40">
      <Toaster></Toaster>
      <div className="flex flex-col w-96 sm:pl-40 shadow-sm shadow-black/20 dark:shadow-white rounded">
        <div>{contact.Phone}: +995 555 55 55 55</div>
        <div>{contact.Email} : saabashidze@gmail.com</div>
        <div>{contact.Address}</div>
      </div>
      <div className="flex flex-col  sm:h-120 sm:w-150">
        <form onSubmit={handleEmail}>
          <div className="flex flex-col">
            <h2>{contact.ToSend}</h2>
            <label>{contact.YourEmail}: </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="from"
              type="email"
              className="w-96 p-2 border shadow-sm shadow-black/20 dark:shadow-white  border-gray-300 rounded"
              required
            ></input>
            <label>{contact.Subject}: </label>
            <input
              name="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              minLength={5}
              className="w-96 p-2 border shadow-sm shadow-black/20 dark:shadow-white  border-gray-300 rounded"
              required
            ></input>
            <label>{contact.Content}: </label>
            <div className="flex sm:flex-row flex-col items-end gap-4">
              {" "}
              <textarea
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="p-2 border border-gray-300 rounded shadow-sm shadow-black/20 dark:shadow-white  resize-none h-40 sm:w-3/5 w-full"
                required
              ></textarea>{" "}
              <button
                type="submit"
                className="rounded shadow-sm shadow-black/20 dark:shadow-white  border-black border text-black bg-slate-200 w-40 hover:bg-white"
              >
                {contact.Send}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
