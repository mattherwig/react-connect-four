import { Transition } from 'react-transition-group';

const TRANSITION_STYLES = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0.5 },
  exited: { opacity: 0.5 },
};

export default function Fade({in: inProps, duration = 500, children}) {
  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0.5
  }

  return (
    <Transition
      in={inProps} 
      timeout={duration}
    >
      {state => (
        <div style={{
          ...defaultStyle,
          ...TRANSITION_STYLES[state]
        }}>
          {children}
        </div>
      )}
    </Transition>
  );
}