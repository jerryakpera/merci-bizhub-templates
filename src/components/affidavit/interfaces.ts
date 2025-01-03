export type AffidavitFormData = {
  // Document details
  dateOfAffidavit?: Date;
  dateOfAffidavitInWords?: string;

  // File details
  outputFileName?: string;

  // Location details
  lga: string;
  state: string;
  nationality: string;

  // Senders details
  gender: string;
  religion: string;
};

export type ChangeOfNameFormData = AffidavitFormData & {
  // Names
  wrongName: string;
  correctName: string;

  // Affidavit details
  authority: string;
};

export type ChangeOfDateOfBirthFormData = AffidavitFormData & {
  name: string;

  wrongDob: string;
  wrongDobInWords: string;

  correctDob: string;
  correctDobInWords: string;

  authority: string;
};

export type ChangeOfStateOfOriginFormData = AffidavitFormData & {
  name: string;
  authority: string;

  correctLGA: string;
  wrongStateOfOrigin: string;
  correctStateOfOrigin: string;
};

export type ChangeOfRegistrationOnSimFormData = AffidavitFormData & {
  // Names
  name: string;
  previousName: string;

  // Phone details
  phone: string;
  simNetwork: string;
};

export type GuardianshipFormData = AffidavitFormData & {
  guardiansName: string;
  minorsName: string;
  minorsAge: string;
  minorsAgeInWords: string;
  minorsGender: string;
  authority: string;

  relationshipToMinor: string;
};

export type RearrangementOfNameFormData = AffidavitFormData & {
  // Names
  firstName: string;
  middleName: string;
  surname: string;
  wrongNameArrangement: string;
  correctNameArrangement: string;

  // Affidavit details
  authority: string;
  document: string;
};

export type AffidavitAsToDomicileFormData = AffidavitFormData & {
  fullName: string;
  spouseName: string;
  domicile: string;

  relationshipToSpouse: string;
};

export type CorrectionOfNameAndDateOfBirthFormData = AffidavitFormData & {
  // Names
  fullName: string;

  authority: string;

  wrongSurname: string;
  wrongFirstName: string;
  wrongOtherName: string;

  correctSurname: string;
  correctFirstName: string;
  correctOtherName: string;

  wrongDob: string;
  wrongDobInWords: string;

  correctDob: string;
  correctDobInWords: string;
};

export type RemovalOfNameFormData = AffidavitFormData & {
  fullName: string;

  authority: string;

  surname: string;
  firstName: string;
  otherName: string;

  correctName: string;
  nameToRemove: string;
};
