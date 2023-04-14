import React from "react";

interface Props {
  component: React.LazyExoticComponent<() => JSX.Element>;
  routeKey: string;
  // blankLayout: any;
}

const AppRoute = ({
  component: Component,
  routeKey,
  // blankLayout,
  ...props
}: Props) => {
  return <Component {...props} />;
};

export default AppRoute;
