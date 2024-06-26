import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { healthPackagesArray } from './HealthPackages';
import { DataContainer } from '../App';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Styles/HealthPackageList.css";

const HealthPackagesList = () => {
    const { addToCart } = useContext(DataContainer);

    const handleAddToCart = (pkg) => {
        addToCart(pkg);
        toast.success("Product has been added to cart!");
    };

    return (
        <div className="packages-list">
            <ToastContainer />
            <h2>Available Health Packages</h2>
            <div className="packages-grid">
                {healthPackagesArray.map(pkg => (
                    <div key={pkg.id} className="package-card">
                        <Link to={`/health/${pkg.id}`} className="package-link">
                            <div className="package-image-container">
                                <img src={pkg.imgUrl} alt={pkg.productName} className="package-image" />
                                <div className="hover-overlay">
                                    <h2>{pkg.overlayTitle}</h2>
                                    <ul>
                                        {pkg.overlayDetails?.map((detail, index) => (
                                            <li key={index}>{detail}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Link>
                        <div className="package-details">
                            <div className="package-name">{pkg.productName}</div>
                            <div className="package-desc">{pkg.desc}</div>
                            <div className="price-cart">
                                <div className="package-price">&#8377;{pkg.price}</div>
                                <button
                                    className="add-to-cart-button"
                                    onClick={() => handleAddToCart(pkg)}
                                >
                                    <ion-icon name="add"></ion-icon>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HealthPackagesList;
