import * as React from 'react';
import Modal from 'Modal';

type Props = { onClose?: () => void };

const FixedPriceModal: React.SFC<Props> = () => (
  <Modal transitionEnterTimeout={0} transitionLeaveTimeout={0}>
    <span> ciao 2</span>
  </Modal>
);

export default FixedPriceModal;
