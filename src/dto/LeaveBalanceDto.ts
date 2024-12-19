export interface leaveBalanceRequest{
    year : number;
}

export interface LeaveBalanceResponseDto {
    employee: LeaveEmployeeDto;
    year: number;
    policies: PolicyDto[];
  }
  
  export interface LeaveEmployeeDto {
    name: string;
    image: string;
  }
  
  export interface PolicyDto {
    name: string;
    credit: number;
    used: number;
 }
  