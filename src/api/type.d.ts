/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ILoginData {
  phone: string;
}

export interface IOTPGenerat {
  phoneNumber: number;
}

export interface IOTPVerify {
  OTP: number;
  phoneNumber: number;
}

export interface Category {
  Id: string;
  name: string;
  image: string;
  hasChildren: boolean;
  parentId: string | null;
  FullImagePath: string;
}

export interface Product {
  SpecTableList: any[];
  Merchant: any | null;
  Attachments: any[];
  Inquiry: number;
  View: number;
  Rating: number;
  ExtraInfoMerchant: any[];
  ExtraInfoBrands: any[];
  ExtraInfoCategories: any[];
  IsQuickAdd: boolean;
  IsWishlist: boolean;
  ReviewsCount: number;
  Reviews: any[];
  DateAdded: string;
  ShopItem: boolean;
  ShowPrice: boolean;
  ID: string;
  Type: number;
  ImageURL: string | null;
  ThumbURL: string;
  ThumbURLMobile: string | null;
  Attachment: string;
  Lang: string | null;
  OutOfStock: boolean;
  Name: string;
  MinPlayer: number | null;
  MaxPlayer: number | null;
  ProductionYear: number | null;
  MinAge: number | null;
  Price: number;
  FormattedPrice: string;
  OldPrice: number;
  Featured: boolean;
  Enable: boolean;
  FormattedOldPrice: string;
  DiscountRate: number;
  Sellable: boolean;
  Rejected: boolean;
  Recurrent: boolean;
  Recurrence: number;
  RecurrencePeriod: number;
  SetupPrice: number;
  StartDate: string | null;
  EndDate: string | null;
  UpdateDate: string;
  Specs: any[];
  Description: string;
  RelatedAlbum: any | null;
  OwnerID: string;
  OwnerName: string | null;
  Quantity: number;
  name_en: string | null;
  description_en: string | null;
  name_ar: string | null;
  description_ar: string | null;
  CategoryID: string;
  Barcode: string;
  Reject: boolean;
  Approved: boolean;
  isDeleted: boolean;
  HasChildren: boolean;
  CategoryName: string;
  BrandName: string;
  BrandID: string;
  MiddleDescription: string;
  ShortDescription: string;
  MiniDescription: string;
  MinierDescription: string;
  CustomSpecs: any[];
  Images: string;
  ImageList: string[];
  FirstImagePost: string;
  ImagePostMax: number;
  HTMLTitle: string;
  HTMLDescription: string;
  Weight: number;
  Height: number;
  Width: number;
  Breadth: number;
  OverrideShipping: any | null;
  VolumicWeight: number;
  ShippingWeight: number;
  ParentID: string;
  ParentName: string;
  FullPath: string;
  FullImagePath: string;
  FullImagePathMobile: string;
  CartAddPath: string;
  CategoryFullPath: string;
  Tags: string;
  ProdType: number;
  BundleProducts: any[];
  Searchable: boolean;
  HotDeal: boolean;
  Size: {
    ID: string | null;
    Label: string | null;
    Value: string | null;
    Rank: number;
  };
  Color: {
    ID: string | null;
    parentColor: string | null;
    Label: string | null;
    Value: string | null;
    Rank: number;
  };
  GroupID: string | null;
  Categories: any[];
  CityID: string | null;
  CityName: string | null;
  CountryID: string | null;
  CategoryParentPath: string;
  TopParent: any | null;
  VendorID: any | null;
  Rank: number;
  OnlineDeals: any | null;
  MostPopular: any | null;
  NewArrival: boolean;
  ExtraInfo: any | null;
  ExtraData: any | null;
  OutDoorThumbURL: string | null;
  FullOutDoorImagePath: string;
  CategoryExtraInfo: any | null;
  MobileOnly: boolean;
  WebOnly: boolean;
  ColorLbl: string | null;
  SizeLbl: string | null;
}
interface SearchData {
  Item1: string;
  Item2: string;
  Item3: string;
  Item4: string;
}

