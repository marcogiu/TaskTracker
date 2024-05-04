export interface ApiError {
  data?: {
    message: string;
    errors?: { field: string; message: string }[];
  };
  message?: string;
  status?: number;
}
