import { Button } from 'react-bootstrap';

const Table = ({ data, headers, handleUpdate, handleDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">No.</th>
            {headers.map((header) => (
              <th key={header.key} className="border px-4 py-2 text-left">
                {header.label}
              </th>
            ))}
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              <td className="border px-4 py-2">{index + 1}</td>
              {headers.map((header) => (
                <td key={header.key} className="border px-4 py-2 text-sm md:text-base ">
                  {item[header.key]}
                </td>
              ))}
              <td className="border px-4 py-2 d-flex justify-content-center align-items-center gap-2">
                <Button
                  onClick={() => handleUpdate(item.id)}
                  variant="primary"
                  className="px-2 py-1 text-sm mt-0"
                >
                  Update
                </Button>
                <Button
                  onClick={() => handleDelete(item.id)}
                  variant="danger"
                  className="px-2 py-1 text-sm mt-0"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