interface Address {
  Id: string;
  name: string;
  address1: string;
  address2: string;
  city: string;
  country: string;
  phone1: string;
  phone2: string;
  postal: string;
}

interface ProductJson {
  id: string;
  qty: number;
  notes: string;
}

interface User {
  FirstName: string | null;
  MiddleName: string | null;
  Bio: string | null;
  ID: string;
  LangID: string;
  ThumbImage: string | null;
  Name: string;
  FirebaseToken: string | null;
  Golden: boolean;
  isFriend: boolean;
  isBlocked: boolean;
  isMute: boolean;
  FriendIsBlocked: boolean;
  isRequested: boolean | null;
  Phone: string;
  PostCode: string | null;
  Email: string;
  IsAdmin: boolean;
  Title: number;
  Muslim: boolean;
  Gender: number;
  City: string | null;
  State: string | null;
  Country: string | null;
  Nationality: string | null;
  Fax: string | null;
  Degree: number;
  Profession: string | null;
  Institution: string | null;
  DOB: string;
  MailingAddress: string | null;
  Type: number;
  MemberOf: any[];
  Specialize: string | null;
  IsActive: boolean;
  IsTermActive: boolean;
  FacebookID: string | null;
  AppleID: string | null;
  GoogleID: string | null;
  LastUpdateDate: string;
  RegistrationDate: string;
  Visible: boolean;
  AdminApprovedType: number;
  OTP: string;
  EmailCode: string | null;
  OTPConfirmed: boolean;
  EmailConfirmed: boolean;
  Age: number;
  Limit: number;
  PlanLimit: number;
  TotalLimit: number;
  AvailableExtraOffers: number;
  ConnectionID: string | null;
  DeviceID: string | null;
  FullImagePath: string;
  LoginProvider: number;
  IsDealer: boolean;
  PasswordHash: string | null;
  PasswordMD: string | null;
  UsedLanguages: string | null;
  ProviderUserKey: string;
  UserName: string;
  LastName: string | null;
  FullName: string;
  Status: number;
  EmailRegister: boolean;
  EmailApproved: boolean;
  SubscriptionStatus: string | null;
  ActiveListings: number;
  InActiveListings: number;
  TermsActive: boolean;
  BillingFirstName: string | null;
  BillingLastName: string | null;
  Interests: number;
  Tokens: number;
  Balance: number;
  PostalCode: number;
  Birthdate: string; // Date as string in ISO format
  ProfilePic: string | null;
  Useridentity: number;
  Isdeleted: boolean;
  Count: number;
  MaritalStatus: string | null;
  ParentalStatus: string | null;
  JobLevel: string | null;
  JobFunction: string | null;
  EmploymentStatus: string | null;
  HouseholdIncome: string | null;
  Education: string | null;
  IndustrySectors: string | null;
  MembershipNo: string | null;
  NationalNo: string | null;
  DepartmentName: string | null;
  ConsumedPoints: boolean;
  ZoomLink: string | null;
  IsApproved: boolean;
  IsSeenAvailableSurveys: boolean;
  IsSeenCompletedSurveys: boolean;
  IsMember: boolean;
  EntityId: number;
  Impaired: boolean;
  Total_Point: number;
}

interface UserResponse {
  User: User;
  result: number;
}

interface ProductReview {
  ProductID: string;
  UserID: string;
  UserName: string;
  Rating: number;
  Review: string;
  IBought: boolean | null;
  IsEnabled: boolean | null;
  DateAdded: string;
}

interface CategorySpec {
  lookups: any[];
  ID: string;
  Name: string;
  Value: any;
  Required: boolean;
  LangSpecific: boolean;
  Type: number;
  TypeName: string;
  Source: string;
  LookupText: string | null;
  DesignType: any | null;
}

interface specs {
  CategoryID: number;
  ID: number;
  Name: string;
  Rank: number;
  Value: number;
}

