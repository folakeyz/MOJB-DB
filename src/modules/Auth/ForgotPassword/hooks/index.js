import { axiosInstance } from "../../../../axios-Instance";
import { useMutation } from "@tanstack/react-query";

async function forgotPassword(formData) {
  const data = await axiosInstance({
    url: "/auth/forgotPassword",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data?.data;
}

export function useForgotPassword() {
  const { mutate, isError, error, isSuccess, reset } = useMutation({
    mutationFn: (formData) => forgotPassword(formData),
  });
  return { mutate, isError, error, isSuccess, reset };
}
