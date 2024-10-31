// export type AttendanceCheckInRequestDto = {
//     employeeId: number;
// };

export type AttendanceCheckOutRequestDto = {
    attendanceId: number;
    checkOut: string;
}

export type AttendanceResponseDto = {
    id: number;
    employeeName: string;
    attendanceDate: Date;
    checkIn: string | null;
    checkOut: string | null;
    status: string;
}


