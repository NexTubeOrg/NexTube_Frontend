import classNames from 'classnames';
import useColorMode from '../../hooks/useColorMode';

const Loader = () => {
  const [colorMode, setColorMode] = useColorMode();
  console.log('color', colorMode);
  return (
    <div
      className={classNames('flex h-screen items-center justify-center', {
        'bg-white': colorMode == 'light',
        'bg-black': colorMode == 'dark',
      })}
    >
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

export default Loader;
