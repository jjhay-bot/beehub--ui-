import imageCompression from 'browser-image-compression';

const defaultOptions = {
  maxSizeMB: 1,
};

export const handleCompressFile = async (image) => {
  if (image) {
    try {
      const compressedImageFile = await compressFile(image);
      return compressedImageFile
    } catch (error) {
      console.log({ error });
    } 
  }
};


export function compressFile(imageFile, options = defaultOptions) {
  return imageCompression(imageFile, options);
}

export function download(file) {
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', '');
  link.click();
  window.URL.revokeObjectURL(url);
}

export function readFileAsBase64(file) {
  return imageCompression.getDataUrlFromFile(file);
}
