export type TagType = {
  id: number;
  title: string;
};

export type UserType = {
  id: number;
  name: string;
  email: string;
};

export type SkillItem = {
  id: number;               // uniek id van de skill
  title: string;            // titel van de skill/vraag
  description: string;      // beschrijving van de vraag/skill
  type: "OFFER" | "REQUEST"; // of iemand het aanbiedt of een request is
  completed: boolean;       // of de skill afgerond is
  user_id: number;          // id van de gebruiker die dit heeft aangemaakt
  created_at: string;       // timestamp van aanmaak
  updated_at: string;       // timestamp van laatste update
  user: UserType;           // gebruiker object (naam/email)
  tags: TagType[];          // array van tags
};