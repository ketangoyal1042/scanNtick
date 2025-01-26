import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { getEventCollaborator } from "../../../../api/event";

const CollaboratorList = ({ EventId }) => {
  const [CollaboratorList, setCollaboratorList] = useState([]);
  useEffect(() => {
    getCollaboratorList();
  }, [EventId]);

  const getCollaboratorList = async () => {
    const UserList = await getEventCollaborator(EventId);
    console.log("USERLSIT", UserList);
    
    if (UserList){
        setCollaboratorList(UserList);
    }
  }
  return (
    <>
      <div className="">
        <h3 className="p-3 text-3xl text-center my-5 font-bold">
          Collaborators/SubAdmins
        </h3>
      </div>
      <div className="listing">
        <div className="overflow-x-auto ">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Product name</Table.HeadCell>
              <Table.HeadCell>Color</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {'Apple MacBook Pro 17"'}
                </Table.Cell>
                <Table.Cell>Sliver</Table.Cell>
                <Table.Cell>Laptop</Table.Cell>
                <Table.Cell>$2999</Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Microsoft Surface Pro
                </Table.Cell>
                <Table.Cell>White</Table.Cell>
                <Table.Cell>Laptop PC</Table.Cell>
                <Table.Cell>$1999</Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Magic Mouse 2
                </Table.Cell>
                <Table.Cell>Black</Table.Cell>
                <Table.Cell>Accessories</Table.Cell>
                <Table.Cell>$99</Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Remove
                  </a>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
};

export default CollaboratorList;
