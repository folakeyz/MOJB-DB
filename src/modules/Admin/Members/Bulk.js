import React from "react";
import PrivateLayout from "../../../layout";
import {
  Table,
  FormGroup,
  Modal,
  Button,
  Input,
  DateInput,
  Textarea,
  Radio,
  ImageUpload,
} from "mtforms";
import {
  useCreateMembers,
  useDeleteMembers,
  useMembers,
  useUpdateMembers,
} from "./hooks";
import swal from "sweetalert";
import { errorAlert, successAlert } from "../../../utils";
import { useIsMutating } from "@tanstack/react-query";
import * as XLSX from "xlsx";

const Members = () => {
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [upload, setUpload] = React.useState(false);
  const [formData, setFormData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  // state handler
  const openHandler = () => {
    setOpen(true);
    setEdit(false);
    setFormData("");
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  const validationHandler = (name, error) => {
    setErrors({ ...errors, [name]: error });
  };
  const data = useMembers();
  const columns = [
    { title: "Surname", field: "surname" },
    { title: "Other Names", field: "name" },
    { title: "Phone", field: "phone" },
    { title: "Email", field: "email" },
    { title: "Address", field: "address" },
    { title: "Occupation", field: "occupation" },
    { title: "Date", field: "date" },
    { title: "Have you Encountered Jesus", field: "encounteredJesus" },
    { title: "Year Encountered Jesus", field: "yearEncounteredJesus" },
    {
      title: "Have you been Baptized by Immersion",
      field: "baptizedByImmersion",
    },
    { title: "Year Baptized by Immersion", field: "yearBaptized" },
    { title: "Are you in a Department", field: "inDepartment" },
    { title: "Department", field: "department" },
    { title: "Are you in a Society", field: "inSociety" },
    { title: "society", field: "society" },
  ];

  const actions = (item) => [
    {
      name: "Edit",
      onClick: (res) => {
        setEdit(true);
        setOpen(true);
        setFormData(res);
      },
    },
    {
      name: "Delete",
      onClick: (res) => {
        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this",
          icon: "warning",
          //    @ts-ignore
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            // remove(res._id);
          }
        });
      },
    },
  ];

  const uploadHandler = (name, file) => {
    var files = file[0],
      f = files;
    var allowedExtensions =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      "application/vnd.ms-excel" ||
      ".csv";
    console.log(f, "file");
    // if (f.type !== allowedExtensions) {
    //   swal("Warning!", "Invalid File", "warning");
    // } else {
    var reader = new FileReader();
    reader.onload = function (e) {
      setUpload(true);
      var data = reader.result;
      let readedData = XLSX.read(data, { type: "binary" });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];
      /* Convert array to json*/
      const dataParse = XLSX.utils.sheet_to_json(ws);
      if (dataParse.length === 0) {
        setUpload(false);
        swal("Warning!", "Document is empty", "warning");
      } else {
        functions(dataParse);
      }
    };
    reader.readAsBinaryString(f);
    // }
  };

  function ExcelDateToJSDate(date) {
    const newDate = new Date(Math.round((date - 25569) * 86400 * 1000));
    return newDate.toDateString() !== "Invalid Date"
      ? newDate.toLocaleDateString()
      : date;
  }

  const functions = (dataParse) => {
    const list = [];

    for (let i = 0; i < dataParse.length; i++) {
      const bulkItem = dataParse[i];

      if (bulkItem["surname"] && bulkItem["name"]) {
        const singleItem = {
          ...bulkItem,
          date: ExcelDateToJSDate(bulkItem["date"]),
        };
        list.push(singleItem);
      } else {
        setUpload(false);
        swal("Warning!", "Some Fields are required!", "warning");
      }
    }
    setFormData(list);
    setUpload(false);
  };

  const { mutate, isError, isSuccess, reset, error } = useCreateMembers();
  const submitHandler = () => {
    mutate(formData);
  };
  if (isError) {
    reset();
    errorAlert(error);
  }
  if (isSuccess) {
    reset();
    setOpen(false);
    successAlert("Created Successfully");
  }

  const loading = useIsMutating();
  return (
    <PrivateLayout name="Members" pageTitle="Members">
      <ImageUpload
        name="file"
        label="File"
        onChange={uploadHandler}
        validationHandler={validationHandler}
        error={errors.file}
        type="file"
      />
      {formData?.length > 0 && (
        <>
          <Table data={formData} columns={columns} actions={actions} />
          <div className="btnContainer right">
            <button
              type="button"
              disabled={Boolean(loading)}
              onClick={submitHandler}
              className="btn btnYellow marginRight"
            >
              Upload
              {Boolean(loading) && <span className="loading"></span>}
            </button>
          </div>
        </>
      )}
    </PrivateLayout>
  );
};

export default Members;
