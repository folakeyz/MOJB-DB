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

const Members = () => {
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
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

  const {
    mutate: remove,
    isError: isEDelete,
    isSuccess: isSDelete,
    reset: eReset,
    error: Error,
  } = useDeleteMembers();
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
            remove(res._id);
          }
        });
      },
    },
  ];

  const {
    mutate: update,
    isError: isUDelete,
    isSuccess: isUSuccess,
    reset: uReset,
    error: uError,
  } = useUpdateMembers();

  if (isEDelete) {
    eReset();
    errorAlert(Error);
  }
  if (isSDelete) {
    eReset();
    setOpen(false);
    successAlert("Deleted Successfully");
  }

  if (isUDelete) {
    uReset();

    errorAlert(uError);
  }
  if (isUSuccess) {
    uReset();
    setOpen(false);
    successAlert("Updated Successfully");
  }

  const editHandler = () => {
    swal({
      title: "Are you sure?",
      text: "you want to perform this action",
      icon: "warning",
      //    @ts-ignore
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        update(formData);
      }
    });
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

  const options = [{ value: "Yes" }, { value: "No" }];
  const loading = useIsMutating();
  return (
    <PrivateLayout name="Members" pageTitle="Members">
      <div className="btnContainer right">
        <button
          type="button"
          onClick={openHandler}
          className="btn btnSuccessOutline"
        >
          Add Member
        </button>
        <button type="button" onClick={openHandler} className="btn btnSuccess">
          Bulk Upload
        </button>
      </div>

      <Table data={data} columns={columns} actions={actions} />
      {/* Modal */}
      <Modal
        title=""
        isVisible={open}
        onClose={() => setOpen(!open)}
        size="xl"
        content={
          <>
            <div className="modalTitle">{edit ? "Edit" : "Create"} Member</div>
            {/* <p>{error}</p> */}
            <FormGroup
              onSubmit={edit ? editHandler : submitHandler}
              validation={!edit && formData}
              errors={errors}
              setErrors={setErrors}
            >
              <Input
                name="surname"
                label="Surname"
                value={formData["surname"]}
                onChange={handleChange}
                type="text"
                validationHandler={validationHandler}
                error={errors.surname}
                required={true}
              />
              <Input
                name="name"
                label="Other Names"
                value={formData["name"]}
                onChange={handleChange}
                type="text"
                validationHandler={validationHandler}
                error={errors.name}
                required={true}
              />
              <Input
                name="email"
                label="Email Address"
                value={formData["email"]}
                onChange={handleChange}
                type="text"
                validationHandler={validationHandler}
                error={errors.email}
              />
              <Input
                name="phone"
                label="Phone"
                value={formData["phone"]}
                onChange={handleChange}
                type="text"
                validationHandler={validationHandler}
                error={errors.phone}
              />
              <DateInput
                name="date"
                label="Date of Birth"
                value={formData["date"]}
                onChange={handleChange}
                validationHandler={validationHandler}
                error={errors.date}
                // required={true}
              />

              <Input
                name="occupation"
                label="Occupation"
                value={formData["occupation"]}
                onChange={handleChange}
                type="text"
                validationHandler={validationHandler}
                error={errors.occupation}
                // required={true}
              />
              <Textarea
                name="address"
                label="Address"
                value={formData["address"]}
                onChange={handleChange}
                type="text"
                validationHandler={validationHandler}
                error={errors.address}
                // required={true}
                size="large"
              />
              <Radio
                name="encounteredJesus"
                label="Have you Encountered Jesus"
                value={formData["encounteredJesus"]}
                onChange={handleChange}
                type="text"
                validationHandler={validationHandler}
                error={errors.encounteredJesus}
                // required={true}
                data={options}
              />
              <Input
                name="yearEncounteredJesus"
                label="Year Encountered Jesus"
                value={formData["yearEncounteredJesus"]}
                onChange={handleChange}
                type="text"
                validationHandler={validationHandler}
                error={errors.yearEncounteredJesus}
              />
              <Radio
                name="baptizedByImmersion"
                label="Have you been Baptized by Immersion"
                value={formData["baptizedByImmersion"]}
                onChange={handleChange}
                type="text"
                validationHandler={validationHandler}
                error={errors.baptizedByImmersion}
                // required={true}
                data={options}
              />
              <Input
                name="yearBaptized"
                label="Year Baptized by Immersion"
                value={formData["yearBaptized"]}
                onChange={handleChange}
                type="text"
                validationHandler={validationHandler}
                error={errors.yearBaptized}
              />
              <Radio
                name="inDepartment"
                label="Are you in a Department"
                value={formData["inDepartment"]}
                onChange={handleChange}
                type="text"
                validationHandler={validationHandler}
                error={errors.inDepartment}
                // required={true}
                data={options}
              />
              <Input
                name="department"
                label="Department"
                value={formData["department"]}
                onChange={handleChange}
                type="text"
                validationHandler={validationHandler}
                error={errors.department}
              />
              <Radio
                name="inSociety"
                label="Are you in a Society"
                value={formData["inSociety"]}
                onChange={handleChange}
                type="text"
                validationHandler={validationHandler}
                error={errors.inSociety}
                // required={true}
                data={options}
              />
              <Input
                name="society"
                label="Society"
                value={formData["society"]}
                onChange={handleChange}
                type="text"
                validationHandler={validationHandler}
                error={errors.society}
              />
              <Button
                type="submit"
                title={edit ? "Update" : "Submit"}
                loading={loading === 1}
                disabled={loading === 1}
                bgColor="btnYellow"
              />
              <Button
                type="button"
                title="Cancel"
                bgColor="btnBlack"
                onClick={() => setOpen(!open)}
              />
            </FormGroup>
          </>
        }
      />
      {/* end of Modal */}
    </PrivateLayout>
  );
};

export default Members;
