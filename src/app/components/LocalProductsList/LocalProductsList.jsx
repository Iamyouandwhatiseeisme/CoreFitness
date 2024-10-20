"use client"


import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LocalProductsList({ initialProducts, type}) {
  const [items, setItems] = useState(initialProducts);
  const [isEditing, setIsEditing] = useState(null); 
  const [editData, setEditData] = useState({ title: '', description: '', price: '', image: '' });
  

  
  useEffect(() => {
    const storedItems = localStorage.getItem(type);
    
    if (storedItems) {
      try {
        setItems(JSON.parse(storedItems));
      } catch (error) {
        console.error("Failed to parse stored items:", error);
        localStorage.removeItem(type);
      }
    } else {
      localStorage.setItem(type, JSON.stringify(initialProducts));
      setItems(initialProducts);
    }
    
    console.log(initialProducts);
  }, [initialProducts, type]);
  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  
  const enableEdit = (item) => {
    setIsEditing(item.id);
    
    if (type === 'products') {
      setEditData({
        title: item.title,
        description: item.description || '',
        price: item.price || '',
        image: item.thumbnail || '',
      });
    } else if (type === 'posts') {
      setEditData({
        title: item.title,
        body: item.body || '',
      });
    }
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
        <button onClick={resetItems}>Restore Initial {type === 'products' ? 'Products' : 'Posts'}</button>
      </div>
    
      <div className="products-list">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id}>
              {isEditing === item.id ? (
                <div className={`${type}-card`}>
                  <input
                    type="text"
                    name="title"
                    value={editData.title}
                    onChange={handleChange}
                    placeholder="Title"
                  />

                  {type === 'products' ? (
                    <>
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
                    </>
                  ) : (
                    <input
                      name="body"
                      value={editData.body}
                      onChange={handleChange}
                      placeholder="Body"
                    />
                  )}

                  <button onClick={() => saveEdit(item.id)}>Save</button>
                  <button onClick={() => setIsEditing(null)}>Cancel</button>
                </div>
              ) : (
                <div className="product-card">
                  {type === 'products' ? (
                    <>
                      <img className="item-image" src={item.thumbnail} alt={item.title} />
                      <Link href={`/products/${item.id}`}>
                        <div className="item-info"><strong>{item.title}</strong></div>
                      </Link>
                      <div className="item-info">{item.description}</div>
                      <div className="item-info">Price: {item.price}$</div>
                      <button onClick={() => enableEdit(item)}>Edit</button>
                        <button onClick={() => deleteItem(item.id)}>Delete</button>
                    </>
                  ) : (
                    <>
                        <div className="posts-card">
                            <Link key={item.id} href={`/posts/${item.id}`}>
                              <div className="posts-info"><strong>{item.title}</strong></div>
                            </Link>
                            <div className="posts-info">{item.body}</div>
                           
                            <div>
                                <span className="posts-info">Views: {item.views}</span>
                                <span className="posts-info">Likes: {item.reactions.likes}</span>
                                <span className="posts-info">Dislikes: {item.reactions.dislikes}</span>

                            </div>
                            <div className="posts-info">Post Id: {item.id}</div>
                            <div className="posts-info">Tags: {item.tags.map((tag)=>{
                                return (
                                    <span className="post-tag">#{tag}</span>
                                )
                                
                            })}</div>


                        <button onClick={() => enableEdit(item)}>Edit</button>
                        <button onClick={() => deleteItem(item.id)}>Delete</button>
                        </div>
                        
                    </>
                  )}
                  
                  
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No {type === 'products' ? 'products' : 'posts'} available</p>
        )}
      </div>
    </>
  );
}