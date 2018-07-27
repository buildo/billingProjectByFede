import * as React from 'react';
import Modal from 'Modal';

type Props = { onClose?: () => void };

const DailyPriceModal: React.SFC<Props> = () => (
  <Modal transitionEnterTimeout={0} transitionLeaveTimeout={0}>
    <span> ciao</span>
  </Modal>
);

export default DailyPriceModal;
