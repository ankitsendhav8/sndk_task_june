/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
import { body, validationResult } from 'express-validator';

// Custom middleware function for validating user input
const validateUser = (req, res, next) => {
  const validationRules = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),

    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Enter a valid email'),
    body('status').isIn(['active', 'inactive']).withMessage('Invalid status'),
    body('password').notEmpty().withMessage('Password is required'),
  ];

  for (const rule of validationRules) {
    rule(req, res, (err) => {
      console.log('error', err);
      if (err) {
        return res.status(200).json({ error: err.msg });
      }
    });
  }
  next();
};

module.exports = validateUser;
