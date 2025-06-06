// dtos/CreateEmployeeRequest.dto.ts
export interface EmployeeRequestDto  {
    name: string;
    email?: string;
    phNo: string;
    CurrentAddress: string;
    PermanentAddress: string;
    departmentId: number;
    positionId: number;
    degree? : string;
    experience? : string;
};

// dtos/EmployeeResponse.dto.ts
export interface EmployeeResponseDto {
    id: string,
    name: string;
    email: string;
    profileImg: string;
    phNo: string;
    CurrentAddress: string;
    PermanentAddress?: string;
    departmentName: string | number;
    einformationId? : {degree : string , experience : string};
    position: string | number;
    createdById?: {username : string , profileImg : string};
    role: string;
};

export interface EmployeeScroll{
    id: string;
    profileImg: string;
    name: string;
}

