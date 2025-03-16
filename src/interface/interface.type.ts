/* eslint-disable @typescript-eslint/no-explicit-any */

// This is for Error info type
export type TErrorInfo = {
  statusCode?: number;
  message?: string;
  errorDetails?: any;
  stack?: string;
};

// Data response type
export type TResponse = {
  success?: boolean;
  statusCode?: number;
  message?: string;
  data?: TErrorInfo;
};

// Type for Product sales response data from the database.
export type TProductSaleDBResponse = {
  _id: {
    productId: string;
    productName: string;
  };
  totalQuantitySold: number;
  totalSoldPrice: number;
};

// this type is use in the history data type
export interface THistoryDataType {
  key: React.Key;
  productName: string;
  totalQuantitySold: number;
  totalSoldPrice: number;
}

// Form Filed type
export type TFieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

//  response error type
export type TError = {
  status: number;
  data?: {
    success?: boolean;
    message?: string;
    errorDetails?: {
      name: string;
      message: string;
      stack: string;
      success: boolean;
    };
  };
};

// History Object Type
export type THistoryObject = {
  type?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  selectedDate?: string | Date;
};

export type TUserInfo = {
  exp: number;
  iat: number;
  role: string;
  username: string;
};
