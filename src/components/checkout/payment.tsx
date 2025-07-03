import React, { useEffect } from "react";

const styles = {
  container: {
    fontFamily: "Poppins, sans-serif",
    backgroundColor: "#212121",
    minHeight: "100vh",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  header: {
    backgroundColor: "white",
    padding: "20px",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  cardContainer: {
    perspective: 1000,
    marginTop: "40px",
  },
  card: {
    width: "330px",
    height: "220px",
    position: "relative",
    transformStyle: "preserve-3d",
    transition: "transform 0.6s",
    cursor: "pointer",
  },
  cardSide: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    borderRadius: "20px",
    padding: "25px",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    color: "white",
  },
  cardFront: {
    backgroundImage:
      "radial-gradient(circle at 90% 10%, rgba(255,255,255,0.2) 0%, transparent 40%)",
  },
  cardBack: {
    transform: "rotateY(180deg)",
    background: "linear-gradient(135deg, #0d8a68 0%, #1FB98E 100%)",
  },
  cardLogo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardNetworks: {
    display: "flex",
    gap: "10px",
  },
  cardNumber: {
    fontSize: "22px",
    letterSpacing: "2px",
    textAlign: "center",
    margin: "20px 0",
  },
  cardDetails: {
    display: "flex",
    justifyContent: "space-between",
  },
  cardText: {
    fontWeight: 500,
    marginTop: "4px",
  },
  magneticStrip: {
    background: "#000",
    height: "40px",
    margin: "20px 0",
  },
  cardCvv: {
    background: "rgba(255,255,255,0.4)",
    padding: "8px",
    borderRadius: "4px",
    maxWidth: "50px",
    textAlign: "center",
    color: "#2d3748",
  },
  secureBadge: {
    marginTop: "30px",
    fontSize: "14px",
    color: "lightgray",
  },
  icon: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
};

const PaymentWidget = ({ payment, orderId }) => {
  useEffect(() => {
    // Inject the HyperPay script
    const script = document.createElement("script");
    script.src = `${payment.BaseUrl}/v1/paymentWidgets.js?checkoutId=${payment?.CheckoutResponse?.id}`;
    script.async = true;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    window.wpwlOptions = {
      style: "plain",
      paymentTarget: "_top",
      onReady: function () {
        const css = `
  .wpwl-form {
    max-width: 400px;
    margin: 30px auto;
    padding: 30px 20px;
    background-color: #1f1f1f;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
    font-family: 'Poppins', sans-serif;
    color: #eee;
  }

  .wpwl-label {
    display: block;
    margin-bottom: 6px;
    font-weight: 500;
    font-size: 14px;
    color: #fff !important;
  }

  .wpwl-control {
    width: 100%;
    padding: 12px 10px;
    font-size: 15px;
    color: #000 !important;
    background-color: #fff;
    border: 2px solid #ddd;
    border-radius: 6px;
    transition: border-color 0.2s, background-color 0.2s;
  }

  .wpwl-control:hover,
  .wpwl-control:focus {
    border-color: #1abc9c;
    background-color: #fafafa;
  }

  .wpwl-button-pay {
    display: block;
    width: 100%;
    padding: 14px;
    margin-top: 20px;
    background-color: #1abc9c;
    border: none;
    border-radius: 6px;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
  }

  .wpwl-button-pay:hover,
  .wpwl-button-pay:focus {
    background-color: #fff;
    color: #1abc9c;
    border: 2px solid #1abc9c;
  }

  .wpwl-hint {
    margin-top: 4px;
    font-size: 12px;
    color: #aaa;
  }

  .wpwl-group {
    margin-bottom: 20px;
  }
`;

        const style = document.createElement("style");
        style.type = "text/css";
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
      },
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [payment]);

  return (
    <div style={styles.container}>
      <div
        style={styles.cardContainer}
        onClick={() => {
          document.querySelector(".card").classList.toggle("flipped");
        }}
      ></div>

      <form
        action={`http://localhost:3000/en/result/?TransactionID=${payment?.TransactionID}&Amount=${payment?.total}&orderId=${orderId}`}
        className="paymentWidgets"
        data-brands="VISA MASTER AMEX"
      ></form>
    </div>
  );
};

export default PaymentWidget;
