import { ChangeEventHandler, EventHandler, useState } from 'react';

const CheckboxFour = (props: {
  name: string;
  id: string;
  isChecked: boolean;
  description: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative ">
          <input
            name={props.name}
            value={props.id}
            type="checkbox"
            id={props.id}
            className="sr-only"
            onChange={props.onChange}
          />
          <div
            className={`mr-4 flex h-5 w-5 border-gray items-center justify-center rounded-md  border ${
              props.isChecked && 'border-white'
            }`}
          >
            <span
              className={`h-3 w-3 rounded-md bg-transparent ${
                props.isChecked && '!bg-white'
              }`}
            >
              {' '}
            </span>
          </div>
        </div>
        <div className="">
          <h2 className="text-white font-semibold">{props.name}</h2>
          <h3 className="text-gray text-sm font-semibold">
            {props.description}
          </h3>
        </div>
      </label>
    </div>
  );
};

export default CheckboxFour;
