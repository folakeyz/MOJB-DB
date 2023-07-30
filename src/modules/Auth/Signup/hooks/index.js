import { axiosInstance } from "../../../../axios-Instance";
import { toast } from "react-toastify";
import { toastOptions } from "../../../../utils";
import { useMutation } from "@tanstack/react-query";

const SERVER_ERROR = "There was an error contacting the server.";

async function userSign(formData) {
  const data = await axiosInstance({
    url: "/auth",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data?.data;
}

export function useRegister() {
  const { mutate, isError, error, isSuccess, reset } = useMutation({
    mutationFn: (formData) => userSign(formData),

    onError: (error) => {
      const err = error?.response?.data?.error
        ? error?.response?.data?.error
        : SERVER_ERROR;
      toast.error(err, toastOptions);
    },
  });
  return { mutate, isError, error, isSuccess, reset };
}
