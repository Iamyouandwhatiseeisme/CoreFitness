"use client";

import { useRouter } from "next/navigation";

export function DeleteProductButton(props: { id: string }) {
  const router = useRouter();
  async function handleDelete() {
    const response = await fetch("/api/deleteProduct", {
      method: "POST",
      headers: {
        id: props.id,
      },
    });
    if (response) {
      console.log(response);
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
