import React from 'react';
import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const ModalComponent = ({ isVisible, onClose }) => {
  return (
    <Modal
      title="Modal Başlığı"
      open={isVisible} // `visible` yerine `open` kullanıyoruz
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Kapat
        </Button>,
      ]}
      closeIcon={<ExclamationCircleOutlined />}
    >
      <p>Modal içeriğiniz burada yer alır.</p>
    </Modal>
  );
};

export default ModalComponent;
