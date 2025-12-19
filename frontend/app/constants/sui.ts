export const PACKAGE_ID =
  "0x8f268141ba5696591749703f9f80059f8870781b2b1b99c72493ae9145474b04";

// Student Profile
export const STUDENT_PROFILE_STRUCT = `${PACKAGE_ID}::student_profile::StudentProfile`;
export const STUDENT_PROFILE_MODULE = `${PACKAGE_ID}::student_profile::StudentProfile`;
export const STUDENT_PROFILE_CREATE_FN = `${PACKAGE_ID}::student_profile::create`;
export const STUDENT_PROFILE_CLAIM_BADGE_FN = `${PACKAGE_ID}::student_profile::claim_badge`;

// Badge
export const BADGE_STRUCT = `${PACKAGE_ID}::badge::Badge`;
export const BADGE_MINT_FN = `${PACKAGE_ID}::badge::mint_and_transfer`;

// Organizer Pass
export const ORGANIZER_PASS_STRUCT = `${PACKAGE_ID}::organizer_pass::OrganizerPass`;
export const ADMIN_CAP_STRUCT = `${PACKAGE_ID}::organizer_pass::AdminCap`;

// Clock object (shared system object)
export const CLOCK_OBJECT_ID = "0x6";
