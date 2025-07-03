import { useUI } from "@contexts/ui.context";
import Modal from "./modal";
import dynamic from "next/dynamic";
import Newsletter from "../newsletter";
import OTPForm from "@components/auth/otp-form";
import CouponForm from "@components/checkout/Coupone";
import EmailOTPForm from "@components/auth/email-otp-form";
import MergeUserForm from "@components/auth/merge-user-form";
const LoginForm = dynamic(() => import("@components/auth/login-form"));
const SignUpForm = dynamic(() => import("@components/auth/sign-up-form"));
const ForgetPasswordForm = dynamic(
  () => import("@components/auth/forget-password-form")
);
const ProductPopup = dynamic(() => import("@components/product/product-popup"));
const ManagedModal: React.FC = () => {
  const { displayModal, closeModal, modalView } = useUI();
  console.log(displayModal);
  console.log(modalView);
  return (
    <Modal open={displayModal} onClose={closeModal}>
      {modalView === "LOGIN_VIEW" && <LoginForm />}
      {modalView === "SIGN_UP_VIEW" && <SignUpForm />}
      {modalView === "FORGET_PASSWORD" && <ForgetPasswordForm />}
      {modalView === "PRODUCT_VIEW" && <ProductPopup />}
      {modalView === "NEWSLETTER_VIEW" && <Newsletter />}
      {modalView === "OTP_VIEW" && <OTPForm />}
      {modalView === "COUPON_VIEW" && <CouponForm />}
      {modalView === "EMAIL_OTP_VIEW" && <EmailOTPForm />}
      {modalView === "MERGE_USER_VIEW" && <MergeUserForm />}
    </Modal>
  );
};

export default ManagedModal;
