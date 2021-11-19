const QRCode = require('qrcode.react');

const MyQRcode = ({ info }) => {
  const initialProps = {
    value: `http://localhost:3000/personal/${info}`,
    size: 200,
    bgColor: '#ffffff',
    fgColor: '#000000',
    level: 'L',
    includeMargin: false,
    renderAs: 'svg',
    imageSettings: {
      src: 'https://firebasestorage.googleapis.com/v0/b/shengshi-8bc48.appspot.com/o/images%2Flogo%2Fshengshi-logo2.svg?alt=media&token=218bb2b8-ebaf-4f8d-809a-50912c6d2a6a',
      x: null,
      y: null,
      height: 24,
      width: 24,
      excavate: true,
    },
  };

  return <QRCode {...initialProps} />;
};

export default MyQRcode;
