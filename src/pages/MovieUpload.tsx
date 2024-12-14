import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { uploadMovies } from '../api/tvShowsApi';

function MovieUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false); // Track upload status
  const navigate = useNavigate(); // For redirection after upload

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      setIsUploading(true);
      const response = await uploadMovies(file)
      if(response){
        console.log(response);
        navigate('/');
      }
      else{
        setIsUploading(false);
      }
    } else {
      console.log('No file selected');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Drag and Drop File Upload</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <div
              {...getRootProps()}
              className="w-full p-8 border-4 border-dashed border-gray-300 rounded-lg text-center cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
            >
              <input {...getInputProps()} />
              {file ? (
                <p className="text-gray-700">File: {file.name}</p>
              ) : (
                <p className="text-gray-500">Drag & drop a file here, or click to select a file</p>
              )}
            </div>
          </div>

          {isUploading ? (
            <div className="flex justify-center">
              <div className="w-8 h-8 border-4 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
            </div>
          ) : (
            <button
              type="submit"
              className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Upload
            </button>
          )}
        </form>
      </main>
    </div>
  );
}

export default MovieUpload;
