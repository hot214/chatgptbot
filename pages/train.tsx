import styles from '@/styles/Train.module.css';
import axios from 'axios';
import React, { ChangeEvent, useState } from 'react';

export default function Train() {
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [filename, setFilename] = useState<string>('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    console.log('change');
    // Perform actions with the file data, for example, read its contents
    setFilename(file?.name!);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        requestTrain(file);
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const requestTrain = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    setIsTraining(true);
    try {
      const response = axios.post('/api/train', formData, {
        onUploadProgress: (progressEvent) => {
          const progressPercentage = Math.round(
            (progressEvent.loaded * 80) / progressEvent.total!,
          );
          setProgress(progressPercentage);
        },
      });
      response.then((res) => {
        setProgress(100);
      });
      console.log('File upload successful!', response);
    } catch (error) {
      console.error('File upload failed.', error);
    }
  };

  return (
    <>
      <main className={styles.main} key={'Home'}>
        <div className="flex flex-col items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-800 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-100 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-600 dark:hover:bg-gray-300"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-600 dark:text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-600 dark:text-gray-800">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          <div
            className="w-full mt-10 rounded-[15px] bg-[#88888866] px-[40px] "
            style={{ display: isTraining ? 'block' : 'none' }}
          >
            <p className="mt-[10px] text-[24px] text-slate-300">{filename}</p>
            <p className="mt-1 text-[18px] text-gray-300">{progress} %</p>
            <div className="w-full mt-3 bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-400">
              <div
                className="bg-gray-400 h-1.5 rounded-full dark:bg-gray-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
