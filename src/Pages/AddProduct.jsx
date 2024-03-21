import { useState } from "react";

const AddProduct = () => {
    const [formData, setFormData] = useState({
        productName: '',
        TutorialLink: '',
        price: '',
        imageUrls: [], // Array to store multiple image URLs
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name)
        if (name == "imgurl") {
            const newValue = []
            newValue.push(value)
            setFormData({
                ...formData,
                imageUrls: newValue,
            });
        }
        else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleImageChange = async (e) => {
        const files = e.target.files;
        const urls = [];

        for (const file of files) {
            const url = await uploadImage(file);
            urls.push(url);
        }

        setFormData({
            ...formData,
            imageUrls: urls,
        });
    };

    const uploadImage = async (file) => {
        console.log(file)
        // Implement logic to upload image to ImgBB or any other image hosting service
        // and return the URL
        // For simplicity, let's assume we have a function named uploadToImgBB which returns the URL
        const imgUrl = "";
        return imgUrl;
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted Data:', formData);
    };

    return (
        <div className="md:my-10">
            <div className="max-w-lg mx-auto   p-8 bg-white shadow-lg rounded-md">
                <h2 className="text-xl font-semibold mb-4">Add Product</h2>
                <form className="" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="productName" className="block text-gray-700 font-semibold mb-2">Product Name</label>
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="block md:flex gap-3">

                        <div className="mb-4 w-full md:w-28 ">
                            <label htmlFor="price" className="block text-gray-700  font-semibold mb-2">Price</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                                required
                            />
                        </div>
                        <div className="mb-4 w-full">
                            <label htmlFor="TutorialLink" className="block text-gray-700 font-semibold mb-2">Resource</label>
                            <input
                                type="text"
                                id="TutorialLink"
                                name="TutorialLink"
                                value={formData.TutorialLink}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                    </div>
                    <div className="block md:flex gap-3 items-center">
                        <div className="mb-4 w-full md:w-[60%]">
                            <label htmlFor="imgurl" className="block text-gray-700 font-semibold mb-2">Image URl</label>
                            <input
                                type="text"
                                id="imgurl"
                                name="imgurl"
                                value={formData.imgurl}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                                required
                            />
                        </div>
                        <p>or</p>
                        <div className="mb-4">
                            <label htmlFor="images" className="block text-gray-700 font-semibold mb-2">Images</label>
                            <input
                                type="file"
                                id="images"
                                name="images"
                                onChange={handleImageChange}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Specifications</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="w-full bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;