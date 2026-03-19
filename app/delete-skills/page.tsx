'use client';

import axios from "axios";

// Functie voor het verwijderen van skills (voor het testen)
async function deleteAllSkills() {

  // Haal het token op uit localStorage
  const token = localStorage.getItem("token");

  // Haal alle skills op
  const { data } = await axios.get("/api/skill");

  // Verwijder alle skills
  await Promise.all(
    data.map((skill: any) =>
      axios.delete(`/api/skill/${skill.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    )
  );
}

export default function DeleteSkills() {
  return (  
    <main id="inhoud" className="py-[1em] md:py-[2em] flex flex-col gap-5">
      <button onClick={deleteAllSkills} className="cursor-pointer"> Verwijder alle skills</button>
    </main>
  )
}