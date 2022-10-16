export interface Profile {
  id: string;
  userId: string;
  householdId: string;
  profileName: string;
  avatar: string;
  profileColor: string;
  role: "user" | "owner";
  paused: boolean;
}
