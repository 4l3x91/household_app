export interface Profile {
  id: string;
  userId: string;
  householdId: string;
  profileName: string;
  avatar: Avatar;
  role: "user" | "owner";
  isPaused: boolean;
  isApproved?: boolean;
}

export interface Avatar {
  avatar: string;
  color: string;
}
