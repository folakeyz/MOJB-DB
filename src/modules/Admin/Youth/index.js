import React from "react";
import PrivateLayout from "../../../layout";
import { Table } from "mtforms";
import { useYouth } from "./hooks";

const Youth = () => {
  const data = useYouth();
  const columns = [
    { title: "Name", field: "name" },
    { title: "District", field: "district" },
    { title: "Phone", field: "phone" },
    { title: "Assembly", field: "assembly" },
  ];
  return (
    <PrivateLayout name="Youths" pageTitle="Youth">
      <Table data={data} columns={columns} />
    </PrivateLayout>
  );
};

export default Youth;
