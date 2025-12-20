export const PACKAGE_ID =
  "0x279c579d7941e9126f9279d715b2bffd90f48d7516b9aacfbbd10cc61d8bd622";

// Student Profile
export const STUDENT_PROFILE_STRUCT = `${PACKAGE_ID}::student_profile::StudentProfile`;
export const STUDENT_PROFILE_MODULE = `${PACKAGE_ID}::student_profile::StudentProfile`;
export const STUDENT_PROFILE_CREATE_FN = `${PACKAGE_ID}::student_profile::create`;
export const STUDENT_PROFILE_CLAIM_BADGE_FN = `${PACKAGE_ID}::student_profile::claim_badge`;

// Badge
export const BADGE_STRUCT = `${PACKAGE_ID}::badge::Badge`;
export const BADGE_MINT_FN = `${PACKAGE_ID}::badge::mint_and_transfer`;

export const BADGE_MINT_BATCH_FN = `${PACKAGE_ID}::badge::mint_many_and_transfer`;

// Organizer Pass
export const ORGANIZER_PASS_STRUCT = `${PACKAGE_ID}::organizer_pass::OrganizerPass`;
export const ADMIN_CAP_STRUCT = `${PACKAGE_ID}::organizer_pass::AdminCap`;

// Clock object (shared system object)
export const CLOCK_OBJECT_ID = "0x6";
