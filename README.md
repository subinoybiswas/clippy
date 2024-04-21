# Clippy

Clippy is an online clipboard tool, to solve the age-old problem of coping and pasting a breeze, it aslo comes with features like file sharing. Clippy is made with Nextjs and uses MongoDB for storage.

## Usage

Clippy is publically available and hosted on Vercel, you can access Clippy [here](https://clippy.subinoy.me/)

## Screenshots

![Homepage](screenshots/screenshot1.png)
_Homepage_

![Making a Clippy](screenshots/screenshot2.png)
_Making a Clippy_

## Setup Instructions

To get started with this project, follow these steps:

### Clone the Repository:

Clone this repository to your local machine using git clone.

### Install Dependencies:

Navigate into the project directory and install the dependencies using your preferred package manager. For example, if you're using npm:

```bash
npm install
```

### Set Up Environment Variables:

This project requires environment variables for MongoDB connection. Create a .env file in the root directory of the project and add the following variables:

```plaintext
MONGODB_URI=<your_mongodb_uri>
MONGO_DB_NAME=<your_db_name>
MONGO_COLLECTION_NAME=<your_collection_name>
```

### Run the Development Server:

Once you have installed the dependencies and set up the environment variables, you can start the development server by running:

```bash
npm run dev
```

## Contributing
If you'd like to contribute to this project, feel free to open an issue or submit a pull request. Contributions are welcome!
