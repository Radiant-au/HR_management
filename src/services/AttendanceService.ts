import { AttendanceResponseDto } from "@dtos/AttendanceDto";
import { Attendance } from "@entities/Attendance";
import { AttendanceRepository } from "@repositories/AttendanceRepository";
import { EmployeeRepository } from "@repositories/EmployeeRepository";
import moment from "moment-timezone";
import { relative } from "path";


export class AttendanceService{

        static async CheckInAttendance(id: string): Promise<AttendanceResponseDto> {
    
            const employee = await EmployeeRepository.findOne({
                where: { id },
                relations: ['department']
            });
    
            if (!employee) throw new Error("Employee not found");
    
            const attendance = new Attendance();
            attendance.employee = employee;
    
            // Automatically set attendanceDate to current date in Asia/Yangon
            attendance.attendanceDate = moment.tz("Asia/Yangon").startOf('day').toDate();
    
            // Set checkIn to the current time in Asia/Yangon (time only)
            attendance.checkIn = moment.tz("Asia/Yangon").format("HH:mm A");
    
            attendance.status = this.setCheckInstatus(attendance.checkIn);
    
            const savedAttendance = await AttendanceRepository.save(attendance);
    
            const response: AttendanceResponseDto = {
                id: savedAttendance.id,
                employeeName: savedAttendance.employee.name,
                attendanceDate: moment(savedAttendance.attendanceDate).format("YYYY-MM-DD HH:mm:ss"),
                checkIn: savedAttendance.checkIn,
                checkOut: savedAttendance.checkOut,
                status: savedAttendance.status
            };
    
            return response;
        }
    
        private static setCheckInstatus(checkIn: string): string {
            const thresholdTime = "09:00:00";
            return checkIn < thresholdTime ? "On Time" : "Late";
        }

        static async CheckOutAttendance(employeeId: string): Promise<AttendanceResponseDto> {
            
            const todayInYangon = moment.tz("Asia/Yangon").startOf('day').toDate();
        
            const attendance = await AttendanceRepository.findOne({
                where: {
                    employee: { id: employeeId },
                    attendanceDate: todayInYangon,
                },
                relations: ["employee"], // Load employee if needed
            });

            attendance.checkOut = moment.tz("Asia/Yangon").format("HH:mm A");

            const savedAttendance = await AttendanceRepository.save(attendance);
        
            const response: AttendanceResponseDto = {
                id: savedAttendance.id,
                employeeName: savedAttendance.employee.name,
                attendanceDate: moment(savedAttendance.attendanceDate).format("YYYY-MM-DD HH:mm:ss"),
                checkIn: savedAttendance.checkIn,
                checkOut: savedAttendance.checkOut,
                status: savedAttendance.status
            };
    
            return response;
        }

        static async getAllAttendance(): Promise<AttendanceResponseDto[]>{
            const attendance = await AttendanceRepository.find({relations:['employee.department']});

            const response: AttendanceResponseDto[] = 
                attendance.map((data) =>({
                    id: data.id,
                    employeeName: data.employee.name,
                    department: data.employee.department.name,
                    attendanceDate: moment(data.attendanceDate).format("YYYY-MM-DD HH:mm:ss"),
                    checkIn: data.checkIn,
                    checkOut: data.checkOut,
                    status: data.status
                }));
            
    
            return response;
        }
    
}