import React from 'react';
import invariant from 'invariant';

// project
import ReactToastSnackContext from './ReactToastSnackContext';

type NewProps = {
  toastSnack: ToastSnackProvider
}

function withToastSnack<TProps extends NewProps>(
  Component: React.ComponentType<TProps>
): React.ForwardRefExoticComponent<React.PropsWithoutRef<TProps> & React.RefAttributes<HTMLElement>> {
  function forwardRef(props: TProps, ref: React.Ref<HTMLElement>): JSX.Element {
    return (
      <ReactToastSnackContext.Consumer>
        {context => {
          invariant(
            context !== undefined,
            '[withToastSnack]: ReactToastSnackContext is undefined',
          );
          return <Component {...props} ref={ref} toastSnack={context} />;
        }}
      </ReactToastSnackContext.Consumer>
    );
  }
  return React.forwardRef(forwardRef);
}

export default withToastSnack;
