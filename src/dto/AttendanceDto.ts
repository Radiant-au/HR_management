// export type AttendanceCheckInRequestDto = {
//     employeeId: number;
// };

export interface AttendanceCheckOutRequestDto {
    attendanceId: number;
    checkOut: string;
}

export interface AttendanceResponseDto {
    id: number;
    employeeName: string;
    attendanceDate: string;
    checkIn: string | null;
    checkOut: string | null;
    status: string;
}


