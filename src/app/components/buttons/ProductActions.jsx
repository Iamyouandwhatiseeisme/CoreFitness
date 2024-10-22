"use client";
 
import React, { useEffect, useState } from 'react';
 
const ProductActions = ({ product, setProductCallBack, onEditingChange }) => {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(product.title);
 
  const handleEdit = () => {
    fetch(`https://dummyjson.com/products/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle }),
    })
      .then((res) => res.json())
      .then((updatedProduct) => {
        setProductCallBack(updatedProduct);
        setEditing(false);
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };
  useEffect(()=>{
    onEditingChange(editing);
 
  },[editing])  
 
 
 
 
 
  
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