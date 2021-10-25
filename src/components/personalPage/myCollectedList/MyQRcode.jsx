const QRCode = require('qrcode.react');

const MyQRcode = () => {
  const initialProps = {
    value: 'http://picturesofpeoplescanningqrcodes.tumblr.com/',
    size: 150,
    bgColor: '#ffffff',
    fgColor: '#000000',
    level: 'L',
    includeMargin: false,
    renderAs: 'svg',
    imageSettings: {
      src: 'https://static.zpao.com/favicon.png',
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
