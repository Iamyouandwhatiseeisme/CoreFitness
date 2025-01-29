"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface DeleteItemProps {
  id: string;
  table: string;
}

export function DeleteItem(props: DeleteItemProps) {
  const router = useRouter();
  async function handleDelete() {
    const response = await fetch("/api/deleteItem", {
      method: "POST",
      headers: {
        id: props.id,
        table: props.table,
      },
    });
    if (response) {
      if (response.status === 200) {
        router.push("/products");
      }
    }
  }
  return (
    <button
      data-cy="delete-button"
      className="rounded border-2xl h-10 w-40 bg-red-300"
      onClick={() => handleDelete()}
    >
      Delete Product
    </button>
  );
}
