import QRCodeStyling from "qr-code-styling";

export const generateQRCode = ({linkTitle}: {linkTitle: string}) => {
  const qrCode = new QRCodeStyling({
    width: 180, //128
    height: 180,
    type: 'svg',
    data: `https://snap-link.vercel.app/l/${linkTitle}`,
    image: '/favicon.svg',
    dotsOptions: {
      color: 'radial',
      type: 'rounded',
      gradient: {
        type: 'linear',
        rotation: 90,
        colorStops: [
          { offset: 0, color: 'rgb(45 212 191)' },
          { offset: 1, color: 'rgb(13 148 136)' },
        ],
      },
    },
    backgroundOptions: {
      color: 'transparent',
    },
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: 5,
    },
    margin: 0,
    cornersSquareOptions: {
      type: 'extra-rounded',
    },
  });
  return qrCode
};