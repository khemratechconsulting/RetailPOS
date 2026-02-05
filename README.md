## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`
# RetailPOS Pro

RetailPOS Pro is a modern, lightweight Point of Sale (POS) system for retail businesses. Built with React and TypeScript, it provides an intuitive interface for managing sales, inventory, customers, employees, and generating reports.

## Features

- **Sales Terminal**: Fast and easy sales processing
- **Inventory Management**: Track and update stock levels
- **Customer Management**: Manage customer information and history
- **Employee Management**: Add, edit, and manage employee records
- **Reports**: Generate sales and inventory reports

## Project Structure

```
├── App.tsx                # Main application component
├── constants.ts           # Application constants
├── index.html             # HTML entry point
├── index.tsx              # React entry point
├── metadata.json          # App metadata
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── types.ts               # TypeScript types
├── vite.config.ts         # Vite configuration
└── views/                 # Main views
      ├── Customers.tsx      # Customer management
      ├── Employees.tsx      # Employee management
      ├── Inventory.tsx      # Inventory management
      ├── Reports.tsx        # Reports
      ├── Sales.tsx          # Sales terminal
      └── Terminal.tsx       # POS terminal
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd retailpos-pro
    ```
2. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

### Running the App

Start the development server:
```sh
npm run dev
# or
yarn dev
```

Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

### Building for Production

```sh
npm run build
# or
yarn build
```

### Linting & Formatting

```sh
npm run lint
npm run format
```

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License

This project is licensed under the Khemra Tech TEAM License.
