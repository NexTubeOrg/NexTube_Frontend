export interface ICommonResult {
  succeeded: boolean;
  errors: string[];
}
export interface IErrorResult {
  title: string;
  status: number;
  errors: IValidationErrors;
}

export interface IValidationErrors {
  password: string[] | undefined;
  firstName: string[] | undefined;
  lastName: string[] | undefined;
  email: string[] | undefined;
  photo: string[] | undefined;
}
