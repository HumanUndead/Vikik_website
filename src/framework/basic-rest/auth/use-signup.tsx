// import { useUI } from "@contexts/ui.context";
// // import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
// // import http from "@framework/utils/http";
// import Cookies from "js-cookie";
// import { useMutation } from "@tanstack/react-query";

// async function signUp(input: SignUpInputType) {
//   // return http.post(API_ENDPOINTS.LOGIN, input);
//   return {
//     token: `${input.email}.${input.name}`.split("").reverse().join(""),
//   };
// }
// export const useSignUpMutation = () => {
//   const { authorize, closeModal } = useUI();
//   return useMutation({
//     mutationFn: (input: SignUpInputType) => signUp(input),
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
