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
    <div className="min-h-wrapper flex flex-row items-start justify-evenly pt-40">
      <Toaster></Toaster>
      <div className="flex flex-col w-96">
        <div>{contact.Phone}: +995 555 55 55 55</div>
        <div>{contact.Email} : saabashidze@gmail.com</div>
        <div>{contact.Address}</div>
      </div>
      <div className="flex flex-col h-120 w-150">
        <form onSubmit={handleEmail}>
          <div className="flex flex-col">
            <h2>{contact.ToSend}</h2>
            <label>{contact.YourEmail}: </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="from"
              type="email"
              className="w-96 p-2 border border-gray-300 rounded"
              required
            ></input>
            <label>{contact.Subject}: </label>
            <input
              name="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              minLength={5}
              className="w-96 p-2 border border-gray-300 rounded"
              required
            ></input>
            <label>{contact.Subject}: </label>
            <div className="flex flex-row items-end gap-4">
              {" "}
              <textarea
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="p-2 border border-gray-300 rounded resize-none h-40 w-3/5"
                required
              ></textarea>{" "}
              <button
                type="submit"
                className="rouned border-black border bg-slate-200 w-40 hover:bg-white"
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
