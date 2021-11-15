const QRCode = require('qrcode.react');

const MyQRcode = ({ info }) => {
  const initialProps = {
    value: `https://shengshi-8bc48.web.app/personal/${info}`,
    size: 200,
    bgColor: '#ffffff',
    fgColor: '#000000',
    level: 'L',
    includeMargin: false,
    renderAs: 'svg',
    imageSettings: {
      src: 'https://firebasestorage.googleapis.com/v0/b/shengshi-8bc48.appspot.com/o/images%2Flogo%2F5A39D652-C0D9-4689-B443-F410ACC73F15_4_5005_c.jpeg?alt=media&token=f08780e2-f205-44b9-97ca-a30604ed690e',
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
