import { type Database } from "./database.types";

export type PostEntity = Database["public"]["Tables"]["post"]["Row"];

export type UseMuationCallback = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onMutation?: () => void;
  onSettled?: () => void;
}