interface ValueSpecs {
  nameSpecs: string;
  categoryId: string;
  valueSpecs: specs[];
}

interface PagesFooter {
  Name: string;
  Text: string;
  Placement: number;
  Label: string;
  Path: string | null;
  Date: string;
  ShortDescription: string;
  ID: number;
  Title: string;
  Description: string;
  Keywords: string;
  ContentType: number;
  Lang: {
    ID: string;
    Name: string | null;
    Encoding: string | null;
    Direction: string | null;
    InverseDirection: boolean;
    Culture: string | null;
    Prefix: string | null;
  };
  SubTitle: string;
}

interface MenuItem {
  HTMLDesc: string;
  HTMLKeywords: string | null;
  HTMLTitle: string;
  HasChildren: boolean;
  ID: string;
  ItemType: number;
  Name: string;
  ParentID: string;
  Path: string;
  Rank: number;
  RelativePath: string;
  StaticMenuItems: MenuItem[];
  ThumbURL: string;
}

interface City {
  CityAgency: string | null;
  CountryID: number;
  CountryName: string | null;
  Description: string | null;
  FullImagePath: string;
  ID: string;
  IsCapital: boolean;
  Lat: number;
  Lon: number;
  Name: string;
  Rank: number;
  StateID: number;
  ThumbURL: string | null;
  Value: string;
}

interface prdoucstWithpages {
  products: Product[];
  pages: number;
}

interface Order {
  ID: string;
  MerchantID: string;
  RefTransactionID: string;
  MerchantName: string | null;
  MerchantDescription: string | null;
  MerchantPhone: string | null;
  VendorPhone: string | null;
  Branchphone: string | null;
  DriverName: string | null;
  MADA: boolean;
  BranchName: string | null;
  OrderID: string;
  OwnerID: string;
  ItemsCount: number;
  Items: any[]; // Define specific item structure if available
  TotalWOShipping: number;
  SkipTotal: number;
  FormattedSkipTotal: string;
  FormattedTotalWOShipping: string;
  OrderTotal: number;
  Total: number;
  pointDiscount: number;
  PromoAmount: number;
  PromoOwner: number;
  PromoCodeID: number;
  FormattedTotal: string;
  TotalWeight: number;
  TotalVolWeight: number;
  AlternateTotal: number;
  Status: number;
  SkipStatus: number;
  ShippingIncluded: boolean;
  ShippingPrice: number;
  FormattedShippingPrice: string;
  AlternateShippingPrice: number;
  ShippedToName: string | null;
  ShippingAddress: string;
  Phone: string | null;
  driverPhone: string | null;
  ShippingDate: string | null;
  Delivery: number;
  Email: string;
  Country: string | null;
  City: string | null;
  Address1: string | null;
  Address2: string | null;
  Postal: string | null;
  Notes: string;
  OrderDate: string;
  OrderAddress: {
    ID: string;
    Label: string;
    Address1: string;
    Address2: string;
    City: string;
    CityName: string | null;
    Country: string;
    Postal: string;
    Phone1: string;
    Phone2: string;
    Latitude: number;
    Longitude: number;
    District: string | null;
    BuildingNum: string | null;
    street: string | null;
    Value: string | null;
    IsDeleted: boolean;
    UserID: string;
    LangID: string | null;
  };
  TransactionID: string | null;
  OwnerName: string;
  DriverID: string | null;
  TrackingNo: string;
  CancelReason: string | null;
  SkipProfitFromDriver: number;
  VendorEarnings: number;
  SkipProfitFromVendor: number;
  Reason: string | null;
  BranchID: string | null;
  CompleteDescription: string | null;
  AcceptedTime: string | null;
  EstDone: string | null;
  DoneTime: string | null;
  PickupTime: string | null;
  EstDelivering: string | null;
  CompleteTime: string | null;
  Distance: number | null;
  DriverEarnings: number | null;
  DriverRating: number | null;
  MyDeliveryMethod: number;
  ShippingFees: number;
  Captured: boolean;
  FormattedOrderTotal: string;
  TransactionTotal: number;
  FormattedTransactionTotal: string;
  FormattedShippingFees: string;
  ChangeStatusDescription: string | null;
  ShippingFeesWithoutVat: number;
  CustomerPhone: string | null;
  IsScheduled: string;
}

