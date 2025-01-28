"use client";
import React from "react";

export default function Contact() {
  async function handleEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    if (formData) {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        body: formData,
      });
    }
  }
  return (
    <div className="min-h-wrapper flex flex-row items-start justify-evenly pt-40">
      <div className="flex flex-col w-96">
        <div>Phone Number: +995 555 55 55 55</div>
        <div>E-Mail: saabashidze@gmail.com</div>
        <div>Address: Rustaveli ave 15</div>
      </div>
      <div className="flex flex-col h-120 w-150">
        <form onSubmit={handleEmail}>
          <div className="flex flex-col">
            <h2>To send en email to us, please fill out the forms below</h2>
            <label>Your email: </label>
            <input
              name="from"
              type="email"
              className="w-96 p-2 border border-gray-300 rounded"
              required
            ></input>
            <label>Subject: </label>
            <input
              name="subject"
              type="text"
              minLength={5}
              className="w-96 p-2 border border-gray-300 rounded"
              required
            ></input>
            <label>Content: </label>
            <div className="flex flex-row items-end gap-4">
              {" "}
              <textarea
                name="content"
                className="p-2 border border-gray-300 rounded resize-none h-40 w-3/5"
                required
              ></textarea>{" "}
              <button
                type="submit"
                className="rouned border-black border bg-slate-200 w-40 hover:bg-white"
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
