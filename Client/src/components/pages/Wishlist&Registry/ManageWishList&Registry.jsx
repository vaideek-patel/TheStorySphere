import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ManageWishListRegistry = () => {
    const wishlistData = useSelector((state) => state.data.wishList)
    console.log(wishlistData)
    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">My Wishlists & Registries</h2>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Wishlists & Registries</h3>
                <Button variant="danger">Create New</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Sharing</th>
                        {/* <th>Registry</th> */}
                        <th>Delete</th>
                    </tr>
                </thead>
                {wishlistData.map((data) => {
                    return (
                        <tbody>
                            <tr>
                                <td>{data.id}</td>
                                <td><Link to={`/wishlist/${data.id}`}>{data.name}</Link></td>
                                <td>{data.privacy}</td>
                                <td><Button variant="light"><FontAwesomeIcon icon={faTrash} /></Button></td>
                            </tr>
                        </tbody>
                    )
                })}
            </Table>
            <Button variant="danger">CONTINUE SHOPPING</Button>
        </div>
    );
};

export default ManageWishListRegistry;