interface ResponseOrders {
  success: string;
  orders: Order[];
  pages: string;
}

interface orderDetails {
  ID: string;
  MerchantID: string;
  RefTransactionID: string;
  MerchantName: string | null;
  MerchantDescription: string | null;
  MerchantPhone: string | null;
  VendorPhone: string | null;
  Branchphone: string | null;
  DriverName: string | null;
  MADA: boolean;
  BranchName: string | null;
  OrderID: string;
  OwnerID: string;
  ItemsCount: number;
  Items: {
    ID: number;
    Item: {
      COID: number;
      UnitPrice: number;
      ProductID: number;
      Recurrent: boolean;
      RecurrencePeriod: number;
      RecurrenceInterval: number;
      Notes: string | null;
      UniqueProductID: string;
      Size: string | null;
      Color: string | null;
      GroupID: string | null;
      StoreID: number;
      CategoryID: string | null;
      SpecTableList: any[];
      Merchant: any | null;
      Attachments: any[];
      Inquiry: number;
      View: number;
      Rating: number;
      ExtraInfoMerchant: any[];
      ExtraInfoBrands: any[];
      ExtraInfoCategories: any[];
      IsQuickAdd: boolean;
      IsWishlist: boolean;
      ReviewsCount: number;
      Reviews: any[];
      DateAdded: string;
      ShopItem: boolean;
      ShowPrice: boolean;
      ID: string;
      Type: number;
      ImageURL: string | null;
      ThumbURL: string;
      ThumbURLMobile: string | null;
      Attachment: string | null;
      AttachmentMultiLangs: string | null;
      Lang: string | null;
      OutOfStock: boolean;
      Name: string;
      Price: number;
      FormattedPrice: string;
      OldPrice: string | null;
      Featured: boolean;
      Enable: boolean;
      FormattedOldPrice: string;
      DiscountRate: number;
      Sellable: boolean;
      Rejected: boolean;
      Recurrence: number;
      SetupPrice: number;
      StartDate: string | null;
      EndDate: string | null;
      UpdateDate: string | null;
      Specs: any[];
      Description: string | null;
      RelatedAlbum: string | null;
      OwnerID: string;
      OwnerName: string | null;
      Quantity: number;
      name_en: string | null;
      description_en: string | null;
      name_ar: string | null;
      description_ar: string | null;
      Barcode: string;
      Reject: boolean;
      Approved: boolean;
      isDeleted: boolean;
      HasChildren: boolean;
      CategoryName: string | null;
      BrandName: string | null;
      BrandID: string | null;
      MiddleDescription: string | null;
      ShortDescription: string | null;
      MiniDescription: string | null;
      MinierDescription: string | null;
      CustomSpecs: any[];
      Images: string | null;
      ImageList: any[];
      FirstImagePost: string;
      ImagePostMax: number;
      HTMLTitle: string;
      HTMLDescription: string | null;
      Weight: number;
      Height: number;
      Width: number;
      Breadth: number;
      OverrideShipping: string | null;
      VolumicWeight: number;
      ShippingWeight: number;
      ParentID: string | null;
      ParentName: string | null;
      FullPath: string;
      FullImagePath: string;
      FullImagePathMobile: string;
      CartAddPath: string;
      CategoryFullPath: string;
      Tags: string | null;
      ProdType: number;
      BundleProducts: any[];
      Searchable: boolean | null;
      HotDeal: boolean;
      Categories: any[];
      CityID: string | null;
      CityName: string | null;
      CountryID: string | null;
      CategoryParentPath: string | null;
      TopParent: string | null;
      VendorID: string | null;
      Rank: number;
      OnlineDeals: boolean | null;
      MostPopular: boolean | null;
      NewArrival: boolean | null;
      ExtraInfo: string | null;
      ExtraData: string | null;
      OutDoorThumbURL: string | null;
      FullOutDoorImagePath: string;
      CategoryExtraInfo: string | null;
      MobileOnly: boolean | null;
      WebOnly: boolean | null;
      ColorLbl: string | null;
      SizeLbl: string | null;
      productCountry: any[];
    };
    Quantity: number;
    TotalPrice: number;
    FormattedTotalPrice: string;
    FormattedUnitPrice: string;
    Name: string;
    Notes: string;
    UnitPrice: number;
    ThumbURL: string;
    ExtraInfo: string;
    OwnerID: string;
    CustomSpecs: any | null;
    CategoryName: string | null;
    CategoryID: string | null;
    CategoryIDval: string;
    BrandName: string | null;
    FullPath: string;
    FullImagePath: string;
    Size: {
      ID: string | null;
      Label: string | null;
      Value: string | null;
      Rank: number;
    };
    Color: {
      ID: string | null;
      parentColor: string | null;
      Label: string | null;
      Value: string | null;
      Rank: number;
    };
    GroupID: string | null;
    StoreID: number;
    Images: any | null;
    LineID: string | null;
    Barcode: string;
  }[];
  TotalWOShipping: number;
  SkipTotal: number;
  FormattedSkipTotal: string;
  FormattedTotalWOShipping: string;
  OrderTotal: number;
  Total: number;
  pointDiscount: number;
  PromoAmount: number;
  PromoOwner: number;
  PromoCodeID: number;
  FormattedTotal: string;
  TotalWeight: number;
  TotalVolWeight: number;
  AlternateTotal: number;
  Status: number;
  SkipStatus: number;
  ShippingIncluded: boolean;
  ShippingPrice: number;
  FormattedShippingPrice: string;
  AlternateShippingPrice: number;
  ShippedToName: string | null;
  ShippingAddress: string;
  Phone: string;
  driverPhone: string | null;
  ShippingDate: string | null;
  Delivery: number;
  Email: string;
  Country: string | null;
  City: string | null;
  Address1: string | null;
  Address2: string | null;
  Postal: string | null;
  Notes: string;
  OrderDate: string;
  OrderAddress: {
    ID: string;
    Label: string;
    Address1: string;
    Address2: string;
    City: string;
    CityName: string | null;
    Country: string;
    Postal: string;
    Phone1: string;
    Phone2: string;
    Latitude: number;
    Longitude: number;
    District: string | null;
    BuildingNum: string | null;
    street: string | null;
    Value: string | null;
    IsDeleted: boolean;
    UserID: string;
    LangID: string | null;
  };
  TransactionID: string | null;
  OwnerName: string;
  DriverID: string | null;
  TrackingNo: string;
  CancelReason: string | null;
  SkipProfitFromDriver: number;
  VendorEarnings: number;
  SkipProfitFromVendor: number;
  Reason: string | null;
  BranchID: string | null;
  CompleteDescription: string | null;
  AcceptedTime: string | null;
  EstDone: string | null;
  DoneTime: string | null;
  PickupTime: string | null;
  EstDelivering: string | null;
  CompleteTime: string | null;
  Distance: string | null;
  DriverEarnings: string | null;
  DriverRating: string | null;
  MyDeliveryMethod: number;
  ShippingFees: number;
  Captured: boolean;
  FormattedOrderTotal: string;
  TransactionTotal: number;
  FormattedTransactionTotal: string;
  FormattedShippingFees: string;
  ChangeStatusDescription: string | null;
  ShippingFeesWithoutVat: number;
  CustomerPhone: string | null;
  IsScheduled: string;
}

