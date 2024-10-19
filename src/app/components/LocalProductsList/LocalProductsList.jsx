"use client"


import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LocalProductsList({ initialProducts }) {
  const [items, setItems] = useState(initialProducts);
  const [isEditing, setIsEditing] = useState(null); 
  const [editData, setEditData] = useState({ title: '', description: '', price: '', image: '' });
  const type = 'products';

  
  useEffect(() => {
    const storedItems = localStorage.getItem(type);
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    } else {
      localStorage.setItem(type, JSON.stringify(initialProducts));
    }
    console.log(initialProducts)
  }, [initialProducts, type]);

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  
  const enableEdit = (item) => {
    setIsEditing(item.id);
    setEditData({
      title: item.title,
      description: item.description || '',
      price: item.price || '',
      image: item.thumbnail || '',
    });
  };

  
  const saveEdit = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, ...editData } : item
    );
    setItems(updatedItems);
    localStorage.setItem(type, JSON.stringify(updatedItems));
    setIsEditing(null); 
  };

 
  const deleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem(type, JSON.stringify(updatedItems));
  };


  const resetItems = () => {
    localStorage.setItem(type, JSON.stringify(initialProducts));
    setItems(initialProducts);
  };

  return (
    <> 
    <div>
   
    <button onClick={resetItems}>Restore Initial Products</button>
  </div>
    
    <div className="products-list">
        
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id}>
              {isEditing === item.id ? (
                <div className="product-card">
                  <input
                    type="text"
                    name="title"
                    value={editData.title}
                    onChange={handleChange}
                    placeholder="Title"
                  />
                  <input
                    type="text"
                    name="description"
                    value={editData.description}
                    onChange={handleChange}
                    placeholder="Description"
                  />
                  <input
                    type="number"
                    name="price"
                    value={editData.price}
                    onChange={handleChange}
                    placeholder="Price"
                  />
                  <input
                    type="text"
                    name="image"
                    value={editData.image}
                    onChange={handleChange}
                    placeholder="Image URL"
                  />
                  <button onClick={() => saveEdit(item.id)}>Save</button>
                  <button onClick={() => setIsEditing(null)}>Cancel</button>
                </div>
              ) : (
                  <div className="product-card">
                    <img className="product-image" src={item.thumbnail} alt={item.title} />
                      <Link href={`/products/${item.id}`} key={item.id}>
                           <div className="product-info"><strong>{item.title}</strong></div>
                      </Link>
                    <div className="product-info">{item.description}</div>
                    <div className="product-info">Price: {item.price}$</div>
                    <button onClick={() => enableEdit(item)}>Edit</button>
                    <button onClick={() => deleteItem(item.id)}>Delete</button>
                  </div>
              )}
            </div>
          ))
        ) : (
          <>
          <p>No products available</p>
          
          </>
          
        )}
      </div>
    </>
    
  );
}