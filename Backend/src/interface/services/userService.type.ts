
export type registerUserInput={
    userName: string;
    email: string;
    phone: number;
    password: string;
    gender: string;
    profileImage:string;
    address?: string;
    enrolledPackage:number;
    enrolledDate:string;
    enrolledDuration:string;
    DOB?:string;
    otp?:string
    state?: string;
    district?: string;
    pincode?: number;
    coachId?: string | null;
    isBlocked?: boolean;
    isCoach?: boolean;
    quizScore?: number;
    isApproved?: string;
    role: string;
    isRegisted: boolean;
}
export type registerUserOutput={
    _id: string; // User's unique ID, typically generated by MongoDB
    userName: string;
    email: string;
    phone: number;
    gender: string;
    enrolledPackage:String;
    enrolledDuration:string;
    enrolledDate:string;
    profileImage:string;
    address: string;
    state: string;
    district: string;
    pincode: number;
    coachId: string | null;
    isBlocked: boolean;
    isCoach: boolean;
    quizScore: number;
    isApproved: string;
    role: string;
    isRegisted: boolean;
    otp: string; 
}
export type verifyOTPServiceInput={
    email:string;
    otp:string;
}
export type verifyOTPServiceOutput = {
    success: boolean;
    message: string;
};

export type fetchuserdataServiceOutput = {
    data: any; 
  };

export type loginUserInput={
    email:string;
    password:string
  }
export type loginUserOutput={
  user: any;
  accessToken: string;
  refreshToken: string;
  }

  export type checkUserAndOtpSentInput={
    email:string;
    otp:string;
  }

  export type forgotPassverifyOTPServiceInput={
    email:string;
    otp:string
      }

  export type saveNewPasswordInput={
    password:string;
    email:string
  }
  export type saveOTPtoModelInput={
    email:string;
    otp:string
  }