import type {ISpinDto} from "@/core/models/spin.interface";
import Axios from "@/core/services/interceptor";

export const executeSpin = (): Promise<ISpinDto> => {
  return Axios.post(
    "execute-spin",
  );
}
