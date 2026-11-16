# Project Guide

## Project Overview

This Node.js and Express application supports supermarket price comparison. Its API manages products, retail chains, prices, users, and dynamic shopping carts. MongoDB is accessed through Mongoose, and the application uses Joi to validate request bodies.

## Architecture and Folder Structure

The project follows a lightweight MVC-style structure:

| Path | Responsibility |
| --- | --- |
| `models/` | Mongoose schemas and models for `Product`, `Chain`, `Price`, `User`, and `Cart`. |
| `controllers/` | Request handlers that implement resource operations, coordinate with models, and send successful responses. |
| `routes/` | Express routers that map HTTP methods and paths to controllers, and attach validation middleware where needed. |
| `validations/` | Joi schemas for validating request bodies by resource. |
| `middlewares/` | Shared Express middleware, including request validation and centralized error handling. |
| `utils/` | Shared utilities, including the custom application error type (`AppError`). |
| `config/` | Runtime configuration such as the MongoDB connection in `db.js`. |

`app.js` configures Express, connects to MongoDB, registers middleware and resource routers, and starts the server.

## Database and Relationships

MongoDB documents use references where records are shared or managed independently, and embedded documents for data that belongs to a parent record:

- A `Price` references a `Product` and a `Chain` by ObjectId. Its price and stock status belong to that product-chain pairing.
- A `Cart` references its `User` and its selected `Chain` by ObjectId. The user reference is unique, representing one cart per user.
- A cart's `items` are embedded subdocuments. Each item contains a reference to its `Product` plus a name and price snapshot and a quantity. This keeps the cart's item details together while retaining the product link.
- `Product`, `Chain`, and `User` are independent documents. Use Mongoose `populate()` when an API response needs referenced document details.

When changing these relationships, keep model schemas, validation schemas, controllers, and route behavior consistent.

## Error Handling and Validation

- Use the project's custom `AppError` for expected application errors, with an appropriate message, HTTP status, and error type.
- The centralized `errorHandler` is Express error middleware and must keep the four-argument signature `(err, req, res, next)`. Register it after application routes so errors forwarded by middleware and controllers reach it.
- Controllers must accept `(req, res, next)`. In every `catch (error)`, forward the error with `next(error)`; do not send a local error response from a controller.
- For a manually detected error inside a `try` block, throw an `AppError` so the surrounding catch can forward it with `next(error)`. Middleware that detects an error outside a controller may pass it directly with `next(new AppError(...))`.
- Define request-body rules with Joi schemas in `validations/` and apply them to routes through `validateBody(schema)`. Keep validation at the route boundary, before the controller.
- Successful controller responses may use `res.status(...).json(...)`; error responses belong to the centralized error handler.

## Development Guidelines

- Keep changes focused and preserve the existing separation between routes, validation, controllers, models, and shared middleware.
- Use lowercase file names with dot-separated roles, for example `product.controller.js` and `cart.validation.js`. Match import paths exactly, including letter case.
- When adding or changing a resource, update its related model, controller, router, and Joi validation as needed.
- Do not add credentials or local environment values to source files. Configure environment-specific settings through environment variables.
