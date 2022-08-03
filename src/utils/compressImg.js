import Compressor from 'compressorjs';

const handleCompressFile = (e, setFile) => {
  console.log('hi');
  const image = e.target.files[0];
  if (image)
    new Compressor(image, {
      quality: 0.2,
      convertSize: 1000000,
      success: (res) => {
        setFile(res);
      },
    });
};

export default handleCompressFile;
