'use client'
import { useState } from 'react'
import './AddProductButton.css'

export default function AddProductButton() {
    const [isModalOpen, setModalOpen] = useState(false)
    const [productName, setProductName] = useState('')
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState(null);

    const handleClick = () => {
        setModalOpen(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('product Added: ', {
            name: productName,
            description: productDescription,
            price: productPrice +"$",
            image: productImage ? productImage.name : 'No Image Uploaded',
        })

        setProductName('')
        setProductDescription('')
        setProductPrice('')
        setProductImage(null)

        setModalOpen(false)
    }

    const handleProductNameChange = (e) => setProductName(e.target.value)
    const handleProductDescriptionChange = (e) => setProductDescription(e.target.value);
    const handleProductPriceChange = (e) => setProductPrice(e.target.value);

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setProductImage(file)
        }
    }

    return (
        <div className="add-product-button-container">
            <button className="add-product-btn" onClick={handleClick}>Add Product</button>
            {isModalOpen && (
                <div className='modal-overlay'>
                    <div className='modal-content'>
                        <h2>Add New Product</h2>
                        <form onSubmit={handleSubmit} className='product-form'>
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
                        <button className='close-modal' onClick={() => setModalOpen(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}