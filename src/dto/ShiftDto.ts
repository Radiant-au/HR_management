export interface ShiftRequestDTO {
    type: string;
    start_time: string; // Format: "HH:mm"
    end_time: string;   // Format: "HH:mm"
    grace_period?: number; // Optional, default is 15 minutes
}

export interface ShiftResponseDTO {
    id?:  number | string;
    type: string;
    start_time: string;
    end_time: string;
    createdByName?: string;
    profileImg?: string;
    grace_period: number;
}

export interface employeeShiftDTO {
    type: string;
    start_time: string;
    end_time: string;
    employeName: string;
    createdByName: string;
}

export interface employeeShiftRequestDto{
    id : string;
}

export interface EmployeeShiftDetailsDto {
    id: number;
    employeeName: string;
    employeeProfileImg: string;
    shiftType: string;
    shiftStartTime: string;
    shiftEndTime: string;
}
