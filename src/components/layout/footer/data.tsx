import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoYoutube,
} from "react-icons/io5";
import { SiGmail } from "react-icons/si";

export const footer = {
  widgets: [
    {
      id: 1,
      widgetTitle: "widget-title-social",
      lists: [
        {
          id: 1,
          title: "link-instagram",
          path: "https://www.instagram.com/vikikfashion/?hl=en",
          icon: <IoLogoInstagram />,
        },
        // {
        //   id: 2,
        //   title: "link-twitter",
        //   path: "#",
        //   icon: <IoLogoTwitter />,
        // },
        {
          id: 3,
          title: "link-facebook",
          path: "https://m.facebook.com/VikikFashion/",
          icon: <IoLogoFacebook />,
        },
      ],
    },
    {
      id: 2,
      widgetTitle: "widget-title-contact",
      lists: [
        {
          id: 1,
          title: "+96279060 0487",
          path: "/contact-us",
          icon: <FaPhoneAlt />,
        },
        {
          id: 2,
          title: "+96279060 0487",
          path: "/",
          icon: <FaWhatsapp />,
        },
        {
          id: 3,
          title: "info@vikikfashion.com",
          path: "",
          icon: <SiGmail />,
        },
      ],
    },
    {
      id: 3,
      widgetTitle: "widget-title-about",
      lists: [
        {
          id: 1,
          title: "link-support-center",
          path: "/contact-us",
        },
        {
          id: 2,
          title: "link-terms",
          path: "/terms",
        },
        {
          id: 3,
          title: "link-about-us",
          path: "/about",
        },
      ],
    },
  ],
  payment: [
    {
      id: 1,
      path: "/",
      image: "/assets/images/payment/mastercard.svg",
      name: "payment-master-card",
      width: 34,
      height: 20,
    },
    {
      id: 2,
      path: "/",
      image: "/assets/images/payment/visa.svg",
      name: "payment-visa",
      width: 50,
      height: 20,
    },
    {
      id: 3,
      path: "/",
      image: "/assets/images/payment/paypal.svg",
      name: "payment-paypal",
      width: 76,
      height: 20,
    },
    {
      id: 4,
      path: "/",
      image: "/assets/images/payment/jcb.svg",
      name: "payment-jcb",
      width: 26,
      height: 20,
    },
    {
      id: 5,
      path: "/",
      image: "/assets/images/payment/skrill.svg",
      name: "payment-skrill",
      width: 39,
      height: 20,
    },
  ],
};

export const footerContemporary = {
  widgets: [
    {
      id: 0,
      isCompanyIntroduction: true,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",

      lists: [
        {
          id: 1,
          title: "link-instagram",
          path: "https://www.instagram.com/redqinc/",
          icon: <IoLogoInstagram />,
        },
        {
          id: 2,
          title: "link-twitter",
          path: "https://twitter.com/redqinc",
          icon: <IoLogoTwitter />,
        },
        {
          id: 3,
          title: "link-facebook",
          path: "https://www.facebook.com/redqinc/",
          icon: <IoLogoFacebook />,
        },
        {
          id: 4,
          title: "link-youtube",
          path: "https://www.youtube.com/channel/UCjld1tyVHRNy_pe3ROLiLhw",
          icon: <IoLogoYoutube />,
        },
      ],
    },
    {
      id: 1,
      widgetTitle: "widget-title-social",
      lists: [
        {
          id: 1,
          title: "link-instagram",
          path: "https://www.instagram.com/redqinc/",
          icon: <IoLogoInstagram />,
        },
        {
          id: 2,
          title: "link-twitter",
          path: "https://twitter.com/redqinc",
          icon: <IoLogoTwitter />,
        },
        {
          id: 3,
          title: "link-facebook",
          path: "https://www.facebook.com/redqinc/",
          icon: <IoLogoFacebook />,
        },
        {
          id: 4,
          title: "link-youtube",
          path: "https://www.youtube.com/channel/UCjld1tyVHRNy_pe3ROLiLhw",
          icon: <IoLogoYoutube />,
        },
      ],
    },
    {
      id: 2,
      widgetTitle: "widget-title-contact",
      lists: [
        {
          id: 1,
          title: "link-contact-us",
          path: "/contact-us",
        },
        {
          id: 2,
          title: "link-email",
          path: "/",
        },
        {
          id: 3,
          title: "link-email-two",
          path: "/",
        },
        {
          id: 4,
          title: "link-phone",
          path: "/",
        },
      ],
    },
    {
      id: 3,
      widgetTitle: "widget-title-about",
      lists: [
        {
          id: 1,
          title: "link-support-center",
          path: "/contact-us",
        },
        {
          id: 2,
          title: "link-customer-support",
          path: "/",
        },
        {
          id: 3,
          title: "link-about-us",
          path: "/contact-us",
        },
        {
          id: 4,
          title: "link-copyright",
          path: "/",
        },
      ],
    },
  ],
  payment: [
    {
      id: 1,
      path: "/",
      image: "/assets/images/payment/mastercard.svg",
      name: "payment-master-card",
      width: 34,
      height: 20,
    },
    {
      id: 2,
      path: "/",
      image: "/assets/images/payment/visa.svg",
      name: "payment-visa",
      width: 50,
      height: 20,
    },
    {
      id: 3,
      path: "/",
      image: "/assets/images/payment/paypal.svg",
      name: "payment-paypal",
      width: 76,
      height: 20,
    },
    {
      id: 4,
      path: "/",
      image: "/assets/images/payment/jcb.svg",
      name: "payment-jcb",
      width: 26,
      height: 20,
    },
    {
      id: 5,
      path: "/",
      image: "/assets/images/payment/skrill.svg",
      name: "payment-skrill",
      width: 39,
      height: 20,
    },
  ],
};
