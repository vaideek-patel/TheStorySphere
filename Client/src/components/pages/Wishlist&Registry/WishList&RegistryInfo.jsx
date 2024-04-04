import React from 'react';
import { useNavigate } from 'react-router-dom';

const WishListRegistryInfo = () => {
    const navigate = useNavigate();

    const CrateNewWishList = () => {
        navigate("/wishlists/new");
    };

    const CreateNewRegistry = () => {
        navigate("/create_registry");
    };

    const manageWishlistRegistries = () => {
        navigate("/wishlists");
    };

    return (
        <div className="text-center mt-5">
            <h2>Welcome to WishList & RegistryInfo</h2>
            <div className="mt-4">
                <button className="btn btn-primary mx-3" onClick={CrateNewWishList}>Create a Wishlist</button>
                <button className="btn btn-secondary mx-3" onClick={CreateNewRegistry}>Create a Registry</button>
                <button className="btn btn-info mx-3" onClick={manageWishlistRegistries}>Manage your Wishlist and Registries Here!</button>
            </div>
        </div>
    );
};

export default WishListRegistryInfo;
