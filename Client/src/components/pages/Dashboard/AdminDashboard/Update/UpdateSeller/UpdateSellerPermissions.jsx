import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getSellerDataBySellerId, updateSellerData } from '../../../../../../utils/axios-instance';

const UpdateSellerPermissions = () => {
    const { sellerId } = useParams();
    const navigate = useNavigate()
    const [sellerData, setSellerData] = useState({});
    const [registerPermission, setRegisterPermission] = useState(false);
    const [updatePermission, setUpdatePermission] = useState(false);
    const [deletePermission, setDeletePermission] = useState(false);

    useEffect(() => {
        const fetchSellerData = async () => {
            try {
                const fetchData = await getSellerDataBySellerId(sellerId);
                setSellerData(fetchData.data);
                setRegisterPermission(fetchData.data.register === 'yes');
                setUpdatePermission(fetchData.data.update === 'yes');
                setDeletePermission(fetchData.data.delete === 'yes');
            } catch (error) {
                console.log(error);
            }
        };
        fetchSellerData();
    }, [sellerId]);

    const handleUpdatePermissions = async () => {
        const updatedPermissions = {
            register: registerPermission ? 'yes' : 'no',
            update: updatePermission ? 'yes' : 'no',
            delete: deletePermission ? 'yes' : 'no'
        };

        const updatedSellerData = { ...sellerData, ...updatedPermissions };
        try {
            const response = await updateSellerData(sellerId, updatedSellerData);
            navigate("/admin/sellerPermission")
        } catch (error) {
            console.log("Error updating seller data:", error);
        }
    };

    return (
        <Container>
            <h2 className='playfair-display-mygooglefont'>Update Seller Permissions</h2>
            <Form>
                <Form.Group controlId="registerPermissionCheckbox">
                    <Form.Check
                        type="checkbox"
                        label="Register Permission"
                        checked={registerPermission}
                        onChange={() => setRegisterPermission(!registerPermission)}
                    />
                </Form.Group>

                <Form.Group controlId="updatePermissionCheckbox">
                    <Form.Check
                        type="checkbox"
                        label="Update Permission"
                        checked={updatePermission}
                        onChange={() => setUpdatePermission(!updatePermission)}
                    />
                </Form.Group>

                <Form.Group controlId="deletePermissionCheckbox">
                    <Form.Check
                        type="checkbox"
                        label="Delete Permission"
                        checked={deletePermission}
                        onChange={() => setDeletePermission(!deletePermission)}
                    />
                </Form.Group>

                <Button variant="primary" onClick={handleUpdatePermissions}>
                    Update Permissions
                </Button>
            </Form>
        </Container>
    );
};

export default UpdateSellerPermissions;
