"use client"; // Ensure this component is client-side

import React, { useState } from 'react';

const ProductActions = ({ product}) => {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(product.title);

  // Handle product edit (PUT request)
  const handleEdit = () => {
    fetch(`https://dummyjson.com/products/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle }),
    })
      .then((res) => res.json())
      .then((updatedProduct) => {
        console.log('Updated product:', updatedProduct);
        // Update the local product state directly
        // setProductList((prevList) =>
        //   prevList.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        // );
        setEditing(false); // Exit edit mode
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };


  


  // Handle product delete (DELETE request)
  const handleDelete = () => {
    fetch(`https://dummyjson.com/products/${product.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        console.log('Deleted product with ID:', product.id);
        
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
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
        <div>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default ProductActions;