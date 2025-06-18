import { useState } from 'react';
import type { FormErrors, InitialData } from './ProductForm.types';

export function useProductForm(
  initialData: InitialData | undefined,
  onSubmitted: (() => void) | undefined,
) {
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [files, setFiles] = useState<(File | null)[]>([null, null, null, null]);
  const [errors, setErrors] = useState<FormErrors>({});

  function handleImageChange(index: number, file: File) {
    const newPreviews = [...imagePreviews];
    const newFiles = [...files];

    newPreviews[index] = URL.createObjectURL(file);
    newFiles[index] = file;

    setImagePreviews(newPreviews);
    setFiles(newFiles);
  }

  async function onSubmit(formData: FormData) {
    files.forEach((file) => {
      if (file instanceof File) formData.append('images', file);
    });
    const apiUrl = initialData
      ? `/api/products/edit?id=${initialData.id}`
      : '/api/products/new';
    const method = initialData ? 'PUT' : 'POST';

    const response = await fetch(apiUrl, {
      method,
      body: formData,
    });

    const responseData = (await response.json()) as {
      message: string;
      errors?: FormErrors;
    };
    if (responseData.errors) {
      setErrors(responseData.errors);
    } else if (onSubmitted) {
      onSubmitted();
    }
  }
  return { errors, handleImageChange, onSubmit, imagePreviews };
}
