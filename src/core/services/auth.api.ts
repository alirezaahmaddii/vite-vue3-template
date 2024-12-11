import axiosInstance from "@/core/services/interceptor"
import type { IRegisterCellphoneDto, IRegisterWheelDto, IRegisterWheelPayload, IVerifyCellphoneDto, IVerifyCellphonePayload } from "@/core/models/login.interface";

const loginUrl = import.meta.env.VITE_APP_BASE
const baseUrl= import.meta.env.VITE_APP_API_URL


export const registerCellphone = (cellphone: string): Promise<IRegisterCellphoneDto> => {
    return axiosInstance.post(
        `${loginUrl}/auth`,
        { cellphone },
    );
}

export const verifyCellphone = (payload: IVerifyCellphonePayload): Promise<IVerifyCellphoneDto> => {
    return axiosInstance.put(
        `${loginUrl}/auth`,
        payload,
    );
}

export const registerWheel = (payload?: IRegisterWheelPayload): Promise<IRegisterWheelDto> => {
    return axiosInstance.post(
        `${baseUrl}/register`,
        payload,
    );
}
