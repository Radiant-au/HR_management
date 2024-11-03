export interface LeaveRequestDTO {
    employeeId: number;
    policyId: number;
    startDate: string; // Dates are received as strings (e.g., "2024-11-01")
    endDate: string;
    approvedById?: number; // Optional to allow for nullable foreign key
}

export interface LeaveResponseDTO {
    id: number;
    employee: string;
    policy: string;
    startDate: Date;
    endDate: Date;
    approvedBy: string | null;
    approvedAt: Date;
}