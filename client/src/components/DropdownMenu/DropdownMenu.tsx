import * as React from 'react';
import Button from 'Button';
import View from 'View';

import './dropdownMenu.scss';

export const DropdownItem: React.SFC<{
  name: string;
  children: any;
  onClick?(a: React.MouseEvent<HTMLDivElement>): void;
}> = ({ name, children, onClick }) => (
  <View
    className="dropdownItem clickable"
    id={name}
    onClick={onClick}
    vAlignContent="center"
    hAlignContent="center"
  >
    {children}
  </View>
);

type Props = {
  children: Array<JSX.Element>;
  caption: string;
  className: string;
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
    const { children, caption, className = '' } = this.props;

    return (
      <View column className={`${className} dropdownMenu`}>
        <Button onClick={this.toggleStatus}>{caption}</Button>

        {status === 'open' ? (
          <View column className="dropdownList">
            {React.Children.map(children, (child: React.ReactElement<any>) => (
              <child.type {...child.props} onClick={this.handleChildClick} />
            ))}
          </View>
        ) : null}
      </View>
    );
  }
}

export default DropdownMenu;
