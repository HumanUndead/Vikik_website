// import { useUI } from "@contexts/ui.context";
// // import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
// // import http from "@framework/utils/http";
// import Cookies from "js-cookie";
// import { useMutation } from "@tanstack/react-query";

// async function login(input: LoginInputType) {
//   // return http.post(API_ENDPOINTS.LOGIN, input);
//   return {
//     token: `${input.email}`.split("").reverse().join(""),
//   };
// }

// export const useLoginMutation = () => {
//   const { authorize, closeModal } = useUI();
//   return useMutation({
//     mutationFn: (input: LoginInputType) => login(input),
//     onSuccess: (data) => {
//       Cookies.set("auth_token", data.token);
//       authorize();
//       closeModal();
//     },
//     onError: (data) => {
//       console.log(data, "login error response");
//     },
//   });
// };
