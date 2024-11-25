

# One-store eCommerce Backend Service

This is the backend service for an eCommerce platform, providing essential functionality such as user authentication, product management, orders, promotions, and more. The project is built with TypeScript, Node.js, Express.js, Mongoose, Zod, bcrypt, JSON Web Token (JWT), and other tools.

- **GitHub Repository**: [https://github.com/mdmominul-310/one-store-backend](https://github.com/mdmominul-310/one-store-backend)
- **Live URL**: [https://one-store-63j5.onrender.com](https://one-store-63j5.onrender.com)
- **Postman API Documentation**: [View Postman Documentation](https://documenter.getpostman.com/view/28016835/2sA3QniEbM)

## Table of Contents

- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- **Node.js** (Runtime)
- **TypeScript** (Static Typing)
- **Express.js** (Web Framework)
- **Mongoose** (MongoDB ODM)
- **Zod** (Schema Validation)
- **bcrypt** (Password Hashing)
- **jsonwebtoken (JWT)** (Authentication & Authorization)
- **MongoDB** (Database)
- **AWS SES** (Email Service)
- **SMS API** (SMS notifications)
- **Jest** (Testing Framework)

## Folder Structure

The folder structure is organized to provide a clean and modular backend application:

```
src/
├── app/
│   ├── middleware/           # Custom middleware (e.g., authentication, validation)
│   ├── modules/              # Feature modules (e.g., users, products, orders)
│   │   ├── address/          # Address management
│   │   ├── auth/             # Authentication (login, register)
│   │   ├── banner/           # Banner management
│   │   ├── catalog/          # Product catalog management
│   │   ├── flash-sale/       # Flash sale management
│   │   ├── menus/            # Menu management
│   │   ├── orders/           # Order management
│   │   ├── products/         # Product management
│   │   ├── promotion/        # Promotions and discounts
│   │   ├── system-config/    # System-wide configurations
│   │   ├── uploads/          # File uploads (e.g., images, documents)
│   │   ├── users/            # User management (authentication, profiles)
│   │   └── youtube-promo/    # YouTube promo integration
│   ├── routes/               # API routes
│   └── utils/                # Utility functions
├── config/                   # Configuration files (e.g., environment variables, database)
├── enum/                     # Enum definitions
├── errors/                   # Error handling
├── helpers/                  # Helper functions
├── interfaces/               # TypeScript interfaces
└── utils/                    # Miscellaneous utilities (e.g., logger)
```

### Key Folders

- **`app/modules/`**: Contains different modules representing the core business logic of your eCommerce platform like `users`, `products`, `orders`, etc.
- **`app/middleware/`**: Contains middleware for request handling like authentication, validation, logging, etc.
- **`app/routes/`**: Contains the route definitions, linking HTTP requests to the appropriate controller.
- **`config/`**: Configuration settings for environment variables, database connections, etc.
- **`helpers/`**: Utility functions that assist in common tasks, such as password hashing, JWT generation, etc.
- **`interfaces/`**: TypeScript interfaces used across the project to define types for models and responses.
  
## API Endpoints

For a complete list of available API endpoints, please refer to the [Postman API Documentation](https://documenter.getpostman.com/view/28016835/2sA3QniEbM).

Some example endpoints:

- **User Authentication**
  - `POST /api/v1/auth/login` — Login a user
  - `POST /api/v1/auth/register` — Register a new user

- **Product Management**
  - `GET /api/v1/products` — Fetch all products
  - `POST /api/v1/products` — Add a new product
  - `GET /api/v1/products/{id}` — Fetch a specific product by ID

- **Order Management**
  - `POST /api/v1/orders` — Create a new order
  - `GET /api/v1/orders/{id}` — Get order details by ID

For detailed documentation of all available endpoints, visit the [Postman link](https://documenter.getpostman.com/view/28016835/2sA3QniEbM).

## Getting Started

### Prerequisites

Before running the project locally, ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/) (v6.x or higher)

Additionally, you will need:

- **MongoDB**: This project uses MongoDB as the database. You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud-based solution or set up a local instance.
- **Environment Variables**: Ensure you configure the necessary environment variables (see [Environment Variables](#environment-variables)).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mdmominul-310/one-store-backend.git
   cd one-store-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables (see below).

### Running the Project

1. Make sure MongoDB is running (either locally or through MongoDB Atlas).
2. Start the application:

   ```bash
   npm run dev
   ```

   This will start the server on port `5000` by default. You can change this by modifying the `PORT` environment variable.

3. You can now access the API at [http://localhost:5000](http://localhost:5000) (or the live URL if you're deploying).

## Environment Variables

Create a `.env` file in the root directory and configure the following environment variables:

```
# Project Name (optional)
project_name="YourProjectName"

# MongoDB Database Configuration
mongodb_host="mongodb://localhost:27017/fu-ecom"
mongodb_port=27017
mongodb_database="fu-ecom"
mongodb_user=""
mongodb_password=""

# Encryption Configuration
BCRYPT_SALT_ROUND=10
JWT_SECRET="your_jwt_secret_key"
JWT_EXPIRE_IN="1h"
JWT_REFRESH_SECRET="your_refresh_token_secret"
JWT_REFRESH_EXPIRE_IN="7d"

# AWS SMTP Credentials for Email
AWS_EMAIL_USER="your_aws_email_user"
AWS_EMAIL_PASS="your_aws_email_pass"
AWS_EMAIL_HOST="your_smtp_host"

# SMS API Configuration
SMS_API="your_sms_api_url"
SMS_API_SENDER_ID="your_sender_id"
SMS_API_USER="your_sms_api_user"
SMS_API_PASSWORD="your_sms_api_password"

# Base Communication Keys
APP_KEY="your_app_key"
APP_PASS="your_app_password"
```

- **`mongodb_host`**: Connection string for your MongoDB server.
- **`mongodb_port`**: The port for your MongoDB server (default is `27017`).
- **`mongodb_database`**: The name of the database to use in MongoDB.
- **`JWT_SECRET`**: Secret key used for JWT token signing.
- **`AWS_EMAIL_*`**: Credentials for sending emails using AWS SES or another SMTP provider.
- **`SMS_API_*`**: Configuration for sending SMS messages (API URL, credentials, etc.).

## Testing

You can run tests using the following command:

```bash
npm run test
```

This will execute the unit and integration tests defined in the project.

## Contributing

We welcome contributions! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