interface vedio {
  _shortDescription: string;
  Rank: number;
  ID: string;
  AlbumID: string | null;
  ImageName: string | null;
  ImageURL: string | null;
  ThumbURL: string;
  ThumbURLMobile: string;
  Attachment: string | null;
  AttachmentFullPath: string;
  FullAttachmentPath: string;
  Lang: string | null;
  Name: string;
  Typs: any[]; // Replace 'any' with the specific type if known
  Specializations: any[]; // Replace 'any' with the specific type if known
  Description: string;
  Published: boolean;
  UserPublished: boolean;
  TimesRead: number;
  VoteUp: number;
  VoteDown: number;
  VoteType: boolean;
  Approved: boolean;
  Notification: boolean;
  MiniDescription: string;
  TinyDescription: string;
  VeryShortDescription: string;
  ShortDescription: string;
  MiddleDescription: string;
  Date: string; // ISO date format
  ArtWriter: string | null;
  WriterName: string;
  ShortName: string;
  BasicType: number;
  ExtraInfo: string;
  HtmlTitle: string | null;
  HtmlDescription: string | null;
  SenderID: string;
  SenderName: string | null;
  Tags: string | null;
  TimeAgo: string;
  Path: string;
  FullDatePath: string;
  FullPath: string;
  SEOPath: string;
  FullImagePath: string;
  FullImagePathMobile: string;
  Images: string | null;
  ImageList: string[];
  FirstImagePost: string;
  ImagePostMax: number;
  HasVoted: boolean;
  RichDescription: string | null;
  CountryID: number;
  CountryName: string | null;
  IsHomePage: boolean;
  HeadCode: string | null;
  Meta: string | null;
  SpecialID: string | null;
}

