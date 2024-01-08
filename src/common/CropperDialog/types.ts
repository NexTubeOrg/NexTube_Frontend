export interface ICroppedModal {
  imageUri?: string;
  error: string;
  aspectRatio?: number;
  onSave?: (file: File) => void;
  onClose?: () => void;
}
