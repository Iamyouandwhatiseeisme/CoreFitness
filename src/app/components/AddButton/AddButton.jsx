'use client'
import React from 'react';
import { useState } from 'react'
import './Addbutton.css'

const AddButton = ({ item }) => {
  const [isProductModalOpen, setProductModalOpen] = useState(false)
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);

  const [isPostModalOpen, setPostModalOpen] = useState(false)
  const [postTitle, setPostTitle] = useState('')
  const [postDescription, setPostDescription] = useState('');
  const [postTags, setPostTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const handleClick = () => {
    console.log(`I am in ${item} page`);
    if (item === 'Posts') {
      setPostModalOpen(true)
    } else if (item === 'Products') {
      setProductModalOpen(true)
    } else {
      console.log('Error: Item not found');
    }
  };

  const handleProductSubmit = (e) => {
    e.preventDefault()
    console.log('Product Added: ', {
      name: productName,
      description: productDescription,
      price: `${productPrice}$`,
      image: productImage ? productImage.name : 'No Image Uploaded',
    })

    setProductName('')
    setProductDescription('')
    setProductPrice('')
    setProductImage(null)
    setProductModalOpen(false)
  }

  const handlePostSubmit = (e) => {
    e.preventDefault()
    console.log('Post Added: ', {
      title: postTitle,
      description: postDescription,
      tags: postTags,
    })

    setPostTitle('')
    setPostDescription('')
    setPostTags([]);
    setTagInput('');
    setPostModalOpen(false)
  }

  const handleProductNameChange = (e) => setProductName(e.target.value)
  const handleProductDescriptionChange = (e) => setProductDescription(e.target.value);
  const handleProductPriceChange = (e) => setProductPrice(e.target.value);

  const handlePostTitleChange = (e) => setPostTitle(e.target.value)
  const handlePostDescriptionChange = (e) => setPostDescription(e.target.value);

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProductImage(file)
    }
  }

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      setPostTags([...postTags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (indexToRemove) => {
    setPostTags(postTags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="add-product-button-container">
      <button className="add-product-btn" onClick={handleClick}>Add {item}</button>
      {isProductModalOpen && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h2>Add New Product</h2>
            <form onSubmit={handleProductSubmit} className='form'>
              <label htmlFor="product-name">Product Name:</label>
              <input
                type="text"
                id='product-name'
                value={productName}
                onChange={handleProductNameChange}
                required
              />
              <label htmlFor="product-description">Product Description:</label>
              <textarea
                id="product-description"
                value={productDescription}
                onChange={handleProductDescriptionChange}
                required
              />
              <label htmlFor="product-price">Product Price:</label>
              <input
                type="number"
                id="product-price"
                value={productPrice}
                onChange={handleProductPriceChange}
                required
              />
              <label htmlFor="product-image">Product Image:</label>
              <input
                type="file"
                id="product-image"
                accept='image/*'
                onChange={handleImageChange}
              />
              <button type='submit'>Add Product</button>
            </form>
            <button className='close-modal' onClick={() => setProductModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
      {isPostModalOpen && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h2>Add New Post</h2>
            <form onSubmit={handlePostSubmit} className='form'>
              <label htmlFor="post-title">Post Title:</label>
              <input
                type="text"
                id='post-title'
                value={postTitle}
                onChange={handlePostTitleChange}
                required
              />
              <label htmlFor="post-description">Write a Post:</label>
              <textarea
                id="post-description"
                value={postDescription}
                onChange={handlePostDescriptionChange}
                required
              />
              <label htmlFor="post-tags">Tags:</label>
              <input
                type="text"
                id="post-tags"
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyDown={handleAddTag}
                placeholder="Press Enter to add a tag"
              />
              <div className="tags-container">
                {postTags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                    <button type="button" className="remove-tag-btn" onClick={() => removeTag(index)}>
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <button type='submit'>Add Post</button>
            </form>
            <button className='close-modal' onClick={() => setPostModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddButton;