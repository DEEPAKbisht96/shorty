import { createOrderService } from "@/service/order/create.service";
import { CreatePayment } from "@/types/payment";
import { SuccessResponse } from "@/utils/success_handler/success_response";
import { NextFunction, Request, Response } from "express"
import { v4 as uuidv4 } from 'uuid';
import { paymentMapper } from "../../core/mapper/global.mapper";
import { AuthenticatedRequest } from "@/middleware/auth.middleware";
import { ForbiddenError } from "@/utils/error_handler/ErrorStatus";
import { createPaymentService } from "@/service/payment/create.service";

export const createOrderController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { amount, currency } = req.body;

        const authUser = (req as AuthenticatedRequest).user;

        if (!authUser || !authUser.id) throw new ForbiddenError();
        
        const receipt = `rcpt_${uuidv4().split('-')[0]}`;
        const order = await createOrderService({ amount, currency, receipt });

        const paymentData: CreatePayment = {
            userId: authUser?.id,
            amount: amount,
            currency,
            status: paymentMapper["pending"]
        }

        await createPaymentService(paymentData);

        const response = new SuccessResponse({
            data: order,
            message: "Order Created",
            statusCode: 201
        });

        res.status(201).json(response);

    } catch (err) {
        next(err)
    }
}