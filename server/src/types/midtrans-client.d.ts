/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */

declare module "midtrans-client" {
  export interface ItemDetail {
    id: string;
    price: any;
    quantity: number;
    name: string;
  }

  export interface CustomerDetails {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  }

  export interface TransactionDetails {
    order_id: string;
    gross_amount: any;
  }

  export interface RefundParameter {
    refund_amount: number;
    reason: string;
  }

  export interface ChargeParameter {
    payment_type?: string;
    transaction_details: TransactionDetails;
    item_details?: ItemDetail[] | ItemDetail;
    customer_details?: CustomerDetails;
    [key: string]: any;
  }

  export interface CaptureParameter {
    order_id: string;
  }

  export interface TransactionStatusResponse {
    transaction_status: string;
    order_id: string;
    gross_amount: any;
    [key: string]: any;
  }

  export interface CreateTransactionResponse {
    token: string;
    redirect_url: string;
    [key: string]: any;
  }

  export class CoreApi {
    constructor(options: {
      isProduction: boolean;
      serverKey: string;
      clientKey?: string;
    });

    charge(parameter: ChargeParameter): Promise<any>;

    capture(parameter: CaptureParameter): Promise<any>;

    transaction: {
      status(orderId: string): Promise<TransactionStatusResponse>;
      approve(orderId: string): Promise<any>;
      cancel(orderId: string): Promise<any>;
      refund(orderId: string, parameter: RefundParameter): Promise<any>;
      expire(orderId: string): Promise<any>;
    };
  }

  export class Snap {
    constructor(options: {
      isProduction: boolean;
      serverKey: string;
      clientKey?: string;
    });

    createTransactionToken(parameter: ChargeParameter): Promise<string>;
    createTransaction(
      parameter: ChargeParameter
    ): Promise<CreateTransactionResponse>;
  }
}
