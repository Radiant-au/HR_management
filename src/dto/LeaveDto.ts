export interface LeaveRequestDTO {
    employeeId: string;
    policyId: number;
    startDate: string; // Dates are received as strings (e.g., "2024-11-01")
    endDate: string;
}

export interface LeaveResponseDTO {
    id: number;
    employeeName: string;
    employeeProfile: string;
    Type: string;
    startDate: string;
    endDate: string;
    status?: string;
    approvedByName?: string;
    approvedByProfile?: string;
}

export interface LeaveTableResponseDTO {
    id: number;
    employeeId : string;
    employeeName: string;
    employeeProfile: string;
    policyId : number;
    Type: string;
    days: number;
    startDate: string;
    endDate: string;
    approvedBy?: string | null;
}

export interface AllLeaveTableResponseDTO{
    id : number;
    employeeName: string;
    employeeProfile: string;
    Type: string;
    status: string;
    startDate: string;
    endDate: string;
    modifiedByName: string;
    modifiedByProfile : string;
}