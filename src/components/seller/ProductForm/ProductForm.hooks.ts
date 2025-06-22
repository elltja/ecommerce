import { useState } from 'react';
import type { FormErrors, InitialData } from './ProductForm.types';

export function useProductForm(
  initialData: InitialData | undefined,
  onSubmitted: (() => void) | undefined,
) {
  const [images, setImages] = useState<File[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState(
    initialData?.images.map((img) => img.url) ?? [],
  );
  const [errors, setErrors] = useState<FormErrors>({});

  function handleImageChange(image: File) {
    setImages([...images, image]);
  }
  function handleImageDeletion(fileOrUrl: File | string) {
    if (typeof fileOrUrl === 'string') {
      setExistingImageUrls((prev) => prev.filter((url) => url !== fileOrUrl));
    }
    setImages((prev) => prev.filter((image) => image !== image));
  }

  async function onSubmit(formData: FormData) {
    images.forEach((image) => {
      formData.append('images', image);
    });
    existingImageUrls?.forEach((imageUrl) => {
      formData.append('existingImageSources', imageUrl);
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
  return {
    errors,
    handleImageChange,
    onSubmit,
    images,
    existingImageUrls,
    handleImageDeletion,
  };
}
