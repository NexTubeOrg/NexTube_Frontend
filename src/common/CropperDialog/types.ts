export interface ICroppedModal {
  imageUri?: string;
  error: string;
  onSave?: (file: File) => void;
  onClose?: () => void;
}