interface CategoryHomePage {
  subCategory: Category[];
  DateAdded: string;
  ID: string;
  ParentID: string | null;
  LinkCategoryID: string | null; // Linked category ID, if any
  ParentName: string | null; // Name of the parent category, if any
  ParentPath: string; // Path of the parent category
  Name: string; // Name of the category
  HasaSize: boolean; // Indicates if the category has sizes
  HasaColor: boolean; // Indicates if the category has colors
  Description: string; // Detailed description
  ExtraInfo: string | null; // Additional information
  Lang: string | null; // Language identifier
  ThumbURL: string; // Thumbnail URL or identifier
  ShortDescription: string; // Short description of the category
  Attachment: string | null; // Any attached files
  Link: string | null; // Related link, if any
  Icon: string; // Icon identifier
  FullIconPath: string; // Full path to the icon
  IconPath: string | null; // Path to the icon
  Images: string | null; // Images associated with the category
  ImageList: string[] | null; // List of image paths
  Rank: number; // Ranking or priority of the category
  Enabled: boolean; // Indicates if the category is enabled
  HasChildren: boolean; // Indicates if the category has child categories
  Products: any[] | null; // Array of associated products
  ProductCount: number; // Number of products in the category
  ProductSaleCount: number; // Number of products sold in the category
  MiddleDescription: string; // Middle description of the category
  FullPath: string; // Full URL path to the category
  FullImagePath: string; // Full URL path to the category image
  FullMarketPath: string; // Full URL path to the market category
  Display: boolean; // Indicates if the category is displayed
  VendorCategoryRank: number; // Rank in the vendor's categories
  ISMainCategory: boolean; // Indicates if this is a main category
  HasDisplayOnHome: boolean; // Indicates if displayed on the home page
  IsLastCat: boolean; // Indicates if this is the last category in hierarchy
  Brands: string[] | null; // List of associated brands
  MobileOnly: boolean | null; // Indicates if mobile-only
  WebOnly: boolean | null; // Indicates if web-only
  numberofvisits: number; // Number of visits to the category
}

interface Size {
  id: number;
  label: string;
  value: string;
  rank: number;
}

interface Color {
  id: number;
  parentColor: any;
  label: string;
  value: string;
  rank: number;
}

