import React, { PureComponent, createContext } from "react";

const { Provider, Consumer } = createContext({ width: 0, height: 0 });

export default class WindowProvider extends PureComponent {
  state = this.getDimensions();

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  getDimensions() {
    const w = window;
    const d = document;
    const documentElement = d.documentElement;
    const body = d.getElementsByTagName("body")[0];
    const width =
      w.innerWidth || documentElement.clientWidth || body.clientWidth;
    const height =
      w.innerHeight || documentElement.clientHeight || body.clientHeight;

    return { width, height };
  }

  updateDimensions = () => {
    this.setState(this.getDimensions());
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}
