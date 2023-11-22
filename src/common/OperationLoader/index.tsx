import classNames from 'classnames';

const OperationLoader = () => {
  return (
    <div className={classNames('flex items-center justify-center')}>
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-t-transparent"></div>
    </div>
  );
};

export default OperationLoader;
