import React, { useState } from "react";

interface DeleteUserProps {
  handleDelete: () => Promise<void>;
}

export default function DeleteUser({ handleDelete }: DeleteUserProps) {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  return (
    <div>
      <button
        data-cy="delete-button"
        className="rounded-lg h-10 w-40 bg-red-500 text-white dark:bg-red-700 transform  hover:scale-105 dark:text-gray-200 hover:bg-red-600 dark:hover:bg-red-800 active:bg-red-700 dark:active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200 ease-in-out"
        onClick={() => {
          setShowDialog(true);
        }}
      >
        Delete
      </button>
      {showDialog && (
        <div
          data-cy="delete-dialog"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowDialog(false)}
        >
          <div
            className="bg-white dark:text-black text-black p-6 rounded-lg shadow-lg z-40"
            onClick={(e) => e.stopPropagation()}
          >
            <p>Are you sure you want to delete this item?</p>
            <div className="mt-4 flex justify-end">
              <button
                className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </button>
              <button
                data-cy="confirm-delete-button"
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
