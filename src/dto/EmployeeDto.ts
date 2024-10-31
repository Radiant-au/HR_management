// dtos/CreateEmployeeRequest.dto.ts
export type EmployeeRequestDto = {
    name: string;
    profileImg?: string;
    phNo: string;
    CurrentAddress: string;
    PermanentAddress: string;
    departmentId: number;
    position: string;
    degree : string;
    experience : string;
};

// dtos/EmployeeResponse.dto.ts
export type EmployeeResponseDto = {
    id: number;
    name: string;
    profileImg: string;
    phNo: string;
    CurrentAddress: string;
    PermanentAddress?: string;
    departmentName: string;
    einformationId? : {degree : string , experience : string};
    position: string;
    createdById?: {username : string , profileImg : string};
    
};
