"use client";
import Button from "@components/ui/button";
import {
  CheckCircle,
  CreditCard,
  ShieldCheck,
  XCircle,
  Receipt,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-use";
import { CheckPaymentStatus } from "src/api/routs/CheckPayment";

import { ordersCheckResponse } from "src/api/type";

export default function ConfirmPayment() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const { t, i18n } = useTranslation("common");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const resourcePath = searchParams.get("resourcePath");
  const orderId = searchParams.get("OrderId");
  const [order, setOrder] = useState<ordersCheckResponse>();

  const code = process.env.NEXT_PUBLIC_CURRENCY;
  useEffect(() => {
    setIsClient(true);
    setTimeout(() => setIsAnimated(true), 100);

    const fetch = async () => {
      const res = await CheckPaymentStatus(orderId as string, resourcePath);
      setOrder(res);
    };
    fetch();
  }, []);

  if (!isClient) return null;

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div
        className={`w-full max-w-lg transform transition-all duration-700 ${
          isAnimated
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-8 opacity-0 scale-95"
        }`}
      >
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl shadow-blue-100/50 overflow-hidden border border-slate-200/60">
          {/* Header */}
          <div className="bg-heading px-8 py-6">
            <h2 className="text-2xl font-bold text-white text-center tracking-tight">
              {t("confirmPayment")}
            </h2>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Status Section */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div
                  className={`relative transform transition-all duration-500 ${
                    isAnimated ? "scale-100 rotate-0" : "scale-0 rotate-180"
                  }`}
                >
                  {order?.status === 3 ? (
                    <div className="relative">
                      <CheckCircle className="h-20 w-20 text-emerald-500 drop-shadow-lg" />
                      <div className="absolute inset-0 h-20 w-20 rounded-full bg-emerald-500/20 animate-ping"></div>
                    </div>
                  ) : (
                    <XCircle className="h-20 w-20 text-red-500 drop-shadow-lg" />
                  )}
                </div>
              </div>
              <h1 className="text-2xl font-bold text-slate-800 mb-2">
                {order?.status == 3 ? t("paymentSuccess") : t("paymentPending")}
              </h1>
            </div>

            {/* Order Total */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-6 mb-6 border border-slate-200/60">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 font-medium">
                  {t("orderTotal")}
                </span>
                <span className="text-3xl font-bold text-slate-800">
                  {order?.orderTotal} {code}
                </span>
              </div>
            </div>

            {/* Order Details */}
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-slate-800 mb-4 flex items-center">
                  <Receipt className="h-5 w-5 mr-2 text-blue-600" />
                  {t("orderSummary")}
                </h3>
                <div className="space-y-3 bg-slate-50 rounded-lg p-4">
                  <div className="flex justify-between text-slate-700">
                    <span>{t("productPrice")}</span>
                    <span className="font-semibold">
                      {order?.formattedTotalWOShipping} {code}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>{t("shipping")}</span>
                    <span className="font-semibold">
                      {order?.delivery} {code}
                    </span>
                  </div>
                  <hr className="border-slate-200" />
                  <div className="flex justify-between text-slate-700">
                    <span>{t("orderId")}</span>
                    <span className="font-mono text-sm font-semibold text-blue-600">
                      {order?.orderID}
                    </span>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="font-semibold text-slate-800 mb-3">
                  {t("address")}
                </h3>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-slate-700 leading-relaxed">
                    {order?.orderAddress?.address1}
                  </p>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="font-semibold text-slate-800 mb-3">
                  {t("paymentMethod")}
                </h3>
                <div className="flex items-center space-x-3 bg-slate-50 rounded-lg p-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-slate-700 font-medium">
                      {t("visaEnding")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-8 pb-8 space-y-4">
            <Button
              onClick={() => {
                localStorage.removeItem("vikik-cart");
                router.push("/");
              }}
              className="w-full bg-gradient-to-r text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center group"
            >
              {t("continue")}
              {i18n.language == "en" ? (
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              ) : (
                <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
              )}
            </Button>

            {/* Security Badge */}
            <div className="flex items-center justify-center text-slate-500 space-x-2 pt-4">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              <span className="text-sm font-medium">{t("securePayment")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
