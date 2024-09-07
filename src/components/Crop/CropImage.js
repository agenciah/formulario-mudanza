// CropImage.js
import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from './CropUtils';
import { Button, Modal } from 'antd';

const CropImage = ({ imageSrc, onCropCompleteCallback, onClose }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropChange = useCallback((crop) => {
    setCrop(crop);
  }, []);

  const onZoomChange = useCallback((zoom) => {
    setZoom(zoom);
  }, []);

  const onCropComplete = useCallback(async (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onSaveCrop = async () => {
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    onCropCompleteCallback(croppedImage);
  };

  return (
    <Modal
      visible={!!imageSrc}
      title="Recortar Imagen"
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancelar
        </Button>,
        <Button key="save" type="primary" onClick={onSaveCrop}>
          Guardar Recorte
        </Button>
      ]}
    >
      <div style={{ position: 'relative', width: '100%', height: '400px' }}>
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={16 / 10}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropComplete}
          style={{ containerStyle: { width: '100%', height: '100%' } }}
        />
      </div>
    </Modal>
  );
};

export default CropImage;
