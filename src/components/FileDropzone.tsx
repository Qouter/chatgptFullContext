import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import JSZip from 'jszip';

interface FileDropzoneProps {
  onFilesAdded: (files: { [fileName: string]: string }) => void;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({ onFilesAdded }) => {
  const handleFiles = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      return;
    }

    const file = acceptedFiles[0];
    const fileReader = new FileReader();
    fileReader.onload = async (e) => {
      if (!e.target || !e.target.result) {
        return;
      }

      const zip = new JSZip();
      const loadedZip = await zip.loadAsync(e.target.result as ArrayBuffer);
      const files: { [fileName: string]: string } = {};

      for (const fileName in loadedZip.files) {
        if (!loadedZip.files[fileName].dir) {
          const fileContent = await loadedZip.file(fileName)?.async('text');
          if (fileContent) {
            files[fileName] = fileContent;
          }
        }
      }

      onFilesAdded(files);
    };

    fileReader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFiles,
    accept: '.zip',
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`${
        isDragActive
          ? 'border-2 border-dashed border-black'
          : 'border-2 border-dashed border-gray-300'
      } border-opacity-50 rounded-lg p-5 text-center cursor-pointer`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Suelta el archivo ZIP aquí</p>
      ) : (
        <p>Arrastra y suelta un archivo ZIP aquí, o haz clic para seleccionar</p>
      )}
    </div>
  );
};

export default FileDropzone;
