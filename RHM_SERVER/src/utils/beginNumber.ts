export const getFirstTwoDigits = (phoneNumber: string): string | null => {
    if (phoneNumber.length >= 2) {
      return phoneNumber.substring(0, 2);
    } else {
      return null;
    }
};