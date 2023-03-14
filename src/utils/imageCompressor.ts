import imageCompression from 'browser-image-compression';

export const compressImage = async (file: File) => {
  const mb = 1024 * 1024;
  const maxSizeMB = 1;
  const maxFileSize = maxSizeMB * mb;
  let imageFile = file;

  if (file.size < maxFileSize) return imageFile;

  const option = {
    maxSizeMB,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  try {
    imageFile = await imageCompression(file, option);
    imageFile = new File([imageFile], imageFile.name, { type: file.type });
  } catch (error) {
    console.error(error);
  }

  return imageFile;
};
