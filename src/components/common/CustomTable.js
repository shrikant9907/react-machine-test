import React, { useState } from "react";
import { Table } from "react-bootstrap";

const CustomTable = ({ heading, head, data, onDelete, onEdit }) => {

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
 
  return (
    <>

      {heading ?
        <div className="text-muted mb-3">
          <i>{heading}</i>
        </div>
        : ''
      }

      {head || data ?
        <Table bordered hover className="mb-4 custom-table">
          {head ?
            <thead>
              <tr>
                {
                  head.map((data, index) => {
                    return <th key={index}> {data} </th>
                  })
                }
              </tr>
            </thead>
            : ''
          }
          {data && data.length > 0 ?
            <tbody>
              {
                data.map((item, index) => {
                  return <tr key={index}>
                    {
                      (typeof item === "object") ?
                        Object.values(item).map((value, idx) => {
                          if (head[idx] === 'Actions') {
                            return <td key={idx}>
                              <div className="d-flex relative action-cell">
                                <button onClick={() => onEdit(item.id)} className="w-auto btn btn-sm btn-success">Edit</button>
                                {!showDeleteConfirm ? 
                                  <button onClick={() => setShowDeleteConfirm(true)} className="btn btn-sm btn-danger ms-2">Delete</button>
                                : 

                                <div className="confirm">
                                   Are you sure?
                                  <div className="confirmbtn">
                                    <button onClick={() => setShowDeleteConfirm(false)} className="btn btn-sm btn-outline-primary">No</button>
                                    <button onClick={() => onDelete(item.id)} className="btn btn-sm btn-primary ms-2">Yes</button>
                                  </div>
                                </div>
                                }
                              </div>
                            </td>
                          } else if (head[idx] === 'Image') {
                            return <td key={idx}>
                              <div className="d-flex align-items-center justify-content-center thumbnail img-thumbnail ">
                                <img src={value} height={70} width={70} alt="" />
                              </div>
                            </td>
                          } else {
                            return <td key={idx}> {value}</td>
                          }
                        })
                        :
                        <td> {item} </td>
                    }
                  </tr>
                })
              }
            </tbody>
            : <tbody><tr><td colSpan={9}>Empty</td></tr></tbody>
          }
        </Table>
        :
        <p>No records found.</p>
      }
    </>
  );
};

export default CustomTable;