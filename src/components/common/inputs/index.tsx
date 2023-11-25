import classNames from 'classnames';
import { ChangeEventHandler } from 'react';

const DefaultInput = (props: {
  propertyName: string;
  value: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  error: string;
  displayLabel: boolean;
  type: string;
  icon: any;
}) => {
  return (
    <>
      {props.displayLabel && (
        <label
          htmlFor={props.propertyName}
          className="mb-2.5 block font-medium text-black dark:text-white"
        >
          {props.propertyName}
        </label>
      )}

      <div className="relative">
        <div className="w-8 relative left-4 top-12 dark:text-white">
          {props.icon}
        </div>
        <input
          id={props.propertyName}
          name={props.propertyName}
          value={props.value}
          onChange={props.handleChange}
          type={props.type}
          placeholder={
            props.propertyName.charAt(0).toUpperCase() +
            props.propertyName.slice(1).toLowerCase()
          }
          className={classNames(
            'w-full font-medium text-lg rounded-lg border-2 border-stroke bg-transparent py-4 pl-16 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-secondary dark:bg-transparent dark:focus:bg-secondary dark:focus:text-white dark:text-secondary',
            {
              'dark:border-danger dark:text-danger dark:focus:text-danger':
                props.error,
            },
          )}
        />
        {props.error && (
          <div className="mt-2 text-md dark:text-danger">{props.error}</div>
        )}
      </div>
    </>
  );
};

const RegistrationInput = (props: {
  propertyName: string;
  value: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  error: string;
  type: string;
  labelText: string;
}) => {
  return (
    <>
      <label
        htmlFor={props.propertyName}
        className="mb-2.5 block font-medium text-black dark:text-white"
      >
        Enter {props.labelText}
      </label>

      <div className="relative">
        <input
          id={props.propertyName}
          name={props.propertyName}
          value={props.value}
          onChange={props.handleChange}
          type={props.type}
          placeholder={
            props.labelText.charAt(0).toUpperCase() +
            props.labelText.slice(1).toLowerCase()
          }
          className={classNames(
            'w-full font-medium text-lg rounded-lg border-2 border-stroke bg-transparent py-4 pl-8 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-secondary dark:bg-secondary dark:focus:bg-secondary dark:focus:text-white dark:text-gray',
            {
              'dark:border-danger dark:text-danger dark:focus:text-danger':
                props.error,
            },
          )}
        />
        {props.error && (
          <div className="mt-2 text-md dark:text-danger">{props.error}</div>
        )}
      </div>
    </>
  );
};

export { DefaultInput, RegistrationInput };
