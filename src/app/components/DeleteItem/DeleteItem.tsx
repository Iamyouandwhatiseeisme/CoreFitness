"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "../providers/LanguageContext";

interface DeleteItemProps {
  id: string;
  table: string;
}

export function DeleteItem(props: DeleteItemProps) {
  const [showDialog, setShowDialog] = React.useState(false);
  const {
    dictionary: { dialog },
  } = useLocale();

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
    <div>
      <button
        data-cy="delete-button"
        className="rounded-lg h-10 w-40 bg-red-500 text-white dark:bg-red-700 dark:text-gray-200 hover:bg-red-600 dark:hover:bg-red-800 active:bg-red-700 dark:active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200 ease-in-out"
        onClick={() => {
          setShowDialog(true);
        }}
      >
        {dialog.Delete}
      </button>
      {showDialog && (
        <div
          data-cy="delete-dialog"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowDialog(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg z-40"
            onClick={(e) => e.stopPropagation()}
          >
            <p>{dialog.AreYouSure}</p>
            <div className="mt-4 flex justify-end">
              <button
                className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowDialog(false)}
              >
                {dialog.Cancel}
              </button>
              <button
                data-cy="confirm-delete-button"
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleDelete}
              >
                {dialog.Delete}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