interface UpdateUserType {
  name: string | undefined;
  email: string | undefined;
  DOB: any;
  gender: string;
}

interface CreateAndUpdateAddress {
  name: string;
  address: string;
  country: string;
  city: string;
  phone: string;
  postal: string;
  methodDelivery?: string;
}

export interface ordersCheckResponse {
  acceptedTime: string | null;
  address1: string | null;
  address2: string | null;
  alternateShippingPrice: number;
  alternateTotal: number;
  branchID: string | null;
  branchName: string | null;
  branchphone: string | null;
  cancelReason: string | null;
  captured: boolean;
  changeStatusDescription: string | null;
  city: string | null;
  completeDescription: string | null;
  completeTime: string | null;
  country: string | null;
  customerPhone: string | null;
  delivery: number;
  distance: number | null;
  doneTime: string | null;
  driverEarnings: number | null;
  driverID: string | null;
  driverName: string | null;
  driverPhone: string | null;
  driverRating: number | null;
  email: string;
  estDelivering: string | null;
  estDone: string | null;
  formattedOrderTotal: string;
  formattedShippingFees: string;
  formattedShippingPrice: string;
  formattedSkipTotal: string;
  formattedTotal: string;
  formattedTotalWOShipping: string;
  formattedTransactionTotal: string;
  id: string;
  isScheduled: string;
  items: OrderItem[];
  itemsCount: number;
  mada: boolean;
  merchantDescription: string | null;
  merchantID: string;
  merchantName: string | null;
  merchantPhone: string | null;
  myDeliveryMethod: number;
  notes: string;
  orderAddress: OrderAddressResponse;
  orderDate: string;
  orderID: string;
  orderTotal: number;
  ownerID: string;
  ownerName: string;
  phone: string;
  pickupTime: string | null;
  pointDiscount: number;
  postal: string | null;
  promoAmount: number;
  promoCodeID: number;
  promoOwner: number;
  reason: string | null;
  refTransactionID: string;
  shippedToName: string | null;
  shippingAddress: string;
  shippingDate: string | null;
  shippingFees: number;
  shippingFeesWithoutVat: number;
  shippingIncluded: boolean;
  shippingPrice: number;
  skipProfitFromDriver: number;
  skipProfitFromVendor: number;
  skipStatus: number;
  skipTotal: number;
  status: number;
  total: number;
  totalVolWeight: number;
  totalWOShipping: number;
  totalWeight: number;
  trackingNo: string;
  transactionID: string | null;
  transactionTotal: number;
  vendorEarnings: number;
  vendorPhone: string | null;
}

export interface OrderItemResponse {
  barcode: string;
  brandName: string | null;
  categoryID: string | null;
  categoryIDval: string;
  categoryName: string | null;
  color: {
    id: number;
    parentColor: string | null;
    label: string;
    value: string;
    rank: number;
  };
  customSpecs: any;
  extraInfo: string;
  formattedTotalPrice: string;
  formattedUnitPrice: string;
  fullImagePath: string;
  fullPath: string;
  groupID: number;
  id: number;
  images: string | null;
  item: {
    unitPrice: number;
    productID: number;
    name: string;
    recurrent: boolean;
    recurrencePeriod: number;
    notes?: string;
  };
  lineID: string | null;
  name: string;
  notes: string;
  ownerID: string;
  quantity: number;
  size: {
    id: number;
    label: string;
    value: string;
    rank: number;
  };
  storeID: number;
  thumbURL: string;
  totalPrice: number;
  unitPrice: number;
}

export interface OrderAddressResponse {
  address1: string;
  address2: string;
  buildingNum: string | null;
  city: string;
  cityName: string | null;
  country: string;
  district: string | null;
  id: string;
  isDeleted: boolean;
  label: string;
  langID: string | null;
  latitude: number;
  longitude: number;
  phone1: string;
  phone2: string;
  postal: string;
  street: string | null;
  userID: string;
  value: string | null;
}
