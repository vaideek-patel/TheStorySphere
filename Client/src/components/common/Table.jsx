import React from 'react';
import { Button, Container } from 'react-bootstrap';

const Table = ({ data, headers, handleUpdate, handleDelete }) => {
  console.log(data)
  return (
    <Container className="py-4">
      <div className="overflow-x-auto">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">No.</th>
              {headers.map((header) => (
                <th key={header.key} scope="col">
                  {header.label}
                </th>
              ))}
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                <td>{index + 1}</td>
                {headers.map((header) => (
                  <td key={header.key}>{item[header.key]}</td>
                ))}
                <td className="d-flex justify-content-center align-items-center gap-2">
                  <Button onClick={() => handleUpdate(item.id)} variant="primary" size="sm">
                    Update
                  </Button>
                  <Button onClick={() => handleDelete(item.id)} variant="danger" size="sm">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default Table;
