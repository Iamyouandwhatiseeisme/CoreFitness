"use client";

import React, { useEffect, useState } from "react";
import "./productActions.css";

const ProductActions = ({
  product,
  type,
  setProductCallBack,
  deleteProductCallback,
  onEditingChange,
}) => {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(product.title);

  const handleEdit = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/${type}/${product.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: newTitle }),
        }
      );
      if (response.status === 200) {
        var data = await response.json();
        setProductCallBack(data);
      }
      if (response.status === 404) {
        var updatedProduct = product;
        updatedProduct.title = newTitle;
        setProductCallBack(updatedProduct);
      }
      setEditing(false);
    } catch (error) {
      console.error("Failed to update product", error);
    }
  };
  useEffect(() => {
    onEditingChange(editing);
  }, [editing]);

  const handleDelete = () => {
    fetch(`https://dummyjson.com/${type}/${product.id}`, {
      method: "DELETE",
    })
      .then(() => {
        deleteProductCallback(product.id);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  return (
    <div>
      {editing ? (
        <div>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className="btns-div">
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default ProductActions;
