import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

// Middleware to handle validation errors
const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Exported validation rules for user request
export const validateMyUserRequest = [
  body("fullname").isString().notEmpty().withMessage("Name must be a string"),
  body("address").isString().notEmpty().withMessage("Address must be a string"),

  handleValidationErrors,
];

