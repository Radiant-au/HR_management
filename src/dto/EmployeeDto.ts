// dtos/CreateEmployeeRequest.dto.ts
export interface EmployeeRequestDto  {
    name: string;
    email: string;
    phNo: string;
    CurrentAddress: string;
    PermanentAddress: string;
    departmentId: number;
    position: string;
    degree : string;
    experience : string;
};

// dtos/EmployeeResponse.dto.ts
export interface EmployeeResponseDto {
    name: string;
    profileImg: string;
    phNo: string;
    CurrentAddress: string;
    PermanentAddress?: string;
    departmentName: string;
    einformationId? : {degree : string , experience : string};
    position: string;
    createdById?: {username : string , profileImg : string};
    role: string;
};
