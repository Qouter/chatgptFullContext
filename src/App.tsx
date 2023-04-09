import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import FileDropzone from './components/FileDropzone';
import FileSelector from './FileSelector';

interface ProjectFiles {
  [fileName: string]: string;
}

interface ConversationContextItem {
  message: string;
  response: string;
}

const App: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [projectFiles, setProjectFiles] = useState<ProjectFiles>({});
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [conversationContext, setConversationContext] = useState<ConversationContextItem[]>([]);

  const handleFilesAdded = (files: ProjectFiles) => {
    setProjectFiles(files);
  };

  const sendToChatGPT = async (messageToSend: string) => {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

    try {
      const response = await axios.post(
        apiUrl,
        {
          prompt: messageToSend,
          max_tokens: 50,
          n: 1,
          stop: null,
          temperature: 0.5,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
        }
      );

      setConversationContext((prevContext) => [
        ...prevContext,
        {
          message: messageToSend,
          response: response.data.choices[0].text.trim(),
        },
      ]);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  };

  const sendFilesToChatGPT = async () => {
    for (const file in projectFiles) {
      const fileContent = projectFiles[file];
      const messageToSend = `Archivo: ${file}\nContenido:\n${fileContent}`;
      await sendToChatGPT(messageToSend);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendToChatGPT(`Pregunta: ${message}`);
    setMessage('');
  };

  return (
    <div>
      <h1>Chat con ChatGPT</h1>
      <FileDropzone onFilesAdded={handleFilesAdded} />
      <FileSelector
        files={projectFiles}
        selectedFile={selectedFile}
        onFileSelected={setSelectedFile}
      />
      <button onClick={sendFilesToChatGPT}>Enviar archivos a ChatGPT</button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe tu mensaje aquí"
        />
        <button type="submit">Enviar mensaje</button>
      </form>
      <div>
        {conversationContext.map((item, index) => (
          <div key={index}>
            <p>
              <strong>Tú:</strong> {item.message}
            </p>
            <p>
              <strong>ChatGPT:</strong> {item.response}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
