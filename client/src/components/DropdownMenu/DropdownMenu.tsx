import * as React from 'react';
import Button from 'Button';
import View from 'View';

export const DropdownItem: React.SFC<{
  name: string;
  children: any;
  onClick?(a: React.MouseEvent<HTMLDivElement>): void;
}> = ({ name, children, onClick }) => (
  <div id={name} onClick={onClick}>
    {children}
  </div>
);

type Props = {
  children: Array<JSX.Element>;
  caption: string;
  onClick(childName: string): void;
};

type State = {
  status: 'open' | 'close';
};

class DropdownMenu extends React.Component<Props, State> {
  state = {
    status: 'close',
  } as State;

  toggleStatus = () => {
    const { status } = this.state;

    const isOpen = status === 'open';

    this.setState({
      status: isOpen ? 'close' : 'open',
    });
  };

  handleChildClick = (
    e: React.MouseEvent<HTMLDivElement & { name: string }>,
  ) => {
    const { onClick } = this.props;
    const childName = (e.target as EventTarget & { id: string }).id;

    onClick(childName);

    this.toggleStatus();
  };

  render() {
    const { status } = this.state;
    const { children, caption } = this.props;

    return (
      <View column>
        <Button onClick={this.toggleStatus}>{caption}</Button>

        {status === 'open'
          ? React.Children.map(children, (child: React.ReactElement<any>) => (
              <child.type {...child.props} onClick={this.handleChildClick} />
            ))
          : null}
      </View>
    );
  }
}

export default DropdownMenu;
