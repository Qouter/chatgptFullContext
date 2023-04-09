# ChatGPT React Project Explorer

This project is a React application that allows users to interact with OpenAI's ChatGPT API while providing the context of an entire programming project. Users can upload a zipped project folder, and the application will send the files' content to ChatGPT one by one, allowing the AI model to have a better understanding of the project context. This makes it possible to ask ChatGPT to add specific functionalities or detect bugs in particular files.

## Getting Started

Follow these steps to set up the project locally:

### Prerequisites

- Node.js and npm installed on your machine
- An API key from OpenAI

### Installation

1. Clone the repository

```bash
git clone https://github.com/Qouter/chatgptFullContext.git
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root of your project and add your OpenAI API key:

```ini
REACT_APP_OPENAI_API_KEY=your_api_key_here
```

4. Run the development server

```bash
npm start
```

The application should now be accessible at `http://localhost:3000`.

## Features

- Upload a zipped programming project
- Send the content of the files to ChatGPT
- Chat with ChatGPT using text input
- Receive responses from ChatGPT in the context of the uploaded project

## Built With

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [React Dropzone](https://react-dropzone.js.org/)
- [JSZip](https://stuk.github.io/jszip/)

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch with a descriptive name
3. Make your changes and commit them with clear and concise commit messages
4. Push your changes to the branch
5. Create a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

