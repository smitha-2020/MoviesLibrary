import Joi from "joi";
import { Customer, ICustomer } from "../model/customer.js";
import { Request, Response } from "express";

export const CustomerJoiSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  paid: Joi.boolean(),
  isGold: Joi.boolean(),
  phone: Joi.string().min(10).max(15).required(),
});

export const validateCustomer = async (customer: ICustomer) => {
  return await CustomerJoiSchema.validateAsync(customer);
};

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.find();
    return res.send(customers);
  } catch (err) {
    console.error("Error fetching customers:", err);
    return res.status(500).send("Server error");
  }
};

export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send("Customer not found");
    return res.send(customer);
  } catch (err) {
    console.error("Error fetching customer:", err);
    return res.status(500).send("Server error");
  }
};

export const createCustomer = async (req: Request, res: Response) => {
  const customer = await Customer.create({
    name: req.body.name,
    paid: req.body.paid,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  return res.status(201).send(customer);
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { error } = await validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        paid: req.body.paid,
        isGold: req.body.isGold,
        phone: req.body.phone,
      },
      { returnDocument: "after" },
    );
    if (!customer) return res.status(404).send("Customer not found");
    return res.send(customer);
  } catch (err) {
    console.error("Error updating customer:", err);
    return res.status(500).send("Server error");
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).send("Customer not found");
    return res.send(customer);
  } catch (err) {
    console.error("Error deleting customer:", err);
    return res.status(500).send("Server error");
  }
};
