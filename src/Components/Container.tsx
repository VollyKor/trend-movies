type Props = {
  children: JSX.Element;
};

const Container = ({ children }: Props) => (
  <div className="container">{children}</div>
);

export default Container;
