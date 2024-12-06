export interface OvertimeRequestDto {
    name: string;
    start_time: string;
    end_time: string;
    status?: string;
    otDate: string;
}

export interface OvertimeResponseDto {
    id?:  number;
    name: string;
    start_time: string;
    end_time: string;
    createdByName?: string;
    profileImg?: string;
    date: string;
}

export interface EmployeeOTDetailsDto {
    id: number;
    employeeName: string;
    employeeProfileImg: string;
    OTname: string;
    OTStartTime: string;
    OTEndTime: string;
    OTDate : string;
}

export interface employeeOTRequestDto{
    id : string;
}

export interface employeeOTtDTO {
    name: string;
    start_time: string;
    end_time: string;
    employeName: string;
    createdByName: string;
}