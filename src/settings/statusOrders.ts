export function getCartStatus(statusCode: number): string {
  switch (statusCode) {
    case -10:
      return "Cancelled";
    case -1:
      return "NotConfirmed";
    case 1:
      return "New";
    case 2:
      return "Pending";
    case 3:
      return "Paid";
    case 4:
      return "ReadyToShip";
    case 5:
      return "Shipped";
    case 6:
      return "Complete";
    case -7:
      return "Refund";
    case 8:
      return "Approved";
    case 9:
      return "OnlinePaymentReceived";
    case 10:
      return "OnlinePaymentFailed";
    default:
      return "Unknown Status";
  }
}
