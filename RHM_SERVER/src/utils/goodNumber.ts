export const  isValidPhoneNumber = (phoneNumber: string): boolean  => {
    const phoneRegex = /^(01|05|07)\d{6}$/;
    return phoneRegex.test(phoneNumber);
  }